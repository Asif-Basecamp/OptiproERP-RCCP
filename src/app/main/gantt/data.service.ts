import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept':'application/json'
      })
  };

  private _data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _order: BehaviorSubject<any> = new BehaviorSubject<any>(null);


    public setData(data: any){
        this._data.next(data);
    }

    public getData(): Observable<any> {
        return this._data.asObservable();
    }

    public setOrder(order: any){
        this._order.next(order);
    }

    public getOrder(): Observable<any> {
        return this._order.asObservable();
    }

}
