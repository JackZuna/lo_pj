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

  marcas: Marca[] = [];
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
          this.fileToUpload = file;
		}
  }

	getmarcasdb() {
		this.http.get<Marca[]>(this.baseUrl).subscribe(data => {
			for (let o of data) {
				this.marcas.push(o);		
			}
		});	
	}
      
	Guardar(marca: Marca): void {
      this.MuestraForma = false;
      var result = "";

		if (this.esModificar) {
          this.setmarcahelper(this.newmarca, this.marcaSeleccionada);
          this.setformdata();
          UtilService.post(this.baseUrlmod, this.formData);
		}
		else {
          this.setmarcahelper(this.newmarca, marca);
          this.setformdata();
          result = UtilService.post(this.baseUrlalta, this.formData);
          if (result == "ok")
            this.marcas.push(this.newmarca);
          else
            mostrar error;
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
                      this.setformdata();
                      UtilService.post(this.baseUrlbaja, this.formData);
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
  setformdata(): void {
    console.log("datos enviados a formdata: "+this.newmarca);
    this.formData.append('id', String(this.newmarca.id));
    this.formData.append('nombre', this.newmarca.nombre);
    this.formData.append('color', this.newmarca.color);
    if (this.fileToUpload != null)//todo cambiar
    this.formData.append('logo_principal', this.fileToUpload, this.fileToUpload.name);

  }

	



	

}




