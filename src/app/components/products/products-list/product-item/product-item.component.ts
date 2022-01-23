import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ActionEvent, ProductActionTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product:Product;
  @Output() itemEventEmitter:EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product:Product){
    this.itemEventEmitter.emit({type:ProductActionTypes.SELECT_PRODUCT, payload:product});
  }

  onDelete(product:Product){
    this.itemEventEmitter.emit({type:ProductActionTypes.DELETE_PRODUCT, payload:product});
  }

  onEdit(product:Product){
    this.itemEventEmitter.emit({type:ProductActionTypes.EDIT_PRODUCT, payload:product});
  }
}
