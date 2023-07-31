import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getTicket() {
    throw new Error('Method not implemented.');
  }
  
  GetUserbyCode(id: string | null | undefined) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  apiURL = "http://localhost:3000/user";

  registerUser(inputData: any) {
    return this.http.post(this.apiURL, inputData);
  }

  getUserByCode(id: any) {
    return this.http.get(this.apiURL + '/' + id);
  }

  getClaimerByCode(id: any) {
    return this.http.get("http://localhost:3000/claimer" + '/' + id);
  }

  getAll() {
    return this.http.get<any>("http://localhost:3000/claimer");
  }

  getRole() {
    return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
  }

  postClaim(data: any) {
    return this.http.post<any>("http://localhost:3000/claimer/", data);
  }

  getClaim() {
    return this.http.get<any>("http://localhost:3000/claimer");
  }

  updateClaim(id: any, data: any) {
    return this.http.put("http://localhost:3000/claimer" + '/' + id, data);
  }

  updateUser(id: any, inputData: any) {
    return this.http.put(this.apiURL + '/' + id, inputData);
  }

  isLoggedIn() {
    return sessionStorage.getItem('id') != null;
  }

  getUserRole(){
    return this.http.get('http://localhost:3000/role');
  }
}
