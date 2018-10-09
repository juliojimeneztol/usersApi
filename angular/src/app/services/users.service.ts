import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { User } from '../entities/user';
import { ConfigService } from '../services/config.service';
import { Config } from '../entities/config';

const httpSetOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpGetOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable()

export class UsersService {

  /**
   * Config object
   */
  private config : Config = new Config();

  /**
   * End point rest service
   */
  private endPoint : string;

  /**
   * Constructor service
   * @param http
   */
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ){ 
    this.config   = this.configService.config
    this.endPoint = this.config.apiEndPoint + '/users'
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Obtetiene los usuarios registrados
   */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.endPoint, httpGetOptions)
      .pipe(
        catchError(this.handleError('getUser', []))
      );
  }
  
  /**
   *  Obtiene el usuario por medio del id
   */
  getUser(id: number): Observable<User> {
    const url = `${this.endPoint}/${id}`;
    return this.http.get<User>(url, httpGetOptions).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /**
   * Actualizar usuario
   * @param user
   */
  updateUser(user: User): Observable<any> {
    const url = `${this.endPoint}/${user.id}`;
    return this.http.put(url, user, httpSetOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /**
   * Agregar un nuevo usuario
   * @param user
   */
  addUser (user: User): Observable<any> {
    const url = `${this.endPoint}`;
    return this.http.post<User>(url, user, httpSetOptions).pipe(
      catchError(this.handleError<User>('addUser'))
    );
  }

  /**
   * Eliminar usuario
   * @param user
   */
  deleteUser (user: User | number): Observable<any> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.endPoint}/${id}`;
    return this.http.delete<any>(url, httpGetOptions).pipe(
      catchError(this.handleError<any>('deleteUser'))
    );
  }
}
