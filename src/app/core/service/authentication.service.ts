import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept':'application/json'
    })
  };

  getPSURL(optiProDashboardAPIURL:string,CompanyDBID:string):Observable<any>{
    let jObject: any = { PSURL: JSON.stringify([{ CompanyDBID: CompanyDBID }]) };
    return this.httpClient.post(optiProDashboardAPIURL + "Login/GetPSURL", jObject, this.httpOptions);  
  }

  login(loginId:string,password:string,psURL:string):Observable<any>{
    let jObject:any={ Login: JSON.stringify([{ User: loginId, Password: password, IsAdmin: false }]) };
    console.log(jObject);
    return this.httpClient.post(psURL+"api/login/ValidateUserLogin",jObject,this.httpOptions);
  }

  getCompany(loginId:string,psURL:string):Observable<any>{
    let jObject:any={ Username: JSON.stringify([{ Username: loginId ,Product: "DSB"}]) };
    return this.httpClient.post(psURL+"api/login/GetCompaniesAndLanguages",jObject,this.httpOptions)
  }

}
