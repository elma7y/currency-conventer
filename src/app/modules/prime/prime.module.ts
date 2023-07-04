import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MenubarModule,
    TableModule,
    TabMenuModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    CalendarModule,
  ],
})
export class PrimeModule {}
