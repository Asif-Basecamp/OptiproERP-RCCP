import {Injectable, Output, EventEmitter} from "@angular/core";
import {Task} from "../model/task";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
  
export class TaskService {

	public products: any;
    public arrays: any;
    public db: any;
    public description: any;
    public order: any;
    private subject = new Subject<any>();
    public productss: any;

    constructor(private httpClient : HttpClient, private Router : Router) { }
    
	httpOptions = {
		headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Accept':'application/json'
		  })
    };
    
    toggle(db, process, order) {
      this.db = db;
      this.description = process;
      this.order = order;
      this.get(this.db, this.description, this.order);
    }


    /*get(db, desc, order) {
        let jObject:any={ ItemList: JSON.stringify([{ 
            CompanyDBID: db,
			PlannedDefination: desc,
            PlannedOrderNo: order
        }])};

        let promise = new Promise((resolve, reject) => {
          this.httpClient.post("http://172.16.6.117/OptiProRCCPGanttChart/RCCPGanttChart/GetGanttChartData",jObject,this.httpOptions)
          .toPromise()
            .then(
              res => { 
                if(res){
                    // @ts-ignore
                    this.products = res.map(function(obj) {
                        obj['id'] = obj['SeqNo'];
                        delete obj['SeqNo'];
        
                        obj['text'] = obj['name'];
                        delete obj['name'];
        
                        obj['start_date'] = obj['STARTDATETIME']; 
                        delete obj['STARTDATETIME'];
                         
                        obj['end_date'] = obj['ENDDATETIME']; 
                        delete obj['ENDDATETIME']; 
                
                        obj['parent'] = obj['ParantId']; 
                        delete obj['ParantId'];
        
                        obj['open'] = true; 
        
                        if(obj['parent'] == ""){
                            obj['type'] = "project"; 
                        }else{
                            obj['type'] = "task";  
                        }
        
                        delete obj['OPTM_OPERNO'];
                        delete obj['OPTM_OPR_ID'];
                        delete obj['OPTM_RES_ID'];
                        delete obj['U_O_RESNAME'];
                        delete obj['OPTM_INFSQTY_PERC'];
                        return obj; 
                    }); 
                    console.log(this.products);
                }
                resolve();
              }
            );
        });
        return promise;
    }*/

	get(db, desc, order): Promise<any[]>{
		let jObject:any={ ItemList: JSON.stringify([{ 
            CompanyDBID: db,
			PlannedDefination: desc,
            PlannedOrderNo: order
        }])};
    
        if(db && desc && order){
            this.httpClient.post("http://172.16.6.117/OptiProRCCPGanttChart/RCCPGanttChart/GetGanttChartData",jObject,this.httpOptions).subscribe((res : any[])=>{
                if(res){
                    this.products = res.map(function(obj) {
                        obj['id'] = obj['SeqNo'];
                        delete obj['SeqNo'];
        
                        obj['text'] = obj['name'];
                        delete obj['name'];
        
                        obj['start_date'] = obj['STARTDATETIME']; 
                        delete obj['STARTDATETIME'];
                         
                        obj['end_date'] = obj['ENDDATETIME']; 
                        delete obj['ENDDATETIME']; 
        
                        // obj['progress'] = 1; 
        
                        obj['parent'] = obj['ParantId']; 
                        delete obj['ParantId'];
        
                        obj['open'] = true; 
        
                        if(obj['parent'] == ""){
                            // obj['type'] = "operation"; 
                            obj['type'] = "project"; 
                            
                        }else{
                            // obj['type'] = "resource";  
                            obj['type'] = "task";  
                        }
        
                        delete obj['OPTM_OPERNO'];
                        delete obj['OPTM_OPR_ID'];
                        delete obj['OPTM_RES_ID'];
                        delete obj['U_O_RESNAME'];
                        delete obj['OPTM_INFSQTY_PERC'];
                        return obj; 
                    }); 
                    localStorage.setItem('ganttChart', JSON.stringify(this.products)); 
                    this.arrays = JSON.parse(localStorage.getItem('ganttChart'));
                }
            });
            
         //  setTimeout(()=>{    
               this.productss =  this.arrays;
               console.log(this.productss);
           //}, 3000); 

           return Promise.resolve(this.productss); 

        }
       
    }
}	
	
	
