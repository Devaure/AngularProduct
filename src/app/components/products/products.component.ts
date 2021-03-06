import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductServiceService } from 'src/app/services/product-service.service';
import {catchError, map, startWith} from 'rxjs/operators'
import { ActionEvent, AppDataState, DataStateEnum, ProductActionTypes } from 'src/app/state/product.state';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  products$:Observable<AppDataState<Product[]>> | null =null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private service:ProductServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  /**
   * Method to display all the products
   */
  onGetAllProducts(){
    this.products$ = this.service.getAllProduct()
    .pipe(
      map(data =>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  /**
   * Method to display all the products selected
   */
  onGetSelectedProducts(){
    this.products$ = this.service.getSelectedProduct()
    .pipe(
      map(data =>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  /**
   * Method to display all the products available
   */
  onGetAvailableProducts(){
    this.products$ = this.service.getAvailableProduct()
    .pipe(
      map(data =>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  /**
   * Method for search a product
   * @param dataForm 
   */
  onSearch(dataForm:any){
    this.products$ = this.service.getSearchProduct(dataForm.keyword)
    .pipe(
      map(data =>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  /**
   * Method for selected or unselected a product
   * @param p 
   */
  onSelect(p:Product){
      this.service.selectProduct(p).subscribe(data=>{
        p.selected = data.selected;
      })
  }

  /**
   * Methode for delete product
   * @param p 
   */
  onDelete(p:Product){
    let v = confirm("??tes-vous s??r de vouloir supprimer le produit " + p.name);
    if(v === true){
      this.service.deleteProduct(p).subscribe(data=>{
        this.onGetAllProducts();
      });
    }
  }

  /**
   * redirect to new product
   */
  onNewProduct(){
    this.router.navigateByUrl("/newProduct");
  }

  /**
   * redirect to edit product
   * @param p 
   */
  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  /**
   * Method for listen to events for my product-nav-bar
   * @param $event 
   */
  onActionEvent($event:ActionEvent){
      switch($event.type){
        case ProductActionTypes.GET_ALL_PRODUCTS : this.onGetAllProducts();break;
        case ProductActionTypes.GET_SELECTED_PRODUCTS : this.onGetSelectedProducts();break;
        case ProductActionTypes.GET_AVAILABLE_PRODUCTS : this.onGetAvailableProducts();break;
        case ProductActionTypes.SEARCH_PRODUCTS : this.onSearch($event.payload);break;
        case ProductActionTypes.NEW_PRODUCTS : this.onNewProduct();break;
      }
  }

  /**
   * Method for listen to events for my product-list
   * @param $event 
   */
  onActionEventList($event:ActionEvent){
      switch($event.type){
        case ProductActionTypes.SELECT_PRODUCT :this.onSelect($event.payload);break;
        case ProductActionTypes.DELETE_PRODUCT :this.onDelete($event.payload);break;
        case ProductActionTypes.EDIT_PRODUCT :this.onEdit($event.payload);break;
      }
  }
}
