import { Injectable } from '@angular/core';
import { Globals } from './globals'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class UtilService {

	constructor(private globals: Globals) { }

	calllogin(): void
	{
		this.globals.logged = true;		
  }

  public post(url, formData): string {
    const req = this.http.post(url, formData,
      {
        headers: { 'Accept': 'application/json' }
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
