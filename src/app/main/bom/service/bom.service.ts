import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BOMService {

  constructor(private httpClient : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept':'application/json'
      })
  };

  GetItemList(optiProDashboardAPIURL:string,CompanyDBID:string): Observable<any>{
    let jObject:any={ GetData: JSON.stringify([{ 
     CompanyDBID: CompanyDBID
    }])};
    return this.httpClient.post(optiProDashboardAPIURL +"BOMDashboard/GetItemListForFinishedGoods",jObject,this.httpOptions);
  } 

  GetWarehouseList(optiProDashboardAPIURL:string,CompanyDBID:string): Observable<any>{
    let jObject:any={ ItemList: JSON.stringify([{ 
     CompanyDBID: CompanyDBID
    }])};
    return this.httpClient.post(optiProDashboardAPIURL +"BOMDashboard/GetWarehouseList",jObject,this.httpOptions);
  } 
  
  GetItemExplosionData(optiProDashboardAPIURL:string,CompanyDBID:string,ItemFrom:string,ItemTo:string,WarehouseFrom:any, WarehouseTo:any, IsPrimary:any):Observable<any>{
     
    let jObject:any={ GetData: JSON.stringify([{ 
      CompanyDBID: CompanyDBID,
      ItemFrom: ItemFrom,
      ItemTo: ItemTo,
      WarehouseFrom: WarehouseFrom,
      WarehouseTo: WarehouseTo,
      IsPrimary: IsPrimary
  }]) };
  return this.httpClient.post(optiProDashboardAPIURL +"BOMDashboard/GetFinishedGoodsList",jObject,this.httpOptions);
 } 

 GetBOMDetailedData(optiProDashboardAPIURL:string,CompanyDBID:string,ItemCode:string,
  CreatedDate:string,Code:any,BOMSEQ:any,WHSECODE:any,Revision:any,IsPrimary:any):Observable<any>{

    CreatedDate = new Date(CreatedDate).toLocaleString();
   
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    ItemCode: ItemCode,
    CreateDate: CreatedDate,
    Code: Code,
    BOMSEQ: BOMSEQ,
    WHSECODE: WHSECODE,
    Revision: Revision,
    IsPrimary: IsPrimary
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"BOMDashboard/GetDetailedFinishedGoodsList",jObject,this.httpOptions);
} 

 GetBOMDetail(optiProDashboardAPIURL:string,CompanyDBID:string,Code:string):Observable<any>{
   
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    Code: Code
  }]) };
  return this.httpClient.post(optiProDashboardAPIURL +"BOMDashboard/GetFinishedGoodsBOMDetails",jObject,this.httpOptions);
} 

GetRoutingHeaderDetail(optiProDashboardAPIURL:string,CompanyDBID:string,ItemCode:string,IsPrimary:any):Observable<any>{
   
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    ItemCode: ItemCode,
    IsPrimary: IsPrimary
  }]) };
  return this.httpClient.post(optiProDashboardAPIURL +"BOMDashboard/GetFinishedGoodsRoutingHeaderDetails",jObject,this.httpOptions);
} 

GetRoutingLineDetail(optiProDashboardAPIURL:string,CompanyDBID:string,Code:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    Code: Code
  }]) };
  return this.httpClient.post(optiProDashboardAPIURL +"BOMDashboard/GetFinishedGoodsRoutingLineDetails",jObject,this.httpOptions);
} 

GetResourceDetail(optiProDashboardAPIURL:string,CompanyDBID:string,Code:string,LineNo:string):Observable<any>{
   
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    Code: Code,
    LineNo: LineNo
  }]) };
  return this.httpClient.post(optiProDashboardAPIURL +"BOMDashboard/GetFinishedGoodsResourceDetails",jObject,this.httpOptions);
} 

}
