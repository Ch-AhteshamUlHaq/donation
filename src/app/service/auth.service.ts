import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User, Claimer } from '../interface/user';
import { Observable } from 'rxjs';

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

  private apiURL = "http://localhost:3000/user";

  registerUser(inputData: User): Observable<any> {
    return this.http.post<any>(this.apiURL, inputData);
  }

  getUserByCode(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/${id}`);
  }

  getClaimerByCode(id: string): Observable<Claimer> {
    return this.http.get<Claimer>(`http://localhost:3000/claimer/${id}`);
  }

  getAllClaimers(): Observable<Claimer[]> {
    return this.http.get<Claimer[]>("http://localhost:3000/claimer");
  }

  getRole(): string {
    return sessionStorage.getItem('role') || '';
  }

  postClaim(data: FormData): Observable<any> {
    return this.http.post<any>("http://localhost:3000/claimer/", data);
  }

  // getClaims(): Observable<Claimer[]> {
  //   return this.http.get<Claimer[]>("http://localhost:3000/claimer");
  // }

  updateClaim(id: string, data: Claimer): Observable<any> {
    return this.http.put(`http://localhost:3000/claimer/${id}`, data);
  }

  updateUser(id: string, inputData: User): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, inputData);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('id') !== null;
  }

  getUserRole(): Observable<any> {
    return this.http.get('http://localhost:3000/role');
  }
}