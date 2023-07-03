import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    // this.getdata();
  }

  // getdata() {
  //   this.apiService.getdata().subscribe((data) => {
  //     console.log(data);
  //   });
  // }
}
