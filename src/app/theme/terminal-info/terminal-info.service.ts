import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { promise } from 'selenium-webdriver';
import { environment } from '../../../environments/environment';
import { Http, Headers } from '@angular/http';
@Injectable()
export class TerminalInfoService implements Resolve<any>
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
  
    filterListbyParamerters(firstName,lastName,phone1): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             }; 
             this.filterstring=
             (firstName!=undefined?(this.filterstring==""?'firstName='+firstName:'&firstName='+firstName):"")+""+
             (lastName!=undefined?(this.filterstring==""?'lastName='+lastName:'&lastName='+lastName):"")+""+
             (phone1!=undefined?(this.filterstring==""?'phone1='+phone1:'&phone1='+phone1):"");
        const url=this.getUrl(API_StoreLike_URL+'?'+this.filterstring);
        return new Promise((resolve, reject) => {
                    this.http.get(url,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
     updateInventory(formData): Promise<any>
     {
         let headers = new  HttpHeaders({
           'Content-Type' : 'application/json',
           'Cache-Control': 'no-cache',
           'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
              });    
              let options = {
           headers: headers
              };     
         const url=this.getUrl(API_SubmitInventoryDetails_URL);
         return new Promise((resolve, reject) => {
                     this.http.put(url,formData,options)
                         .subscribe((response: any) => {
                             resolve(response);
                         }, reject);
                 }).catch((response: any) => {
                   return response;
               });;
     }
   
     

    getVendorsDropdownList(): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_GetVendorsDropdownList_URL);
        return new Promise((resolve, reject) => {
                    this.http.get(url,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    getSizeDropdownList(): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_GetSizeDropdownList_URL);
        return new Promise((resolve, reject) => {
                    this.http.get(url,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    
    getDepartmentDropdownList(): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_GetDepartmentDropdownList_URL);
        return new Promise((resolve, reject) => {
                    this.http.get(url,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    getBrandDropdownList(): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_GetBrandDropdownList_URL);
        return new Promise((resolve, reject) => {
                    this.http.get(url,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    getFamilyDropdownList(): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_FamilyDropdownList_URL);
        return new Promise((resolve, reject) => {
                    this.http.get(url,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    getSubfamilyDropdownList(): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_GetSubfamilyDropdownList_URL);
        return new Promise((resolve, reject) => {
                    this.http.get(url,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    // getterminalIDDropdownList(): Promise<any>
    // {
    //     let headers = new  HttpHeaders({
    //       'Content-Type' : 'application/json',
    //       'Cache-Control': 'no-cache',
    //       'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
    //          });    
    //          let options = {
    //       headers: headers
    //          };     
    //     const url=this.getUrl(API_GetterminalIDDropdownList_URL);
    //     return new Promise((resolve, reject) => {
    //                 this.http.get(url,options)
    //                     .subscribe((response: any) => {
    //                         resolve(response);
    //                     }, reject);
    //             }).catch((response: any) => {
    //               return response;
    //           });;
    // }
    SubmitInventoryDetails(formData): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_SubmitInventoryDetails_URL);
        return new Promise((resolve, reject) => {
                    this.http.post(url,formData,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    getInventoryListCount(skip,limit): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_SubmitInventoryDetails_URL+'?limit='+limit+'&skip='+skip);
        return new Promise((resolve, reject) => {
                    this.http.get(url,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    getterminalList(): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_GetterminalList_URL);
        return new Promise((resolve, reject) => {
                    this.http.get(url,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    SaveterminalInfo(formdata): Promise<any>
    {
        let headers = new  HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
             });    
             let options = {
          headers: headers
             };     
        const url=this.getUrl(API_GetterminalList_URL);
        if(formdata.id==undefined)
        {
            return new Promise((resolve, reject) => {
                this.http.post(url,formdata,options)
                    .subscribe((response: any) => {
                        resolve(response);
                    }, reject);
            }).catch((response: any) => {
              return response;
          });;
        }
        else
        return new Promise((resolve, reject) => {
                    this.http.put(url,formdata,options)
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
                }).catch((response: any) => {
                  return response;
              });;
    }
    deleteterminalById(arg0: any): Promise<any>
     {
         let headers = new  HttpHeaders({
           'Content-Type' : 'application/json',
           'Cache-Control': 'no-cache',
           'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
              });    
              let options = {
           headers: headers
              };     
         const url=this.getUrl(API_GetterminalList_URL+'/'+arg0);
         return new Promise((resolve, reject) => {
                     this.http.delete(url,options)
                         .subscribe((response: any) => {
                             resolve(response);
                         }, reject);
                 }).catch((response: any) => {
                   return response;
               });;
     }
     GetterminalById(arg0: any): Promise<any>
     {
         let headers = new  HttpHeaders({
           'Content-Type' : 'application/json',
           'Cache-Control': 'no-cache',
           'Authorization': 'Bearer ' +this.AuthorizeToken['id_token']
              });    
              let options = {
           headers: headers
              };     
         const url=this.getUrl(API_GetterminalList_URL+'/'+arg0);
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
export const API_GetterminalList_URL = '/api/trminallocals';
export const API_GetSubfamilyDropdownList_URL = '/api/sub-families';
export const API_FamilyDropdownList_URL = '/api/families';
export const API_GetBrandDropdownList_URL = '/api/brands';
export const API_GetDepartmentDropdownList_URL = '/api/depts';
export const API_GetSizeDropdownList_URL = '/api/size-lists';
export const API_GetVendorsDropdownList_URL = '/api/vendors';
export const API_GetStoreIDDropdownList_URL = '/api/store-locals';
export const API_SubmitInventoryDetails_URL = '/api/inventories';
export const API_StoreLike_URL = '/api/Storeinfor-like';


