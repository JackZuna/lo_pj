import { Component } from '@angular/core';
import { Globals } from './globals'
import { UtilService } from './util.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

	
	private role: string;

	constructor(private globals: Globals, private utilService: UtilService) {
		this.role = globals.role;
		
	}

}
