import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {
  CreateAdApi,
  Post,
  SocialMediaChannel,
  SocialMediaPosts,
} from '@flyerz/shared/api';
import { PaginationService } from '@flyerz/shared/services';
import { CreateAdActions } from '@flyerz/store/create-ad';
import { Store } from '@ngrx/store';
import { Observable, finalize, tap } from 'rxjs';
import { selectPostImports } from './imports';

@Component({
  selector: 'convertedin-select-post',
  templateUrl: './select-post.component.html',
  styleUrls: ['./select-post.component.scss'],
  providers: [PaginationService],
  standalone: true,
  imports: selectPostImports,
})
export class SelectPostComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-grow-1 flex-column justify-content-center gap-6 align-items-center create-ad__step max-h-full';
  @Input({ required: true }) channel!: SocialMediaChannel;
  @Input() post!: Post;

  posts$!: Observable<SocialMediaPosts>;
  loaders: { initial: boolean; paginated: boolean } = {
    initial: true,
    paginated: false,
  };
  selectedPost!: Post;
  //#endregion

  constructor(
    private __createAd: CreateAdApi,
    private __store: Store,
    protected _pagination: PaginationService<Post>
  ) {}

  ngOnInit(): void {
    this.selectedPost = this.post;
    this._pagination.init();
    this.getPosts();
  }

  //#region Methods
  getPosts(): void {
    if (!this._pagination.pagination.reachedTotalCount) {
      !this.loaders.initial && (this.loaders.paginated = true);
      this.posts$ = this.getPostEndpoint().pipe(
        finalize(() => {
          this.loaders.initial = false;
          this.loaders.paginated = false;
        })
      );
    }
  }

  getPostEndpoint(): Observable<SocialMediaPosts> {
    return this.channel.id === 1 || this.channel.id === 3
      ? this.__createAd
          .getFacebookPosts(
            this._pagination.pagination.offset,
            this._pagination.pagination.limit
          )
          .pipe(
            tap((data) => {
              this._pagination.processData(data.data.posts);
            })
          )
      : this.__createAd
          .getInstagramPosts(this._pagination.pagination.next)
          .pipe(
            tap((data) => {
              this._pagination.processDataWithNext(
                data.data.posts,
                data.data.next
              );
            })
          );
  }

  postSelected(post: Post): void {
    if (post.postMessage) {
      this.selectedPost = post;
      this.__store.dispatch(CreateAdActions.setPost({ post }));
    }
  }

  getPostImage(post: Post): string {
    let image = '';
    image = (
      post?.attachments?.type === 'video'
        ? post?.attachments?.default
        : post?.attachments?.data?.[0]
    )!;
    return image;
  }
  //#endregion
}
