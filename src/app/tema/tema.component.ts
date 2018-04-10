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
	templateUrl: './tema.component.html',
	styleUrls: ['./tema.component.css']
})

export class TemaComponent implements OnInit {

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
	Guardar(tema: Tema): void {


		this.MuestraForma = false;
		var result = "";

		if (this.esModificar) {
			this.settemahelper(this.newtema, this.temaSeleccionada);
			this.post(this.baseUrlmod);
		}
		else {
			this.settemahelper(this.newtema, tema);
			result = this.post(this.baseUrlalta);
			if (result == "ok")
				this.temas.push(this.newtema);
			else { //mostrar error; 
			}

		}

	}

	Alta(): void {
		this.MuestraForma = true;
		this.esModificar = false;
		this.temaSeleccionada = new Tema();
		this.newtema = new Tema();

	}
	editar(tema: Tema): void {
		this.MuestraForma = true;
		this.esModificar = true;
		this.settemahelper(this.temaSeleccionada, tema);
		this.getseccionsdb();
		this.newtema = tema;
	}
	baja(tema: Tema, content): void {
		this.index = this.temas.indexOf(tema);
		this.modalService.open(content).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
			console.log(this.closeResult);
			switch (result) {
				case "baja": {
					if (this.index !== -1) {
						this.temas.splice(this.index, 1);
						this.newtema = tema;
						this.post(this.baseUrlbaja);
					}
					return '';
				}
			}
		}, (reason) => { });
	}


	settemahelper(temadestino: Tema, temaorigen: Tema): void {
		temadestino.nombre = temaorigen.nombre;
		temadestino.categoria = temaorigen.categoria;

		temadestino.id = temaorigen.id;
		temadestino.id_marca = temaorigen.id_marca;
		temadestino.id_marca_subseccion = temaorigen.id_marca_subseccion;

	}
	


	public post(url): string {
		const req = this.http.post(url,
			{
				headers: { 'Accept': 'application/json' },
				id: this.newtema.id,
				nombre: this.newtema.nombre,
				categoria: this.newtema.categoria,
				id_marca_subseccion: this.newtema.id_marca_subseccion,

			})
			.subscribe(
			res => {
				console.log(res);
				return "ok";
			},
			err => {
				console.log("Error occured");
				return "nok";
			}
			);
		return "nok";
	}





}




