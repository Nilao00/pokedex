import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string | undefined = "";

  constructor(
    public http: HttpClient,
  ) {
    this.baseUrl = environment.apiUrl;
  }

  /* Method get Default */
  methodGet<T>(endpoint: string, params: string = ""): Observable<T> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    if (params != "") {
      return this.http.get<T>(`${this.baseUrl + endpoint}"/"${params}`, {
        responseType: "json", headers
      });
    }

    return this.http.get<T>(this.baseUrl + endpoint, { responseType: "json", headers });
  }

  /* Method default post */
  methodPost(endpoint: string, body: any, params: string = "") {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    if (params != "") {
      return this.http.post(`${this.baseUrl + endpoint}"/"${params}`, body, {
        responseType: "json", headers
      });
    }

    return this.http.post(this.baseUrl + endpoint, body, { responseType: "json", headers });
  }


}
