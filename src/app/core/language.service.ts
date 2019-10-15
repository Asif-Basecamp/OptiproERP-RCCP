import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

    constructor(private httpClient : HttpClient) {
    }

    languageSet(translate, lang){
        translate.addLangs(['en', 'fr'])
        translate.setDefaultLang(lang);
        translate.use(lang);
    }

}
