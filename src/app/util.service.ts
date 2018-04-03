import { Injectable } from '@angular/core';
import { Globals } from './globals'


@Injectable()
export class UtilService {

	constructor(private globals: Globals) { }

	calllogin(): void
	{
		this.globals.logged = true;		
    }
}
