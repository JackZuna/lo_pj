import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Marca } from '../models';
import { UtilService } from '../util.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'


@Component({
	selector: 'app-marca',
	templateUrl: './marca.component.html',
	styleUrls: ['./marca.component.css']
})

export class MarcaComponent implements OnInit {

	constructor(private modalService: NgbModal,
		private changeDetectorRef: ChangeDetectorRef,
		private http: HttpClient  
	) { }

	private baseUrl = "http://localhost:3000/marcas/get";  // web api URL
	private baseUrlalta = "http://localhost:3000/marcas/alta";  // web api URL
	private baseUrlbaja = "http://localhost:3000/marcas/baja";  // web api URL
	private baseUrlmod = "http://localhost:3000/marcas/cambio";  // web api URL
	//baseUrlmod


	ngOnInit() {
		this.getmarcasdb();
		this.formData = new FormData();
	}


	marcaSeleccionada = new Marca();
	newmarca = new Marca();


	esModificar: boolean;
	MuestraForma = false;
	closeResult: string;
	index: number ;
	fileToUpload: File;
	formData: FormData;

	fileChange(event) {
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			let file: File = fileList[0];
			this.fileToUpload = fileList[0];
			
			this.formData.append('logo_principal', file, file.name);
			let headers = new Headers();
			/** In Angular 5, including the header Content-Type can invalidate your request */

		}
	}


	marcas: Marca[] = [];

	getmarcasdb() {
		this.http.get<Marca[]>(this.baseUrl).subscribe(data => {
			console.log(data[0].nombre);
			for (let o of data) {
				this.marcas.push(o);		
			}
		});	
	}

	public post(url) {
		console.log(this.newmarca);
		this.formData.append('id', String(this.newmarca.id));
		this.formData.append('nombre', this.newmarca.nombre);
		this.formData.append('color', this.newmarca.color);


		const req = this.http.post(url,  this.formData,
			{				
				headers: { 'Accept': 'application/json' }
			})
			.subscribe(
			res => {
				console.log(res);
				this.formData = new FormData();

			},
			err => {
				console.log("Error occured");
				this.formData = new FormData();

			}
			);
	}
    
	Guardar(marca: Marca): void {
		this.MuestraForma = false;
		if (this.esModificar) {
			this.setmarcahelper(this.newmarca, this.marcaSeleccionada);
			this.post(this.baseUrlmod);

		}
		else {
			this.setmarcahelper(this.newmarca, marca);
			this.marcas.push(this.newmarca);
			this.post(this.baseUrlalta);

		}
	}

	Alta(): void {
		this.MuestraForma = true;
		this.esModificar = false;

		this.marcaSeleccionada = new Marca();
		this.newmarca = new Marca();

	}
	editar(marca: Marca): void {
		this.MuestraForma = true;
		this.esModificar = true;

		this.setmarcahelper(this.marcaSeleccionada, marca);
		this.newmarca = marca;
	}

	baja(marca: Marca, content): void {
		this.index = this.marcas.indexOf(marca);
		this.modalService.open(content).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
			console.log(this.closeResult); 
			switch (result) {				
				case "baja": {
					if (this.index !== -1) {
						this.marcas.splice(this.index, 1);
						this.newmarca = marca;
						this.post(this.baseUrlbaja);

					}
					return '';
				}
			}
		}, (reason) => {});
	}

	setmarcahelper(marcadestino: Marca, marcaorigen: Marca): void {
		marcadestino.color = marcaorigen.color;
		marcadestino.nombre = marcaorigen.nombre;
		marcadestino.id = marcaorigen.id;
	}

	



	

}




