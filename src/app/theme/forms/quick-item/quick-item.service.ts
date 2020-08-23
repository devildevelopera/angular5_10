import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class QuickItemService {

AuthorizeToken: string;
private baseUrl = environment.baseUrl;
private localUrl = 'http://localhost:8082';

constructor(private http: HttpClient) {
    this.AuthorizeToken= JSON.parse(sessionStorage.getItem('AuthorizeToken'));
}

getAllStores(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/store-locals`);
}

getDepartmentsByStoreId(id: number): Observable<any>{
    let headers = new  HttpHeaders({
        'Content-Type' : 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
           });    
           let options = {
        headers: headers
           };
    return this.http.get(`${this.baseUrl}/api/depts-store/${id}` , options);
}

createMultiple(data: any):Observable<any>{
    let headers = new  HttpHeaders({
        'Content-Type' : 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
           });    
           let options = {
        headers: headers
           };
    return this.http.post(`${this.localUrl}/api/multiple-inventory-quick`, JSON.stringify(data), options);
}

}
