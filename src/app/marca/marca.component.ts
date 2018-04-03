import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Marca } from '../models';
import { UtilService } from '../util.service'
import { HttpClient } from '@angular/common/http';
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
	private baseUrlmod = "http://localhost:3000/marcas/mod";  // web api URL

	


	ngOnInit() {
		this.getmarcasdb();
	}


	marcaSeleccionada = new Marca();
	newmarca = new Marca();


	esModificar: boolean;
	MuestraForma = false;
	closeResult: string;
	index: number ;
	fileToUpload: File;

	fileChange(input) {
		this.readFiles(input.files);
	}
	readFile(file, reader, callback) {
		reader.onload = () => {
			callback(reader.result);
			this.fileToUpload = reader.result;
		}
		reader.readAsDataURL(file);
	}
	readFiles(files, index = 0) {
		let reader = new FileReader();
		if (index in files) {
			this.readFile(files[index], reader, (result) => {
				var img = document.createElement("img");
				img.src = result;

				this.readFiles(files, index + 1);
			});
		} else {
			this.changeDetectorRef.detectChanges();
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
	public post(url){
	const req = this.http.post(url,
			{
				id: this.newmarca.id,
				nombre: this.newmarca.nombre,
				color: this.newmarca.color,
			    logo_principal: '1'
		})
			.subscribe(
			res => {
				console.log(res);
			},
			err => {
				console.log("Error occured");
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




