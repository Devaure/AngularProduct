import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEventEmitter:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.productEventEmitter.emit("ALL_PRODUCT");
  }

  onGetSelectedProducts(){
    
  }

  onGetAvailableProducts(){

  }

  onNewProduct(){

  }

  onSearch(keyword:string){

  }

}
