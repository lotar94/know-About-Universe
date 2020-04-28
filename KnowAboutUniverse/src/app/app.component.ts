import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DataService } from './services/data.service';
import { MenuItems, Item } from './models/menu-items.model';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'KnowAboutUniverse';
  items:MenuItems = {values: []};
  Data:Object = {};
  showImg = false;
  showVideo = false;
  @ViewChild('logo' , {static:false}) menuIcon: ElementRef;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly DataServices:DataService
  ){}
  
  ngOnInit(): void {
    var date = moment();
    for (let index = 1; index < 100; index++) {
      let item:Item = {label:date.subtract(1, "days").format("YYYY-MM-DD")}
      this.items.values.push(item);
    }
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
