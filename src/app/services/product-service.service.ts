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

  getAllProduct():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products");
  }

  getSelectedProduct():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?selected=true");
  }

  getAvailableProduct():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?available=true");
  }

  getSearchProduct(keyword:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?name_like="+keyword);
  }

  selectProduct(product:Product):Observable<Product>{
    product.selected = !product.selected;
      return this.http.put<Product>(this.host+"/products/"+product.id, product);
  }

  deleteProduct(product:Product):Observable<void>{
      return this.http.delete<void>(this.host+"/products/"+product.id);
  }
}
