import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Student } from '../models/student.model';

const baseUrl = 'http://localhost:8080/api/aluno';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${baseUrl}/listar`);
  }

  getTotal(): Observable<number> {
    return this.http.get<number>(`${baseUrl}/getTotal`);
  }

  getById(id: number): Observable<Student> {
    return this.http.get(`${baseUrl}/get/${id}`);
  }

  create(data: Student): Observable<any> {
    return this.http.post(`${baseUrl}/incluir`, data);
  }

  update(data: Student): Observable<any> {
    return this.http.put(`${baseUrl}/editar`, data);
  }

  delete(data: Student): Observable<any> {
    return this.http.post(`${baseUrl}/remover`, data);
  }
}
