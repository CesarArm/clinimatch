import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  private readonly googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbyCWDAwI0_jUtRfpTIRZBKusVh_cUUiT7Ba19zElFA7MTVnKEMNshY1Dat9a8jM13mv/exec';  // Reemplaza con la URL de tu script

  constructor(private http: HttpClient) { }

  enviarDatos(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.googleAppsScriptUrl, JSON.stringify(data), { headers: headers });
  }
}
