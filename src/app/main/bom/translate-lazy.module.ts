import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalFileContants } from "./constants";
import { LocalStorageService } from "./localstorage.service";
// import { CommonHelper, LocalStorageService } from "ewapps-lib";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, LocalFileContants.LangTransFileUrl, '.json');
}

@NgModule({
    imports: [
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            },
            isolate:true
        }),        
    ],
    declarations: [
    ],
    providers: [
    ],
    exports: [
        TranslateModule
    ]
})
export class TrnaslateLazyModule {
    constructor(translate: TranslateService, private localStorageService: LocalStorageService) {
        // get the current UserLang
        // let userLang: string = translate.getBrowserLang();
        // let userLang: string = CommonHelper.getBrowserLanguage();
        let userLang: string = this.localStorageService.getCurrentLanguage();
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        // translate.use(userLang);

        // Get Language from local storage
        let currentLang = localStorageService.getCurrentLanguage();
        translate.use(currentLang);
    }
}