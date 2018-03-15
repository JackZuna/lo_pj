import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { Globals } from './globals'

import { LosRoute } from 'ng-los';

import { AppComponent } from './app.component';
import { LoginComponent } from './vistas/login/login';
import { mainComponent } from './vistas/main/main';


import { LosModule } from 'ng-los';



const appRoutes: Routes = [	
	{
		path: 'login',
		component: LoginComponent,
		data: { title: 'Login' }
	},
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: mainComponent,
		data: { title: 'home' }
	},
	{ path: '**', component: LoginComponent }
];


const routes: LosRoute[] = [
	{
		path: 'login',
		component: LoginComponent,
		losAuthActivate: false
	}
];


@NgModule({
	declarations: [
	  LoginComponent,
	  AppComponent,
	  mainComponent
	  
  ],
  imports: [
	  BrowserModule,
	  FormsModule,
	  LosModule.forRoot(),
      LosModule.forRoutes(routes),
      RouterModule.forRoot(appRoutes)

  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})

export class AppModule { }
