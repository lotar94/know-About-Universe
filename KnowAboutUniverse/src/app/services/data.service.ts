import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  END_POINT = "https://api.nasa.gov/planetary/apod?api_key=UUGTK6jjctDATN9AmdgFDAjSjo3peHOEdLMzLfgC";

  constructor(private http: HttpClient) {}

  getDataDefault():Observable<any> {
    return this.http.get(this.END_POINT);
  }

  getDataPerDate(date: string):Observable<any> {
    return this.http.get(`${this.END_POINT}&date=${date}`);
  }
}
