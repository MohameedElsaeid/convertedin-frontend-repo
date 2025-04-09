import { Post } from './post.interface';

export interface SocialMediaPosts {
  data: {
    posts: Array<Post>;
    next: string;
  };
}
