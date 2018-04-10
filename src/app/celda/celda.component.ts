import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Celda } from '../models';
import { Tema } from '../models';
import { UtilService } from '../util.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'


@Component({
	selector: 'app-celda',
	templateUrl: './celda.component.html',
	styleUrls: ['./celda.component.css']
})

export class CeldaComponent implements OnInit {

	constructor(private modalService: NgbModal,
		private changeDetectorRef: ChangeDetectorRef,
		private http: HttpClient
		, private utilService: UtilService
	) { }

	private baseUrl = "http://localhost:3000/celda/get";  // web api URL
	private baseUrlgettemas = "http://localhost:3000/tema/get";  // web api URL

	private baseUrlalta = "http://localhost:3000/celda/alta";  // web api URL
	private baseUrlbaja = "http://localhost:3000/celda/baja";  // web api URL
	private baseUrlmod = "http://localhost:3000/celda/cambio";  // web api URL
	//baseUrlmod


	ngOnInit() {
		this.getceldasdb();
		this.getseccionsdb();
		this.formData = new FormData();
	}

	celdas: Celda[] = [];
	temas: Tema[] = [];

	celdaSeleccionada = new Celda();
	newcelda = new Celda();
	esModificar: boolean;
	MuestraForma = false;
	closeResult: string;
	index: number;
	fileToUpload: File;
	fileToUpload2: File;

	formData: FormData;
	filevalidation: boolean = true;

	logo_principal2

	fileChangeopreview(event) {
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			let file: File = fileList[0];
			this.fileToUpload = file;
			this.filevalidation = true;
		}
	}

	fileChangearchivo(event) {
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			let file: File = fileList[0];
			this.fileToUpload2 = file;
			this.filevalidation = true;
		}
	}
	//custom validation
	isvalid(): boolean {
		if (this.fileToUpload != null)
			return true;
		else
			this.filevalidation = false;
		return false;


	}

	getceldasdb() {
		this.http.get<Celda[]>(this.baseUrl).subscribe(data => {
			for (let o of data) {
				this.celdas.push(o);
			}
		});
	}
	getseccionsdb() {
		this.http.get<Tema[]>(this.baseUrlgettemas).subscribe(data => {
			for (let o of data) {
				this.temas.push(o);
			}
		});
	}

	Guardar(celda: Celda): void {


		this.MuestraForma = false;
		var result = "";

		if (this.esModificar) {
			this.setceldahelper(this.newcelda, this.celdaSeleccionada);
			this.setformdata();
			this.utilService.post(this.baseUrlmod, this.formData);
			this.formData = new FormData();

		}
		else {
			this.setceldahelper(this.newcelda, celda);
			this.setformdata();
			result = this.utilService.post(this.baseUrlalta, this.formData);
			this.formData = new FormData();

			if (result == "ok")
				this.celdas.push(this.newcelda);
			else { //mostrar error; 
			}

		}

	}

	Alta(): void {
		this.MuestraForma = true;
		this.esModificar = false;
		this.celdaSeleccionada = new Celda();
		this.newcelda = new Celda();

	}
	editar(celda: Celda): void {
		this.MuestraForma = true;
		this.esModificar = true;
		this.setceldahelper(this.celdaSeleccionada, celda);
		this.newcelda = celda;
	}
	baja(celda: Celda, content): void {
		this.index = this.celdas.indexOf(celda);
		this.modalService.open(content).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
			console.log(this.closeResult);
			switch (result) {
				case "baja": {
					if (this.index !== -1) {
						this.celdas.splice(this.index, 1);
						this.newcelda = celda;
						this.setformdata();
						this.utilService.post(this.baseUrlbaja, this.formData);
						this.formData = new FormData();

					}
					return '';
				}
			}
		}, (reason) => { });
	}


	setceldahelper(celdadestino: Celda, celdaorigen: Celda): void {
		
		celdadestino.id = celdaorigen.id;
		celdadestino.titulo = celdaorigen.titulo;
		celdadestino.descripcion = celdaorigen.descripcion;

		celdadestino.id_tema = celdaorigen.id_tema;
		celdadestino.id_archivo = celdaorigen.id_archivo;
		celdadestino.id_preview = celdaorigen.id_preview;

	}
	setformdata(): void {
		console.log("datos enviados a formdata: " + this.newcelda.id_tema);
		this.formData.append('id', String(this.newcelda.id));
		this.formData.append('id_tema', String(this.newcelda.id_tema));

		this.formData.append('titulo', this.newcelda.titulo);
		this.formData.append('descripcion', this.newcelda.descripcion);


		if (this.fileToUpload != null)//todo cambiar
		{
			this.formData.append('logo_principal', this.fileToUpload, this.fileToUpload.name);
			this.formData.append('logo_principal2', this.fileToUpload2, this.fileToUpload.name);

			
	}
	}





}




