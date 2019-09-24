import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NotificationService } from '@progress/kendo-angular-notification';
import { FormsModule } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {    
    
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
  
  
  constructor(private router:Router,private auth:AuthenticationService,private notificationService: NotificationService ) { } 

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
            this.notificationService.show({
              content: 'Invalid Password!',
              animation: { type: 'fade', duration: 400 },
              position: { horizontal: 'right', vertical: 'top' },
              type: { style: 'error', icon: true },
              hideAfter: 1000
            });
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
