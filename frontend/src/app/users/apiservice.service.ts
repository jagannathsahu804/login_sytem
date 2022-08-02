import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }

  apiUrl = "http://localhost:3000/api";

  //signup
  signup(data:any):Observable<any>{
    console.log(data,'data##');
    return this.http.post(`${this.apiUrl}/signup`,data);
  }

  //login
  login(data:any):Observable<any>{
    console.log(data, 'data###');
    return this.http.post(`${this.apiUrl}/login`,data)
  }

  //transactions
  transactions():Observable<any>{
    return this.http.get(`${this.apiUrl}/transactions`);
  }

  //getToken
  getToken(){
    return localStorage.getItem('token');
  }
}
