import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Symbols } from '../interface/symbols';
import { Latest } from '../interface/latest';

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

  getLatest(): Observable<Latest[]> {
    return this.http.get<Latest[]>(
      `${environment.apiUrl}latest?access_key=${environment.AcessKey}`
    );
  }

  convert(from: string, to: string): Observable<Latest[]> {
    return this.http.get<Latest[]>(
      `${environment.apiUrl}latest?access_key=${environment.AcessKey}&symbols=${from},${to},EUR`
    );
  }
  convertbyDate(from: string, to: string, date: string) {
    return this.http.get(
      `${environment.apiUrl}${date}?access_key=${environment.AcessKey}&symbols=${from},${to},EUR`
    );
  }
}
