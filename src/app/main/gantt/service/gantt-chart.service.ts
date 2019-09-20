import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GanttChartService {

  constructor(private httpClient : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept':'application/json'
      })
  };

  GetPlanDefinition(optiProDashboardAPIURL:string,CompanyDBID:string): Observable<any>{
    let jObject:any={ GetData: JSON.stringify([{ 
     CompanyDBID: CompanyDBID
    }])};
    return this.httpClient.post(optiProDashboardAPIURL +"GetPlanDefinitionList",jObject,this.httpOptions);
  } 
}
