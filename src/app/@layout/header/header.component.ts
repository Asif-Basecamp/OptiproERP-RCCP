import { Component, OnInit, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/core/service/localstorage.service';
import { ServiceLocator } from 'src/app/servicelocator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    private _sidebarStatus: string ;

    constructor(private translate: TranslateService, private router: Router, private localStorageService: LocalStorageService, private injector: Injector) {
        let userLang: string = this.localStorageService.getCurrentLanguage();
        translate.use(userLang);
        ServiceLocator.injector = this.injector;
    }
    ngOnInit() { 
        
       /* if (window.localStorage.getItem('Username') == null || window.localStorage.getItem('Username') == undefined) {
            this.router.navigateByUrl('/login');
        }  */     
        this.sidebar();
    }

    public sidebarToggle(): void {
        if(!document.getElementById("sidebar-wrapper").classList.contains("toggle")){
            document.getElementById("sidebar-wrapper").classList.add("toggle");
            localStorage.setItem('sidebarStatus', "close");
        }else{
            document.getElementById("sidebar-wrapper").classList.remove("toggle");
            localStorage.setItem('sidebarStatus', "open");
        }
    }
    


    // Sidebar open/close status from local storage
    public sidebar(){
        if(window.innerWidth >= 992){
            this._sidebarStatus = localStorage.getItem('sidebarStatus') || "open";
            if(this._sidebarStatus == "open"){
                document.getElementById("sidebar-wrapper").classList.remove("toggle");
            }else if(this._sidebarStatus == "close"){
                document.getElementById("sidebar-wrapper").classList.add("toggle");
            }
        }        
    }

    public logout(){
        localStorage.clear();
        this.router.navigateByUrl('/login');
    }

}
