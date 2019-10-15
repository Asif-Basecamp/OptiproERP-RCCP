import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { CommonData } from 'src/app/core/data/CommonData';
import { NotificationService } from '@progress/kendo-angular-notification';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { LanguageService } from 'src/app/core/language.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	private commonData = new CommonData();
	public fileURL = this.commonData.get_current_url();
	public env: any = environment;
	public arrConfigData: any[];
	public loginId: string;
	public password: string;
	public modelSource: any = [];
	public defaultCompnyComboValue: any = [];
	public listItems: any = [] = this.defaultCompnyComboValue;
	public selectedValue: any = [];
	public disableDropDown: boolean = true;
	public assignedCompanies: any = [];
	public clickSignIn: boolean = true;
	public InvalidActiveUser: boolean = false;
	public adminDBName: string = "OPTIPROADMIN";
	public psURL: string;
	public select_company: any;
	public company_assign_error: any;
	public some_error: any;
	public password_error: any;

	constructor(private LanguageService: LanguageService, private notificationService: NotificationService, private datePipe: DatePipe, private router: Router, private translate: TranslateService, private auth: AuthenticationService, private httpClientSer: HttpClient) { }

	ngOnInit() {
		this.translate.get('company_placeholder').subscribe((text:string) => {
			this.select_company = text;
			this.defaultCompnyComboValue = [{ OPTM_COMPID: this.select_company }];
			this.listItems = this.defaultCompnyComboValue;
			this.selectedValue = this.listItems[0];
		}); 
		
		this.translate.get('CompanyAssignError').subscribe((text:string) => {
			this.company_assign_error = text;
		}); 
		this.translate.get('error_some_error').subscribe((text:string) => {
			this.some_error = text;
		}); 
		this.translate.get('password_incorrect').subscribe((text:string) => {
			this.password_error = text;
		});
		this.LanguageService.languageSet(this.translate, environment.language);
		this.getPSURL();
	}

	getPSURL() {
		this.auth.getPSURL(environment.service_url, this.adminDBName).subscribe(
			data => {
				//this.psURL = 'http://172.16.6.117/OptiProAdmin/';
				if (data != null) {
					this.psURL = data;
				}
			},
			error => {
				this.notificationService.show({
					content: this.some_error,
					animation: { type: 'fade', duration: 400 },
					position: { horizontal: 'right', vertical: 'top' },
					type: { style: 'error', icon: true },
					hideAfter: 1000
				}); 
			})
	}

	onPasswordBlur() {
		if (this.loginId == "" || this.loginId == undefined || this.password == "" || this.password == undefined) {
			return;
		} else {
			this.auth.login(this.loginId, this.password, this.psURL).subscribe(
				data => {
					this.modelSource = data;
					if (this.modelSource != null && this.modelSource.Table.length > 0 && this.modelSource.Table[0].OPTM_ACTIVE == 1) {
						this.getCompanies();
						this.disableDropDown = false;
					} else {
						this.listItems = this.defaultCompnyComboValue;
						this.selectedValue = this.listItems[0];
						this.notificationService.show({
							content: this.password_error,
							animation: { type: 'fade', duration: 400 },
							position: { horizontal: 'right', vertical: 'top' },
							type: { style: 'error', icon: true },
							hideAfter: 1000
						}); 
					}
				},
				error => {
					this.notificationService.show({
						content: this.some_error,
						animation: { type: 'fade', duration: 400 },
						position: { horizontal: 'right', vertical: 'top' },
						type: { style: 'error', icon: true },
						hideAfter: 1000
					}); 
				})
		}
	}

	getCompanies() {
		this.auth.getCompany(this.loginId, this.psURL).subscribe(
			data => {
				this.modelSource = data;
				if (this.modelSource.Table[0]) {
					this.assignedCompanies = data.Table;
					this.clickSignIn = false;
					this.listItems = this.assignedCompanies;
					this.selectedValue = this.listItems[0];
					this.InvalidActiveUser = false;
				} else {
					this.notificationService.show({
						content: this.company_assign_error,
						animation: { type: 'fade', duration: 400 },
						position: { horizontal: 'right', vertical: 'top' },
						type: { style: 'error', icon: true },
						hideAfter: 1000
					}); 
					this.InvalidActiveUser = true;
				}
			})
	}

	OnSignIn() {
		this.router.navigateByUrl('/main');
		localStorage.setItem('CompanyDB', JSON.stringify(this.selectedValue.OPTM_COMPID));
		localStorage.setItem('Username', JSON.stringify(this.loginId));
		localStorage.setItem('Userpwd', JSON.stringify(this.password));
	}
}
