import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  private readonly googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbyVSKvHeFob1N7n0lGG0Scz1FiK93SSubzZL_E1sPTrIfZ1WbVru2nLfQAw5uUAZ5f3/exec'; // ¡Revisa esta URL!

  constructor(private http: HttpClient) { }

  enviarDatos(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.googleAppsScriptUrl, JSON.stringify(data), { headers: headers });
  }
}
