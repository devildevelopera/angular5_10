import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { promise } from 'selenium-webdriver';
import { environment } from '../../../environments/environment';
import { Http, Headers } from '@angular/http';
@Injectable()
export class PermissionInfoService implements Resolve<any>
{
 
  
  AuthorizeToken: string;
    filterstring: string="";
 
   
    constructor(
        private http: HttpClient

    )
    {
      this.AuthorizeToken= JSON.parse(sessionStorage.getItem('AuthorizeToken'));
    }
    public getBaseUrl(): string {
        return environment.baseUrl;
      }
      protected getUrl(relativeUrl: string) {
        return this.getBaseUrl() + relativeUrl;
      }
    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
           //     this.getWidgets()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }
    createAuthorizationHeader(headers: Headers) {
      headers.append('Authorization', 'Bearer ' +this.AuthorizeToken['id_token']); 
    }
  
    
     updateAccessLevel(formData): Promise<any>
     {
         let headers = new  HttpHeaders({
           'Content-Type' : 'application/json',
           'Cache-Control': 'no-cache',
           'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
              });    
              let options = {
           headers: headers
              };     
         const url=this.getUrl(API_Permission_URL);
         return new Promise((resolve, reject) => {
                     this.http.put(url,formData,options)
                         .subscribe((response: any) => {
                             resolve(response);
                         }, reject);
                 }).catch((response: any) => {
                   return response;
               });;
     }
   
     SubmitAccessLevelDetails(formData): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_Permission_URL);
        return new Promise((resolve, reject) => {
                    this.http.post(url,formData,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    getPermissionList(): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_Permission_URL);
        return new Promise((resolve, reject) => {
                    this.http.get(url,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });
    }
    getCustomerList(): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_Permission_URL);
        return new Promise((resolve, reject) => {
                    this.http.get(url,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    SaveCustomerInfo(formdata): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_Permission_URL);
        return new Promise((resolve, reject) => {
                    this.http.put(url,formdata,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    deletePermissionById(arg0: any): Promise<any>
     {
         let headers = new  HttpHeaders({
           'Content-Type' : 'application/json',
           'Cache-Control': 'no-cache',
           'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
              });    
              let options = {
           headers: headers
              };     
         const url=this.getUrl(API_Permission_URL+'/'+arg0);
         return new Promise((resolve, reject) => {
                     this.http.delete(url,options)
                         .subscribe((response: any) => {
                             resolve(response);
                         }, reject);
                 }).catch((response: any) => {
                   return response;
               });;
     }
     GetPermissionById(arg0: any): Promise<any>
     {
         let headers = new  HttpHeaders({
           'Content-Type' : 'application/json',
           'Cache-Control': 'no-cache',
           'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
              });    
              let options = {
           headers: headers
              };     
         const url=this.getUrl(API_Permission_URL+'/'+arg0);
         return new Promise((resolve, reject) => {
                     this.http.get(url,options)
                         .subscribe((response: any) => {
                             resolve(response);
                         }, reject);
                 }).catch((response: any) => {
                   return response;
               });;
     }
      
   
}
export const API_Permission_URL = '/api/permissions';


