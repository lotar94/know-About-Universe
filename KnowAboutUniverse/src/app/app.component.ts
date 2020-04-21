import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Data:Object = {};
  constructor(private readonly DataServices:DataService){}
  title = 'KnowAboutUniverse';
  ngOnInit(): void {
    this.DataServices.getData().subscribe(res => {
      this.Data= res
      console.log('Hola desde la Naza! ', res);
    });
  }
  
}
