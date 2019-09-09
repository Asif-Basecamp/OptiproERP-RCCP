import { Injectable } from '@angular/core';
//import { CommonHelper } from '../helpers/common.helper';
//import { AppIdAndNameModel } from '../models/app-appid-name-model';
import { AppUserSession } from './app-user-session-model';

@Injectable(
    { providedIn: 'root' }
)
export class LocalStorageService {
  //  private clientSessionId: string = '';
    private appUserSession: AppUserSession
  //  private userId: string;

  public getCurrentLanguage(): string {

    const session = this.getAppUserSession();
    let currentLang: string = '';
    if (session != undefined && session != null) {
        currentLang = session.Language;
    }
    if (currentLang == null || currentLang == '') {
        currentLang = 'en';
    }
    return currentLang;
}

public getAppUserSession(): AppUserSession {

    if (!this.appUserSession) {
        this.appUserSession = JSON.parse(localStorage.getItem("appusersession"));
        if (!this.appUserSession) {
            this.appUserSession = new AppUserSession();
        }
    }
    return this.appUserSession;
}
}