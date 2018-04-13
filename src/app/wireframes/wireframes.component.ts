import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Tema } from '../models';
import { Seccion } from '../models';
import { Marca } from '../models';
import { Menu } from '../models';
import { SeccionMenu } from '../models';
import { SubSeccionMenu } from '../models';

import { Temas } from '../models';
import { menuTema } from '../models';
import { Celda } from '../models';


import { UtilService } from '../util.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'


@Component({
	selector: 'app-tema',
	templateUrl: './wireframes.component.html',
	styleUrls: ['./wireframes.component.css']
})

export class WireframeComponent implements OnInit {

	constructor(private modalService: NgbModal,
		private changeDetectorRef: ChangeDetectorRef,
		private http: HttpClient
		, private utilService: UtilService
	) { }

	private baseUrlmenu = "http://localhost:3000/wireframe/get";  // web api URL
	private baseUrlTemaYCeldas = "http://localhost:3000/wireframe/gettema";  // web api URL


	


	ngOnInit() {
		this.getmenu();
		this.getTemas(1,1);
		
		this.formData = new FormData();
	}

	menu: Menu;
	mSeccion: SeccionMenu[] = [];
	marcas: Marca[] = [];

	arreglotemas: Temas;
	mtema: menuTema[] = [];
	mcelda: Celda[] = [];

	temaSeleccionada = new Tema();
	newtema = new Tema();
	esModificar: boolean;
	MuestraForma = false;
	closeResult: string;
	index: number;
	formData: FormData;


	

	getmenu() {
		this.http.get<Menu>(this.baseUrlmenu).subscribe(data => {			
			this.menu = data;
			this.mSeccion = this.menu.secciones;
			console.log(this.menu);
		});
	}	

	getTemas(pid, pcategoria) {
		console.log(pid + " " + pcategoria);
		const req = this.http.post<Temas>(this.baseUrlTemaYCeldas,
			{
				headers: { 'Accept': 'application/json' },
				id: pid,
				idc: pcategoria,
			})
			.subscribe(
			res => {
				this.arreglotemas = res
				console.log(this.arreglotemas);
				console.log(this.arreglotemas.temas);
				this.mtema = this.arreglotemas.temas;
				console.log(this.mtema[0]);
			},
			err => {
				console.log("Error occured");
				return "nok";
			}
			);
		return "nok";
	}	
	

	





}




