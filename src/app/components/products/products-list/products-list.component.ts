import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ActionEvent, AppDataState, ProductActionTypes } from 'src/app/state/product.state';
import {DataStateEnum} from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Output() productsListEventEmitter:EventEmitter<ActionEvent> = new EventEmitter();
  @Input() productsInput$:Observable<AppDataState<Product[]>> | null =null;
  readonly DataStateEnum=DataStateEnum;
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p:Product){
    this.productsListEventEmitter.emit({type:ProductActionTypes.SELECT_PRODUCT,payload:p});
  }

  onDelete(p:Product){
    this.productsListEventEmitter.emit({type:ProductActionTypes.DELETE_PRODUCT,payload:p});
  }

  onEdit(p:Product){
    this.productsListEventEmitter.emit({type:ProductActionTypes.EDIT_PRODUCT,payload:p});
  }


}
