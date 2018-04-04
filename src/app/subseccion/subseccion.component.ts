import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subseccion } from '../models';
import { Seccion } from '../models';
import { UtilService } from '../util.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'


@Component({
	selector: 'app-subseccion',
	templateUrl: './subseccion.component.html',
	styleUrls: ['./subseccion.component.css']
})

export class SubseccionComponent implements OnInit {

	constructor(private modalService: NgbModal,
		private changeDetectorRef: ChangeDetectorRef,
		private http: HttpClient
		, private utilService: UtilService
	) { }

	private baseUrl = "http://localhost:3000/subseccion/get";  // web api URL
	private baseUrlgetseccion = "http://localhost:3000/seccion/get";  // web api URL

	private baseUrlalta = "http://localhost:3000/subseccion/alta";  // web api URL
	private baseUrlbaja = "http://localhost:3000/subseccion/baja";  // web api URL
	private baseUrlmod = "http://localhost:3000/subseccion/cambio";  // web api URL
	//baseUrlmod


	ngOnInit() {
		this.getsubseccionsdb();
		this.getseccionsdb();
		this.formData = new FormData();
	}

	subseccions: Subseccion[] = [];
	seccions: Seccion[] = [];
	subseccionSeleccionada = new Subseccion();
	newsubseccion = new Subseccion();
	esModificar: boolean;
	MuestraForma = false;
	closeResult: string;
	index: number;
	fileToUpload: File;
	formData: FormData;


	fileChange(event) {
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			let file: File = fileList[0];
			this.fileToUpload = file;
		}
	}

	getsubseccionsdb() {
		this.http.get<Subseccion[]>(this.baseUrl).subscribe(data => {
			for (let o of data) {
				this.subseccions.push(o);
			}
		});
	}
	getseccionsdb() {
		this.http.get<Seccion[]>(this.baseUrlgetseccion).subscribe(data => {
			for (let o of data) {
				this.seccions.push(o);
			}
		});
	}

	Guardar(subseccion: Subseccion): void {


		this.MuestraForma = false;
		var result = "";

		if (this.esModificar) {
			this.setsubseccionhelper(this.newsubseccion, this.subseccionSeleccionada);
			this.setformdata();
			this.post(this.baseUrlmod);
		}
		else {
			this.setsubseccionhelper(this.newsubseccion, subseccion);
			this.setformdata();
			result = this.post(this.baseUrlalta);
			if (result == "ok")
				this.subseccions.push(this.newsubseccion);
			else { //mostrar error; 
			}

		}

	}

	Alta(): void {
		this.MuestraForma = true;
		this.esModificar = false;
		this.subseccionSeleccionada = new Subseccion();
		this.newsubseccion = new Subseccion();

	}
	editar(subseccion: Subseccion): void {
		this.MuestraForma = true;
		this.esModificar = true;
		this.setsubseccionhelper(this.subseccionSeleccionada, subseccion);
		this.newsubseccion = subseccion;
	}
	baja(subseccion: Subseccion, content): void {
		this.index = this.subseccions.indexOf(subseccion);
		this.modalService.open(content).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
			console.log(this.closeResult);
			switch (result) {
				case "baja": {
					if (this.index !== -1) {
						this.subseccions.splice(this.index, 1);
						this.newsubseccion = subseccion;
						this.setformdata();
						this.post(this.baseUrlbaja);
					}
					return '';
				}
			}
		}, (reason) => { });
	}


	setsubseccionhelper(subsecciondestino: Subseccion, subseccionorigen: Subseccion): void {
		subsecciondestino.nombre = subseccionorigen.nombre;
		subsecciondestino.id = subseccionorigen.id;
		subsecciondestino.id_seccion = subseccionorigen.id_seccion;
	}
	setformdata(): void {
		console.log("datos enviados a formdata: " + this.newsubseccion.id_seccion);
		this.formData.append('id', String(this.newsubseccion.id));
		this.formData.append('nombre', this.newsubseccion.nombre);
		if (this.fileToUpload != null)//todo cambiar
			this.formData.append('logo_principal', this.fileToUpload, this.fileToUpload.name);

	}


	public post(url): string {
		const req = this.http.post(url,
			{
				headers: { 'Accept': 'application/json' },
				id: this.newsubseccion.id,
				nombre: this.newsubseccion.nombre,
				idseccion: this.newsubseccion.id_seccion
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




