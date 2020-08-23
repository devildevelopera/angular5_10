import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { promise } from 'selenium-webdriver';
import { environment } from '../../../environments/environment';
import { Http, Headers } from '@angular/http';
@Injectable()
export class EmployeeInfoService implements Resolve<any>
{



  AuthorizeToken: string;
  filterstring: string = "";


  constructor(
    private http: HttpClient

  ) {
    this.AuthorizeToken = JSON.parse(sessionStorage.getItem('AuthorizeToken'));
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
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
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
    headers.append('Authorization', 'Bearer ' + this.AuthorizeToken['id_token']);
  }

  // filterListbyParamerters(firstName,lastName,phone1): Promise<any>
  // {
  //     let headers = new  HttpHeaders({
  //       'Content-Type' : 'application/json',
  //       'Cache-Control': 'no-cache',
  //       'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
  //          });    
  //          let options = {
  //       headers: headers
  //          }; 
  //          this.filterstring=
  //          (firstName!=undefined?(this.filterstring==""?'firstName='+firstName:'&firstName='+firstName):"")+""+
  //          (lastName!=undefined?(this.filterstring==""?'lastName='+lastName:'&lastName='+lastName):"")+""+
  //          (phone1!=undefined?(this.filterstring==""?'phone1='+phone1:'&phone1='+phone1):"");
  //     const url=this.getUrl(API_CustomerLike_URL+'?'+this.filterstring);
  //     return new Promise((resolve, reject) => {
  //                 this.http.get(url,options)
  //                     .subscribe((response: any) => {
  //                         resolve(response);
  //                     }, reject);
  //             }).catch((response: any) => {
  //               return response;
  //           });;
  // }
  UpdateEmployeeInfo(formData): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Employees_URL);
    return new Promise((resolve, reject) => {
      this.http.put(url, formData, options)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    }).catch((response: any) => {
      return response;
    });;
  }

  register(account: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Register);
    return this.http.post(url, account, options);
  }

  getEmployeeList(): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Employees_URL);
    return new Promise((resolve, reject) => {
      this.http.get(url, options)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    }).catch((response: any) => {
      return response;
    });;
  }
  getPermissionList(): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Permission_URL);
    return new Promise((resolve, reject) => {
      this.http.get(url, options)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    }).catch((response: any) => {
      return response;
    });;
  }
  getStoresList(): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Stores_URL);
    return new Promise((resolve, reject) => {
      this.http.get(url, options)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    }).catch((response: any) => {
      return response;
    });;
  }
  getLanguageList(): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Language_URL);
    return new Promise((resolve, reject) => {
      this.http.get(url, options)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    }).catch((response: any) => {
      return response;
    });;
  }
  SaveEmployeeInfo(formdata): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Employees_URL);
    return new Promise((resolve, reject) => {
      this.http.post(url, formdata, options)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    }).catch((response: any) => {
      return response;
    });;
  }
  deleteEmployeeById(arg0: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Employees_URL + '/' + arg0);
    return new Promise((resolve, reject) => {
      this.http.delete(url, options)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    }).catch((response: any) => {
      return response;
    });;
  }
  GetEmployeeById(arg0: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer ' + this.AuthorizeToken['id_token']
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Employees_URL + '/' + arg0);
    return new Promise((resolve, reject) => {
      this.http.get(url, options)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    }).catch((response: any) => {
      return response;
    });;
  }


}
export const API_Register = '/api/register';
export const API_Employees_URL = '/api/employees';
export const API_Permission_URL = '/api/permissions';
export const API_Stores_URL = '/api/store-locals';
export const API_Language_URL = '/api/permissions';


