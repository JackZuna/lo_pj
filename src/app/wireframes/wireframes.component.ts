import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Tema } from '../models';
import { Seccion } from '../models';
import { Marca } from '../models';

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

	private baseUrl = "http://localhost:3000/tema/get";  // web api URL
	//private baseUrlgetseccion = "http://localhost:3000/seccion/get";  // web api URL
	private baseUrlgetmarca = "http://localhost:3000/marcas/get";  // web api URL
	private baseUrlgetseccion = "http://localhost:3000/tema/getMarcaSubseccion";  // web api URL
    

	private baseUrlalta = "http://localhost:3000/tema/alta";  // web api URL
	private baseUrlbaja = "http://localhost:3000/tema/baja";  // web api URL
	private baseUrlmod = "http://localhost:3000/tema/cambio";  // web api URL
	//baseUrlmod


	ngOnInit() {
		this.gettemasdb();
		//this.getseccionsdb();
		this.getmarcasdb();
		this.formData = new FormData();
	}

	temas: Tema[] = [];
	seccions: Seccion[] = [];
	marcas: Marca[] = [];

	temaSeleccionada = new Tema();
	newtema = new Tema();
	esModificar: boolean;
	MuestraForma = false;
	closeResult: string;
	index: number;
	formData: FormData;


	

	gettemasdb() {
		console.log('oli');
		this.http.get<Tema[]>(this.baseUrl).subscribe(data => {
			console.log(data);
			for (let o of data) {
				this.temas.push(o);
			}
		});
	}	
	getmarcasdb() {
		this.http.get<Marca[]>(this.baseUrlgetmarca).subscribe(data => {
			for (let o of data) {
				this.marcas.push(o);
			}
		});
	}

	getseccionsdb() {
		this.seccions = [];
		this.http.post<Seccion[]>(this.baseUrlgetseccion,
			{
				headers: { 'Accept': 'application/json' },
				id: this.temaSeleccionada.id_marca
			}).subscribe(data => {
				
			for (let o of data) {
				this.seccions.push(o);
			}
		});
	}
	





}




