import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SubSeccion } from '../models';

import { Seccion } from '../models';

@Component({
	selector: 'app-subseccion',
	templateUrl: './subseccion.component.html',
	styleUrls: ['./subseccion.component.css']
})
export class SubSeccionComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private changeDetectorRef: ChangeDetectorRef) { }
	ngOnInit() { }


	subseccionSeleccionada = new SubSeccion();
	subseccionEditable = new SubSeccion();
	newsubseccion = new SubSeccion();
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
		{ id: 13, nombre: 'Bombasto' }
	];

	subseccions: SubSeccion[] = [
		{ id: 11, idSeccion: 1, nombre: 'Mr. Nice' }
	];

	Guardar(psubseccion: SubSeccion): void {
		this.MuestraForma = false;

		if (this.esModificar) {
			this.setsubseccionhelper(this.subseccionEditable, this.subseccionSeleccionada);
		}
		else {
			this.setsubseccionhelper(this.newsubseccion, psubseccion);
			this.subseccions.push(this.newsubseccion);
		}


	}
	Alta(): void {
		this.MuestraForma = true;
		this.esModificar = false;

		this.setsubseccionhelper(this.subseccionSeleccionada, new SubSeccion());
		this.subseccionEditable = new SubSeccion();
	}
	editar(subseccion: SubSeccion): void {
		this.MuestraForma = true;
		this.esModificar = true;

		this.setsubseccionhelper(this.subseccionSeleccionada, subseccion);
		this.subseccionEditable = subseccion;
	}
	baja(subseccion: SubSeccion, content): void {

		this.index = this.subseccions.indexOf(subseccion);

		this.modalService.open(content).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
			console.log(this.closeResult);
			switch (result) {
				case "baja": {
					if (this.index !== -1) {
						this.subseccions.splice(this.index, 1);
					}
					return '';
				}
			}
		}, (reason) => {
		});

	}
    
	setsubseccionhelper(subsecciondestino: SubSeccion, subseccionorigen: SubSeccion): void {
		subsecciondestino.nombre = subseccionorigen.nombre;
		subsecciondestino.id = subseccionorigen.id;
	}





}




