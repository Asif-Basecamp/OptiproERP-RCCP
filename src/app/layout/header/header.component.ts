import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Injector } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/localstorage.service';
import { ServiceLocator } from 'src/app/core/servicelocator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  constructor(private translate: TranslateService, private localStorageService: LocalStorageService, private injector: Injector) { 
    let userLang: string = this.localStorageService.getCurrentLanguage();
    translate.use(userLang);
    ServiceLocator.injector = this.injector;
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
