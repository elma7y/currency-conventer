import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { ConvertComponent } from './components/convert/convert.component';
import { ConvertDateComponent } from './components/convert-date/convert-date.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'convert', component: ConvertComponent }],
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'convert', component: ConvertComponent },
      { path: 'currency-Date', component: ConvertDateComponent },
    ],
  },
  { path: 'currency', component: CurrencyComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
