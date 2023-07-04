import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Symbols } from 'src/app/interface/symbols';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit, OnDestroy {
  allSymols!: Subscription;
  symbols: [string, string][] = [];

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.getSymbols();
  }
  clear(table: Table) {
    table.clear();
  }
  getSymbols() {
    this.allSymols = this.apiService.getSymbols().subscribe((res: any) => {
      this.symbols = Object.entries(res.symbols);
    });
  }
  ngOnDestroy(): void {
    this.allSymols.unsubscribe();
  }
}
