import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductAddComponent } from './products/product-add/product-add.component';


const routes: Routes = [
  {path:"product", component:ProductsComponent},
  {path:"", component:HomeComponent},
  {path:"newProduct", component:ProductAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
