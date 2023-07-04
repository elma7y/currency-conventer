import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { CurrencyComponent } from '../currency/currency.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: MenuItem[] | undefined;
  subscribtion!: Subscription;
  activeItem: MenuItem | undefined;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.items = [
      { label: 'Convert', routerLink: 'convert' },
      { label: 'Calendar', routerLink: 'currency-Date' },
    ];
    this.activeItem = this.items[0];
  }
}
