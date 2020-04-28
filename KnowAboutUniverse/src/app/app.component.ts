import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DataService } from './services/data.service';
import { MenuItems, Item } from './models/menu-items.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'KnowAboutUniverse';
  date = new Date(); 
  items:MenuItems = {values: [
    {label:"2020-04-23"},
    {label:"2020-04-22"},
    {label:"2020-04-21"},
    {label:"2020-04-20"}
  ]};
  Data:Object = {};
  showImg = false;
  showVideo = false;
  @ViewChild('logo' , {static:false}) menuIcon: ElementRef;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly DataServices:DataService
  ){}
  
  ngOnInit(): void {
    const currentDate = this.date.getDate()
    const aux2 = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`;
    const aux3 = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()-1}`;
    const aux4 = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()-2}`;
    console.log(aux2)
    console.log(aux3)
    console.log(aux4)
   this.getDataToday()
  }

  getDataToday() {
    this.DataServices.getDataDefault().subscribe(res => {
      this.validateTypeData(res);
    });
  }

  validateTypeData(res) {
    if (res['media_type'] === "video") {
      this.showVideo = true
      this.showImg = false;
    } else if (res['media_type'] === "image") {
      this.showVideo = false
      this.showImg = true;
    } else {
      this.showVideo = false
      this.showImg = false;
    } 
    this.Data= res;
    console.log(this.Data);
  }
  
  sanitizerUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getMenuSelect(itemSelected: Item) {
    this.DataServices.getDataPerDate(itemSelected.label).subscribe( res => {
      this.validateTypeData(res);
    });
  }
}
