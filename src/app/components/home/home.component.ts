import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, DoCheck {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  showMessage: boolean;
  constructor(private route: Router) {
    this.showMessage = true;
  }
  ngOnInit(): void {
    this.items = [
      { label: 'Convert', routerLink: 'convert' },
      { label: 'Convert by date', routerLink: 'currency-Date' },
    ];
    this.activeItem = this.items[0];
  }
  ngDoCheck(): void {
    if (this.route.url == '/' || this.route.url == '/home') {
      this.showMessage = true;
    } else {
      this.showMessage = false;
    }
  }
}
