import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';
  currentUser: { userId: string; role: string } | null = null; 
  constructor(private http: HttpClient) {}

  login(userId: string, password: string): Observable<{ success: boolean; user: { userId: string; role: string } }> {
    return this.http.post<{ success: boolean; user: { userId: string; role: string } }>(
      `${this.apiUrl}/login`,
      { userId, password }
    );
  }

  getUsers(delay?: number): Observable<{ userId: string; role: string }[]> {
    const url = delay ? `${this.apiUrl}/users?delay=${delay}` : `${this.apiUrl}/users`;
    return this.http.get<{ userId: string; role: string }[]>(url);
  }

  addUser(user: { userId: string; password: string; role: string }): Observable<{ userId: string; role: string }> {
    return this.http.post<{ userId: string; role: string }>(`${this.apiUrl}/users`, user);
  }
}