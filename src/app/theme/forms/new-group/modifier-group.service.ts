import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class ModifierGroupService {
  AuthorizeToken: string;
  filterstring: string = "";

  constructor(private http: HttpClient) {
    this.AuthorizeToken = JSON.parse(sessionStorage.getItem("AuthorizeToken"));
  }
  public getBaseUrl(): string {
    return environment.baseUrl;
  }
  protected getUrl(relativeUrl: string) {
    return this.getBaseUrl() + relativeUrl;
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append(
      "Authorization",
      "Bearer " + this.AuthorizeToken["id_token"]
    );
  }

  createGroup(formData): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + this.AuthorizeToken["id_token"]
    });
    let options = {
      headers: headers
    };
    // const url = this.getUrl(API_ModifiersGroups_URL);
    const url = "http://localhost:8082" + API_ModifiersGroups_URL;
    return this.http.post(url, formData, options);
  }
}
export const API_ModifiersGroups_URL = "/api/modifiers-groups";