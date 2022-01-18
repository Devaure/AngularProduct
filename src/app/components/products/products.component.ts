import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductServiceService } from 'src/app/services/product-service.service';
import {catchError, map, startWith} from 'rxjs/operators'
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$:Observable<AppDataState<Product[]>> | null =null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private service:ProductServiceService) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$ = this.service.getAllProduct()
    .pipe(
      map(data =>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  onGetSelectedProducts(){
    this.products$ = this.service.getSelectedProduct()
    .pipe(
      map(data =>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  onGetAvailableProducts(){
    this.products$ = this.service.getAvailableProduct()
    .pipe(
      map(data =>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }
  onSearch(dataForm:any){
    this.products$ = this.service.getSearchProduct(dataForm.keyword)
    .pipe(
      map(data =>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  onSelect(p:Product){
      this.service.selectProduct(p).subscribe(data=>{
        p.selected = data.selected;
      })
  }

  onDelete(p:Product){
    let v = confirm("Êtes-vous sûr de vouloir supprimer le produit " + p.name);
    if(v === true){
      this.service.deleteProduct(p).subscribe(data=>{
        this.onGetAllProducts();
      });
    }
}


}
