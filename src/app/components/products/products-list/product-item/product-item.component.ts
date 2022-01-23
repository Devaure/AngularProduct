import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ActionEvent } from 'src/app/state/product.state';

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
    
  }

  onDelete(product:Product){

  }

  onEdit(product:Product){

  }
}
