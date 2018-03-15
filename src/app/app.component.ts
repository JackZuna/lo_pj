import { Component } from '@angular/core';
import { Globals } from './globals'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
			name: 'About',
			path: 'about',
			icon: 'error',
			isDropDown: false,
			childs: [],
			handle: null
		},
		{
			name: 'Protected',
			path: 'protected',
			icon: 'lock',
			isDropDown: false,
			childs: [],
			handle: null
		},
		{
			name: 'Function',
			path: '',
			icon: 'touch_app',
			isDropDown: false,
			childs: [],
			handle: () => {
				console.log('Pusalte el botón en el menú');
			},
			handleIcon: 'warning'
		},
		{
			name: 'Sub Menu',
			path: '',
			icon: 'folder',
			isDropDown: true,
			childs: [
				{
					name: 'Home',
					path: '',
					icon: 'public',
					isDropDown: false,
					childs: [],
					handle: null
				},
				{
					name: 'About',
					path: 'about',
					icon: 'error',
					isDropDown: false,
					childs: [],
					handle: null
				},
				{
					name: 'Protected',
					path: 'protected',
					icon: 'lock',
					isDropDown: false,
					childs: [],
					handle: null
				}
			],
			handle: null
		}
	];
}
