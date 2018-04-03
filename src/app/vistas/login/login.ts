import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals'
import { UtilService } from '../../util.service'
import { LosAuthService, LosLoginModel } from 'los-auth';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./app.component.css']
})


export class LoginComponent {

	data: LosLoginModel = {
		username: 'usuario.desarrollo',
		password: 'pzGq5uixmr25',
		client_id: 'cc73800ebd6544d793b88a2aec59ca41',
		url: '',
		grant_type: 'password'
	}

	private clickMessage: string;
	private username: string;
	private password: string;
	private role: string;

	constructor(private globals: Globals, private utilService: UtilService
		, private authService: LosAuthService) {
		this.role = globals.role;
	}

	

	private changedRole() {
		this.utilService.calllogin();
		
		this.clickMessage = 'You are my hero!';
	}
	private onLogin() {
		
		this.authService.login(this.data).subscribe(response => {
			this.globals.role = response.access_token;
			this.changedRole();	
		}, responseError => {
			this.clickMessage = 'buuuu';

		});
	}
}
