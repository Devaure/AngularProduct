import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  host = environment.host;
  constructor(private http:HttpClient) { }

  /**
   * This function allow give me all the products
   * @returns {Observable<Product[]>}
   */
  getAllProduct():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products");
  }

  /**
   * This function allow give me the selected products
   * @returns {Observable<Product[]>}
   */
  getSelectedProduct():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?selected=true");
  }

  /**
   * This function allow give me the available products
   * @returns {Observable<Product[]>}
   */
  getAvailableProduct():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?available=true");
  }

  /**
   * This function allow give me the search product
   * @param keyword the search product
   * @returns 
   */
  getSearchProduct(keyword:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?name_like="+keyword);
  }

  /**
   * This function allow to pass selected by unselected
   * @param product 
   * @returns 
   */
  selectProduct(product:Product):Observable<Product>{
    product.selected = !product.selected;
      return this.http.put<Product>(this.host+"/products/"+product.id, product);
  }

  /**
   * This function allow to delete the product
   * @param product 
   * @returns 
   */
  deleteProduct(product:Product):Observable<void>{
      return this.http.delete<void>(this.host+"/products/"+product.id);
  }

  /**
   * This function allow to create a new product
   * @param product 
   * @returns 
   */
  saveProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(this.host+"/products",product);
  }

  /**
   * This function allow to give me the corresponding product id 
   * @param id 
   * @returns 
   */
  getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(this.host+"/products/"+id);
  }

}
