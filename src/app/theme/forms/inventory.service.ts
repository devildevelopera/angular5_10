import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { promise } from "selenium-webdriver";
import { environment } from "../../../environments/environment";
import { Http, Headers } from "@angular/http";
@Injectable()
export class InventoryService implements Resolve<any> {
  AuthorizeToken: string;
  filterstring: string = "";

  constructor(private http: HttpClient) {
    this.AuthorizeToken = JSON.parse(sessionStorage.getItem("AuthorizeToken"));
  }
  public getBaseUrl(): string {
    return environment.baseUrl;
    // return 'http://localhost:8082';
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
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        //     this.getWidgets()
      ]).then(() => {
        resolve();
      }, reject);
    });
  }

  uploadItemPicture(itemPicture: File): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const fd = new FormData();
    fd.append("file", itemPicture);
    const url = this.getUrl(API_ItemUpload_URL);
    return this.http.post(url, fd, options);
  }

  getDecryptedUrl(data) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Decrypt_URL);
    return this.http.post(url, data, options);
  }

  createItem(data): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_SubmitInventoryDetails_URL);
    return this.http.post(url, data, options);
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append(
      "Authorization",
      "Bearer " + this.AuthorizeToken["id_token"]
    );
  }

  filterListbyParamerters(
    itemName,
    barcode,
    brand,
    deptName,
    family,
    size,
    subFamily,
    vendor
  ): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    this.filterstring =
      (barcode != undefined
        ? this.filterstring == ""
          ? "itemNum=" + barcode
          : "&itemNum=" + barcode
        : "") +
      "" +
      (itemName != undefined
        ? this.filterstring == ""
          ? "itemName=" + itemName
          : "&itemName=" + itemName
        : "") +
      "" +
      (brand != undefined
        ? this.filterstring == ""
          ? "brand=" + brand
          : "&brand=" + brand
        : "") +
      "" +
      (family != undefined
        ? this.filterstring == ""
          ? "family=" + family
          : "&family=" + family
        : "") +
      "" +
      (subFamily != undefined
        ? this.filterstring == ""
          ? "subFamily=" + subFamily
          : "&subFamily=" + subFamily
        : "") +
      "" +
      (size != undefined
        ? this.filterstring == ""
          ? "size=" + size
          : "&size=" + size
        : "") +
      "" +
      (vendor != undefined
        ? this.filterstring == ""
          ? "vendor=" + vendor
          : "&vendor=" + vendor
        : "") +
      "" +
      (deptName != undefined
        ? this.filterstring == ""
          ? "deptName=" + deptName
          : "&deptName=" + deptName
        : "");
    // const url=this.getUrl(API_InventoryLike_URL+'?'+this.filterstring);
    const url =
      "http://localhost:8082/api/inventories-like" + "?" + this.filterstring;
    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }
  updateInventory(formData): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_SubmitInventoryDetails_URL);
    return new Promise((resolve, reject) => {
      this.http.put(url, formData, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }
  deleteInventoryById(arg0: any): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_SubmitInventoryDetails_URL + "/" + arg0);
    return new Promise((resolve, reject) => {
      this.http.delete(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }

  getSections(): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Section_URL);
    return this.http.get(url, options);
  }

  getCategories(): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Category_URL);
    return this.http.get(url, options);
  }

  GetInventoryById(arg0: any): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_SubmitInventoryDetails_URL + "/" + arg0);
    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }

  getModifiers(): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_Modifiers_URL);
    return this.http.get(url, options);
  }

  getModifiersGroup(): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_ModifiersGroup_URL);
    return this.http.get(url, options);
  }

  getVendorsDropdownList(): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_GetVendorsDropdownList_URL);
    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }
  getSizeDropdownList(): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_GetSizeDropdownList_URL);
    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }

  getDepartmentDropdownList(): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_GetDepartmentDropdownList_URL);
    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }
  getBrandDropdownList(): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_GetBrandDropdownList_URL);
    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }
  getFamilyDropdownList(): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_FamilyDropdownList_URL);
    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }
  getSubfamilyDropdownList(): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_GetSubfamilyDropdownList_URL);
    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }
  getStoreIDDropdownList(): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_GetStoreIDDropdownList_URL);
    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }
  SubmitInventoryDetails(formData): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_SubmitInventoryDetails_URL);
    return new Promise((resolve, reject) => {
      this.http.post(url, formData, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }
  getInventoryListCount(skip, limit): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(
      API_SubmitInventoryDetails_URL + "?limit=" + limit + "&skip=" + skip
    );
    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }
  getInventoryList(): Promise<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    const url = this.getUrl(API_SubmitInventoryDetails_URL);
    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((response: any) => {
        resolve(response);
      }, reject);
    }).catch((response: any) => {
      return response;
    });
  }
}
export const API_GetSubfamilyDropdownList_URL = "/api/sub-families";
export const API_FamilyDropdownList_URL = "/api/families";
export const API_GetBrandDropdownList_URL = "/api/brands";
export const API_GetDepartmentDropdownList_URL = "/api/depts";
export const API_GetSizeDropdownList_URL = "/api/size-lists";
export const API_GetVendorsDropdownList_URL = "/api/vendors";
export const API_GetStoreIDDropdownList_URL = "/api/all-store-locals";
export const API_SubmitInventoryDetails_URL = "/api/inventories";
export const API_InventoryLike_URL = "/api/inventories-like";
export const API_Modifiers_URL = "/api/modifiers";
export const API_ModifiersGroup_URL = "/api/modifiers-groups";
export const API_Category_URL = "/api/categories";
export const API_Section_URL = "/api/sections";
export const API_ItemUpload_URL = "/api/item-photo-upload";
export const API_Decrypt_URL = "/api/s3/decryption";
