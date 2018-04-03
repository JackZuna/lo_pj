import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Seccion } from '../models';

@Component({
	selector: 'app-seccion',
	templateUrl: './seccion.component.html',
	styleUrls: ['./seccion.component.css']
})
export class SeccionComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private changeDetectorRef: ChangeDetectorRef) { }
	ngOnInit() { }


	seccionSeleccionada = new Seccion();
	seccionEditable = new Seccion();
	newseccion = new Seccion();
	esModificar: boolean;
	MuestraForma = false;
	closeResult: string;
	index: number;
	fileToUpload: File;

	fileChange(input) {
		this.readFiles(input.files);
		console.log("1 wii");

	}

	readFile(file, reader, callback) {
		console.log("3 wii");

		reader.onload = () => {
			callback(reader.result);
			this.fileToUpload = reader.result;
			console.log("4 wii");
		}
		reader.readAsDataURL(file);
	}

	readFiles(files, index = 0) {
		console.log("2 wii");

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

	seccions: Seccion[] = [
		{ id: 11, nombre: 'Mr. Nice' },
		{ id: 12, nombre: 'Narco' },
		{ id: 13, nombre: 'Bombasto' },
		{ id: 14, nombre: 'Celeritas' },
		{ id: 15, nombre: 'Magneta' },
		{ id: 16, nombre: 'RubberMan' },
		{ id: 17, nombre: 'Dynama' },
		{ id: 18, nombre: 'Dr IQ' },
		{ id: 19, nombre: 'Magma' },
		{ id: 20, nombre: 'Tornado' }
	];

	Guardar(pseccion: Seccion): void {
		this.MuestraForma = false;

		if (this.esModificar) {
			this.setseccionhelper(this.seccionEditable, this.seccionSeleccionada);
		}
		else {
			this.setseccionhelper(this.newseccion, pseccion);
			this.seccions.push(this.newseccion);
		}


	}
	Alta(): void {
		this.MuestraForma = true;
		this.esModificar = false;

		this.setseccionhelper(this.seccionSeleccionada, new Seccion());
		this.seccionEditable = new Seccion();
	}
	editar(seccion: Seccion): void {
		this.MuestraForma = true;
		this.esModificar = true;

		this.setseccionhelper(this.seccionSeleccionada, seccion);
		this.seccionEditable = seccion;
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
					}
					return '';
				}
			}
		}, (reason) => {
		});

	}
    
	setseccionhelper(secciondestino: Seccion, seccionorigen: Seccion): void {
		secciondestino.nombre = seccionorigen.nombre;
		secciondestino.id = seccionorigen.id;
	}





}




