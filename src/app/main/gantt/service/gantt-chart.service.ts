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
    let jObject:any={ ItemList: JSON.stringify([{ 
     CompanyDBID: CompanyDBID
    }])};
    return this.httpClient.post(optiProDashboardAPIURL +"PlanningDashboard/GetPlanDefinitionList",jObject,this.httpOptions);
  } 

  GetPlanOrderNo(optiProDashboardAPIURL:string,CompanyDBID:string,PlanDefinition:string): Observable<any>{
    let jObject:any={ ItemList: JSON.stringify([{ 
     CompanyDBID: CompanyDBID,
     PlannedDefination: PlanDefinition
    }])};
    return this.httpClient.post(optiProDashboardAPIURL +"PlanningDashboard/GetPlannedOrderNoList",jObject,this.httpOptions);
  } 

  GetHeaderData(optiProDashboardAPIURL:string,CompanyDBID:string,PlanDefinition:string,PlanOrder:string): Observable<any>{
    let jObject:any={ ItemList: JSON.stringify([{ 
     CompanyDBID: CompanyDBID,
     PlannedDefination: PlanDefinition,
     PlannedOrderNo: PlanOrder
    }])};
    return this.httpClient.post(optiProDashboardAPIURL +"PlanningDashboard/GetGanttChartHeader",jObject,this.httpOptions);
  }
}
