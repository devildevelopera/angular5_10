import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ModifiersService {

  AuthorizeToken: string;

  constructor(private http: HttpClient) {
    this.AuthorizeToken = JSON.parse(sessionStorage.getItem('AuthorizeToken'));
  }

  public getBaseUrl(): string {
    return environment.baseUrl;
  }
  protected getUrl(relativeUrl: string) {
    return this.getBaseUrl() + relativeUrl;
  }

  getModifiers(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Modifiers_URL);
    return this.http.get(url, options);
  }

  addModifier(data: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Modifiers_URL);
    return this.http.post(url, data, options);
  }

  updateModifier(data: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Modifiers_URL);
    return this.http.put(url, data, options);
  }

  findByName(name: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_SEARCH_Modifiers_URL +'/?modifierName=' + `${name}`);
    return this.http.get(url, options);
  }

  deleteModifier(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Modifiers_URL+`/${id}`);
    // return this.http.delete(url, options);
    return new Promise((resolve, reject) => {
      this.http.delete(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }

}
export const API_Modifiers_URL = '/api/modifiers';
export const API_SEARCH_Modifiers_URL = '/api/search-modifiers';
