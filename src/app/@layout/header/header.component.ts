import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor(private translate: TranslateService) {
    }
    ngOnInit() {
    }

    public sidebarToggle(): void {
        if(!document.getElementById("sidebar-wrapper").classList.contains("toggle")){
            document.getElementById("sidebar-wrapper").classList.add("toggle");
        }else{
            document.getElementById("sidebar-wrapper").classList.remove("toggle");
        }
    }
}
