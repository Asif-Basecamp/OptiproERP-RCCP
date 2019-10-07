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

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	private commonData = new CommonData();
	public fileURL = this.commonData.get_current_url();
	public language: any = [];
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


	constructor(private notificationService: NotificationService, private router: Router, private auth: AuthenticationService, private httpClientSer: HttpClient) { }

	ngOnInit() {
		this.defaultCompnyComboValue = [{ OPTM_COMPID: 'Select Company' }];
		this.listItems = this.defaultCompnyComboValue;
		this.selectedValue = this.listItems[0];

		 /*if (window.localStorage.getItem('Username') != null || window.localStorage.getItem('Username') != undefined) {
		 	this.router.navigateByUrl('/login');
		 }*/
		console.log(this.fileURL + '/assets/config.json');
		this.httpClientSer.get(this.fileURL + '/assets/config.json').subscribe(
			data => {
				this.arrConfigData = data as string[];
				window.localStorage.setItem('arrConfigData', JSON.stringify(this.arrConfigData[0]));
				this.loadLanguage(this.arrConfigData[0].language);
			},
			(err: HttpErrorResponse) => {
				
				this.notificationService.show({
					content: err.message,
					animation: { type: 'fade', duration: 400 },
					position: { horizontal: 'right', vertical: 'top' },
					type: { style: 'error', icon: true },
					hideAfter: 1000
				  }); 
			}
			
		);
	}
	public loadLanguage(langParam) {
		this.httpClientSer.get(this.fileURL + '/assets/i18n/' + langParam + '.json').subscribe(
			data => {
				window.localStorage.setItem('language', JSON.stringify(data));
				this.language = JSON.parse(window.localStorage.getItem('language'));
				this.defaultCompnyComboValue = [{ OPTM_COMPID: this.language.company_placeholder }];
				this.listItems = this.defaultCompnyComboValue;
				this.selectedValue = this.listItems[0];
				this.getPSURL();
			},
			error => {
				this.notificationService.show({
					content:this.language.error_reading_file,
					animation: { type: 'fade', duration: 400 },
					position: { horizontal: 'right', vertical: 'top' },
					type: { style: 'error', icon: true },
					hideAfter: 1000
				  }); 
			});
	}
	getPSURL() {
		this.auth.getPSURL(this.arrConfigData[0].optiProDashboardAPIURL, this.adminDBName).subscribe(
			data => {
				if (data != null) {
					this.psURL = data;
					console.log(data)
				}
			},
			error => {
				this.notificationService.show({
					content: 'Some Error!',
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
						//this.toastr.error(this.language.password_incorrect);
						this.notificationService.show({
							content: this.language.password_incorrect,
							animation: { type: 'fade', duration: 400 },
							position: { horizontal: 'right', vertical: 'top' },
							type: { style: 'error', icon: true },
							hideAfter: 1000
						}); 
					}
				},
				error => {
					/*this.toastr.error('', this.language.error_some_error,{
						timeOut: 1000
					});*/
					this.notificationService.show({
						content: this.language.error_some_error,
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
				/*	this.toastr.error('','No Company assign!', {
						timeOut: 1000
					});*/
					this.notificationService.show({
						content: 'No Company assign!',
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
