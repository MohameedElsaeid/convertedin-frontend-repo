import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'convertedin-facebook',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss'],
})
export class FacebookComponent {
  selectedManager: any;
  selectedStore: any;

  // New list of social-body__items
  socialBodyManagers = [
    { title: 'Fashion Store', id: '1234567890', value: 'fashion-store', avatar: '/assets/images/test-avatar.svg' },
    { title: 'Electronics Shop', id: '9876543210', value: 'electronics-shop',  avatar: '/assets/images/test-avatar.svg' },
  ];

  socialBodyStores = [
    { title: 'Fashion Store', id: '1234567890', value: 'fashion-store', avatar: '/assets/images/test-avatar.svg', likes: 123 },
    { title: 'Electronics Shop', id: '9876543210', value: 'electronics-shop',  avatar: '/assets/images/test-avatar.svg', likes: 456 },
  ];


  selectManager(manager: any) {
    this.selectedManager = manager;
  }

  selectStore(store: any){
    this.selectedStore = store;
    console.log(this.selectedStore);
  }


}
