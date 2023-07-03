import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Symbols } from '../interface/symbols';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getSymbols(): Observable<Symbols[]> {
    return this.http.get<Symbols[]>(
      `${environment.apiUrl}symbols?access_key=${environment.AcessKey}`
    );
  }
}
