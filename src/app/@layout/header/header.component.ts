import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    private _sidebarStatus: string ;

    constructor(private translate: TranslateService) {
    }
    ngOnInit() {        
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

}
