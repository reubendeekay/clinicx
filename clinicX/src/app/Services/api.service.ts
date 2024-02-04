import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl; // Use environment variable

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set(
        'Authorization',
        `Bearer ${localStorage.getItem('token') || '{}'}` // Adjust token retrieval as needed
      )
      .set('Content-Type', 'application/json');
  }

  login(credentials: any): Observable<any> {
    const url = `${this.baseUrl}/identity/users/authenticate`;
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(url, credentials, { headers });
  }

  fetchBranches(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get(
      `${this.baseUrl}/client/branch/fetchbranches?page=0&start=1`,
      {
        headers,
      }
    );
  }

  createBranch(payload: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(
      `${this.baseUrl}/client/branch/create`,
      JSON.stringify(payload),
      {
        headers,
      }
    );
  }

  createEmployee(payload: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(
      `${this.baseUrl}/client/employee/create`,
      JSON.stringify(payload),
      {
        headers,
      }
    );
  }

  createUser(payload: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(
      `${this.baseUrl}/identity/users/create`,
      JSON.stringify(payload),
      {
        headers,
      }
    );
  }
}
