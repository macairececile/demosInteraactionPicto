import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://interaactionpicto.api.imag.fr';
  constructor(private http: HttpClient) {}

  // Exemple de requête POST pour envoyer un fichier audio
  processAudio(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/process_audio`, formData);
  }

  // Exemple de requête POST pour envoyer du texte
  processText(sentence: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/process_text`, { sentence: sentence });
  }
}
