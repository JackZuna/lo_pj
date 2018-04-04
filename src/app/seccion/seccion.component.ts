import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Seccion } from '../models';
import { UtilService } from '../util.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'


@Component({
	selector: 'app-seccion',
	templateUrl: './seccion.component.html',
	styleUrls: ['./seccion.component.css']
})

export class SeccionComponent implements OnInit {

	constructor(private modalService: NgbModal,
		private changeDetectorRef: ChangeDetectorRef,
		private http: HttpClient
		, private utilService: UtilService
	) { }

	private baseUrl = "http://localhost:3000/seccion/get";  // web api URL
	private baseUrlalta = "http://localhost:3000/seccion/alta";  // web api URL
	private baseUrlbaja = "http://localhost:3000/seccion/baja";  // web api URL
	private baseUrlmod = "http://localhost:3000/seccion/cambio";  // web api URL
	//baseUrlmod


	ngOnInit() {
		this.getseccionsdb();
		this.formData = new FormData();
	}

	seccions: Seccion[] = [];
	seccionSeleccionada = new Seccion();
	newseccion = new Seccion();
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

	getseccionsdb() {
		this.http.get<Seccion[]>(this.baseUrl).subscribe(data => {
			for (let o of data) {
				this.seccions.push(o);
			}
		});
	}

	Guardar(seccion: Seccion): void {


			this.MuestraForma = false;
			var result = "";

			if (this.esModificar) {
				this.setseccionhelper(this.newseccion, this.seccionSeleccionada);
				this.setformdata();
				this.post(this.baseUrlmod);
			}
			else {
				this.setseccionhelper(this.newseccion, seccion);
				this.setformdata();
				result = this.post(this.baseUrlalta);
				if (result == "ok")
					this.seccions.push(this.newseccion);
				else { //mostrar error; 
				}

			}
		
	}

	Alta(): void {
		this.MuestraForma = true;
		this.esModificar = false;
		this.seccionSeleccionada = new Seccion();
		this.newseccion = new Seccion();

	}
	editar(seccion: Seccion): void {
		this.MuestraForma = true;
		this.esModificar = true;
		this.setseccionhelper(this.seccionSeleccionada, seccion);
		this.newseccion = seccion;
	}
	baja(seccion: Seccion, content): void {
		this.index = this.seccions.indexOf(seccion);
		this.modalService.open(content).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
			console.log(this.closeResult);
			switch (result) {
				case "baja": {
					if (this.index !== -1) {
						this.seccions.splice(this.index, 1);
						this.newseccion = seccion;
						this.setformdata();
						this.post(this.baseUrlbaja);
					}
					return '';
				}
			}
		}, (reason) => { });
	}


	setseccionhelper(secciondestino: Seccion, seccionorigen: Seccion): void {
		secciondestino.nombre = seccionorigen.nombre;
		secciondestino.id = seccionorigen.id;
	}
	setformdata(): void {
		console.log("datos enviados a formdata: " + this.newseccion);
		this.formData.append('id', String(this.newseccion.id));
		this.formData.append('nombre', this.newseccion.nombre);
		if (this.fileToUpload != null)//todo cambiar
			this.formData.append('logo_principal', this.fileToUpload, this.fileToUpload.name);

	}


	public post(url): string {
		const req = this.http.post(url,
			{
				headers: { 'Accept': 'application/json' },
				id: this.newseccion.id,
				nombre: this.newseccion.nombre,
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




