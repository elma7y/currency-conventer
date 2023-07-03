import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        routerLink: 'home',
      },
      {
        label: 'currency',
        routerLink: 'currency',
      },
      {
        label: 'About',
        routerLink: 'about',
      },
      {
        label: 'Contact Us',
        routerLink: 'contact-us',
      },
    ];
  }
}
