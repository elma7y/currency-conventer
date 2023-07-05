import {
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-convert-date',
  templateUrl: './convert-date.component.html',
  styleUrls: ['./convert-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConvertDateComponent implements OnInit, OnDestroy, DoCheck {
  latestSubscription!: Subscription;
  convertbyDateSubscription!: Subscription;
  symbols: any[] | undefined;
  dateFormat!: string;
  result: number;

  constructor(
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    this.result = 0;
  }
  formgroup: FormGroup = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    amount: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
  });
  ngOnInit(): void {
    this.getLatest();
  }
  getLatest() {
    this.latestSubscription = this.apiService
      .getSymbols()
      .subscribe((res: any) => {
        if (res.success === true) {
          this.symbols = Object.keys(res.symbols);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Oops',
            detail: `${res.error.info}`,
          });
        }
      });
  }
  toggle() {
    const fromValue = this.formgroup.controls['from'].value;
    const toValue = this.formgroup.controls['to'].value;
    this.formgroup.controls['from'].setValue(toValue);
    this.formgroup.controls['to'].setValue(fromValue);
  }
  convertbyDate() {
    this.convertbyDateSubscription = this.apiService
      .convertbyDate(
        this.formgroup.controls['from'].value,
        this.formgroup.controls['to'].value,
        this.dateFormat
      )
      .subscribe((res: any) => {
        const from = this.formgroup.controls['from'].value;
        const to = this.formgroup.controls['to'].value;
        const amount = this.formgroup.controls['amount'].value;
        if (res.success === true) {
          this.result = Number(
            ((res.rates[to] / res.rates[from]) * amount).toFixed(2)
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Nice',
            detail: `Your conversion was successful and equal to ${this.result}`,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Oops',
            detail: `${res.error.info}`,
          });
        }
      });
  }
  convertDate() {
    if (this.formgroup.controls['date'].value != null) {
      this.dateFormat = this.formgroup.controls['date'].value
        .toISOString()
        .slice(0, 10);
    }
  }
  ngDoCheck(): void {
    this.convertDate();
  }
  ngOnDestroy(): void {
    if (this.latestSubscription && !this.latestSubscription.closed) {
      this.latestSubscription.unsubscribe();
    } else if (
      this.convertbyDateSubscription &&
      !this.convertbyDateSubscription.closed
    ) {
      this.convertbyDateSubscription.unsubscribe();
    }
  }
}
