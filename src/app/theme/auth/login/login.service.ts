import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { promise } from 'selenium-webdriver';
import { environment } from '../../../../environments/environment';
@Injectable()
export class LoginService implements Resolve<any>
{
    
   
    constructor(
        private http: HttpClient
    )
    {
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
    
    SubmitUserLoginCredentials(formData): Promise<any>
    {
        const url=this.getUrl(API_USERAUTHORIZE_URL);
        return new Promise((resolve, reject) => {
                    this.http.post(url,formData)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
   
}
export const API_USERAUTHORIZE_URL = '/api/authenticate';
