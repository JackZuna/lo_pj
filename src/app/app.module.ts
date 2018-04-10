 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UtilService } from './util.service'
import { LosAuthModule } from 'los-auth';
import { LosAuthService, LosLoginModel } from 'los-auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Globals } from './globals'

import { LosRoute } from 'ng-los';
import { LosModule } from 'ng-los';
import { AppComponent } from './app.component';
import { LoginComponent } from './vistas/login/login';
import { mainComponent } from './vistas/main/main';


//ABC
import { MarcaComponent } from './marca/marca.component';
import { SeccionComponent } from './seccion/seccion.component';
import { SubseccionComponent } from './subseccion/subseccion.component';
import { TemaComponent } from './tema/tema.component';
import { CeldaComponent } from './celda/celda.component';
import { WireframeComponent } from './wireframes/wireframes.component';




const appRoutes: Routes = [	
	{
		path: 'login',
		component: LoginComponent,
		data: { title: 'Login' }
	},
	{
		path: '',
		redirectTo: '/home',
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
		path: '',
		component: mainComponent,
		losAuthActivate: false
	},
	{
		path: 'marca',
		component: MarcaComponent,
		losAuthActivate: false
	},
	{
		path: 'seccion',
		component: SeccionComponent,
		losAuthActivate: false
	},
	{
		path: 'subseccion',
		component: SubseccionComponent,
		losAuthActivate: false
	}
	,
	{
		path: 'celda',
		component: CeldaComponent,
		losAuthActivate: false
	},
	{
		path: 'tema',
		component: TemaComponent,
		losAuthActivate: false
	}
    ,{
		path: 'Wireframes',
		component: WireframeComponent,
		losAuthActivate: false
	}
    
];


@NgModule({
	declarations: [
	    LoginComponent,
	    AppComponent,
	    mainComponent,
		MarcaComponent,
		SeccionComponent,
		SubseccionComponent,
		TemaComponent,
		CeldaComponent,
		WireframeComponent

	],
  imports: [
	  BrowserModule,
	  FormsModule,
	  LosModule.forRoot(),
      LosModule.forRoutes(routes),
      RouterModule.forRoot(appRoutes),
	  NgbModule.forRoot(),
	  HttpClientModule
  ],
  providers: [Globals, UtilService, LosAuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
