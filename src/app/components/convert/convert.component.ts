import {
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConvertComponent implements OnInit, OnDestroy, DoCheck {
  latestSubscription!: Subscription;
  convertSubscription!: Subscription;
  symbols: any[] | undefined;
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
  });

  ngOnInit(): void {
    // this.getLatest();
  }
  ngDoCheck(): void {}
  getLatest() {
    this.latestSubscription = this.apiService
      .getSymbols()
      .subscribe((res: any) => {
        console.log(res);
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
  convert() {
    if (this.formgroup.valid) {
      this.convertSubscription = this.apiService
        .convert(
          this.formgroup.controls['from'].value,
          this.formgroup.controls['to'].value
        )
        .subscribe((res: any) => {
          console.log(res);
          const from = this.formgroup.controls['from'].value;
          const to = this.formgroup.controls['to'].value;
          const amount = this.formgroup.controls['amount'].value;
          if (res.success === true) {
            this.result = Number(
              ((res.rates[to] / res.rates[from]) * amount).toFixed(2)
            );
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Oops',
              detail: `${res.error.info}`,
            });
          }
        });
    }
  }
  toggle() {
    const fromValue = this.formgroup.controls['from'].value;
    const toValue = this.formgroup.controls['to'].value;
    this.formgroup.controls['from'].setValue(toValue);
    this.formgroup.controls['to'].setValue(fromValue);
  }

  ngOnDestroy(): void {
    if (this.latestSubscription && !this.latestSubscription.closed) {
      this.latestSubscription.unsubscribe();
    } else if (this.convertSubscription && !this.convertSubscription.closed) {
      this.convertSubscription.unsubscribe();
    }
  }
}
