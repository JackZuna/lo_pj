import { Injectable } from '@angular/core';

//modelos

export class Menu {
	secciones: SeccionMenu[];
}
export class SeccionMenu {
	id: number;
	nombre: string;
	subseccion: SubSeccionMenu[];
}
export class SubSeccionMenu {
	id: number;
	nombre: string;
}

export class Temas {
	temas: menuTema[];
}
export class menuTema {
	id: number;
	nombre: string;
	celdas: Celda[];
}




export class Seccion {
	id: number;
	nombre: string;
}
export class MarcaSubseccion {
	id: number;
	marca_id: number;
	subseccion_id: number;
	nombre: string;
}

export class Subseccion {
	id: number;
	id_seccion: number;
	nombre: string;
	seccionNombre: string;

}

export class Tema {
	id: number;
	id_marca_subseccion: number;
	id_marca: number;

	nombre: string;
	categoria: string;
	SubSeccionNombre: string;
	MarcaNombre: string;

}

export class Celda {
	id: number;
	id_tema: number;
	titulo: string;
	nombre: string;

	descripcion: string;
    //luego seran varios
	id_preview: number;
	id_archivo: number;
}

export class Marca {
	id: number;
	nombre: string;
	color: string;
}