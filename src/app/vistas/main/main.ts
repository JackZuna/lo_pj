import { Component } from '@angular/core';
import { Globals } from '../../globals'
import { LosSideMenu } from 'ng-los';
import { LosModule } from 'ng-los';


@Component({
  selector: 'main',
  templateUrl: './main.html',
  styleUrls: ['./app.component.css']
})
export class mainComponent {
    title = '';
	private role: string;

	constructor(private globals: Globals) {
		this.role = globals.role;
	}

	menus: LosSideMenu[] = [
		{
			name: 'Home',
			path: '',
			icon: 'public',
			isDropDown: false,
			childs: [],
			handle: null
		},		
		{
			name: 'ABC',
			path: '',
			icon: 'folder',
			isDropDown: true,
			childs: [
				{
					name: 'Marca',
					path: 'marca',
					icon: 'public',
					isDropDown: false,
					childs: [],
					handle: null
				}, {
					name: 'Seccion',
					path: 'seccion',
					icon: 'public',
					isDropDown: false,
					childs: [],
					handle: null
				}
			],
			handle: null
		}
	];
}
