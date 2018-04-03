import { Injectable } from '@angular/core';

//modelos
export class Seccion {
	id: number;
	nombre: string;
}

export class SubSeccion {
	id: number;
	idSeccion: number;
	nombre: string;
}

export class Tema {
	id: number;
	idMarcaSubseccion: number;
	nombre: string;
}

export class Celda {
	id: number;
	titulo: string;
	descripcion: string;
}

export class Marca {
	id: number;
	nombre: string;
	color: string;
}