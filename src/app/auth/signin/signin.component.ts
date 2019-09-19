import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

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

	//model : any={};    

	constructor(private auth: AuthenticationService, private toastr: ToastrService, private httpClientSer: HttpClient, private router: Router) { }

	ngOnInit() {
		this.defaultCompnyComboValue = [{ OPTM_COMPID: 'Select Company' }];
		this.listItems = this.defaultCompnyComboValue;
		this.selectedValue = this.listItems[0];
	}

	getPSURL() {
		this.auth.getPSURL(environment.optiProDashboardURL, this.adminDBName).subscribe(
			data => {
				if (data != null) {
					this.psURL = data;
				}
			},
			error => {
				this.toastr.error('', 'Some Error!');
			})
	}

	onPasswordBlur() {
		if (this.loginId == "" || this.loginId == undefined || this.password == "" || this.password == undefined) {
			return;
		} else {
			this.auth.login(this.loginId, this.password, environment.optiProDashboardURL).subscribe(
				data => {
					this.modelSource = data;
					console.log(this.modelSource);
					if (this.modelSource != null && this.modelSource.Table.length > 0 && this.modelSource.Table[0].OPTM_ACTIVE == 1) {
						this.getCompanies();
						this.disableDropDown = false;
					} else {
						this.listItems = this.defaultCompnyComboValue;
						this.selectedValue = this.listItems[0];
						this.toastr.error('', 'Invalid Password!');
						//this.toastrService.danger(this.language.password_incorrect);
					}
				},
				error => { });
		}
	}

	getCompanies() {
		this.auth.getCompany(this.loginId, environment.optiProDashboardURL).subscribe(
			data => {
				this.modelSource = data;
				if (this.modelSource.Table[0]) {
					this.assignedCompanies = data.Table;
					this.clickSignIn = false;
					this.listItems = this.assignedCompanies;
					this.selectedValue = this.listItems[0];
					this.InvalidActiveUser = false;
				} else {
					this.toastr.error('', 'No Company assign!');
					this.InvalidActiveUser = true;
				}
			})
	}

	OnSignIn() {
		this.router.navigateByUrl('/Dashboard');
		localStorage.setItem('CompanyDB', JSON.stringify(this.selectedValue.OPTM_COMPID));
		localStorage.setItem('Username', JSON.stringify(this.loginId));
		localStorage.setItem('Userpwd', JSON.stringify(this.password));
	}
}
