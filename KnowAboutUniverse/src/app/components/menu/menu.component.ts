import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/menu-items.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  @Output() itemSelected = new EventEmitter<Item>();
  @Input('menuItems') menuItems:Array<Item>

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    document.getElementById("mySidenav").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
  }

  menuSelected(itemSelected:Item) {
    this.itemSelected.emit(itemSelected)
    this.closeNav();
  }
}
