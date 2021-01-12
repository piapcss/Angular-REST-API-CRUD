import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Users } from '../model/users.model';


@Injectable({ providedIn: 'root' })
export class Connection {

  private api = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get<Users>(this.api + '/users');
  }

  getUsersById(id: number): Observable<any> {
    return this.http.get<Users>(this.api + '/users/' + id);
  }

  postUsers(data: Users): Observable<any> {
    return this.http.post<Users>(this.api + '/add', data);
  }

  deleteUsersById(id: number): Observable<any> {
    return this.http.delete<Users>(this.api + '/delete/' + id);
  }

  putUsersById(id: number, data: Users): Observable<any> {
    return this.http.put<Users>(this.api + '/update/' + id, data);
  }

}
