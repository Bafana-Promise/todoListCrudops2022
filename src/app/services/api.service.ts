import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SerUrlString = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  getAllTodos(endpoint: any): Observable<any> {
    const url = `${this.SerUrlString}/${endpoint}`;
    return this.http.get<any>(url);
  }
  addTodos(endpoint: any, body: any): Observable<any> {
    const url = `${this.SerUrlString}/${endpoint}`;
    return this.http.post<any>(url, body);
  }
  editTodos(endpoint: any, body?: any): Observable<any> {
    const url = `${this.SerUrlString}/${endpoint}`;
    console.log('Url sent :', url)
    return this.http.post<any>(url, body);
  }

  deleteTodos(endpoint: any, body?: any): Observable<any> {
    const url = `${this.SerUrlString}/${endpoint}`;
    console.log('Url sent :', url)
    return this.http.delete<any>(url, body);
  }

}