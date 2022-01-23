import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId:number;
  productFormGroup:FormGroup;
  submitted:boolean = false;
  constructor(private activetedRoute:ActivatedRoute, private serviceProduct:ProductServiceService, 
    private formBuilder:FormBuilder) { 
      this.productId = activetedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.serviceProduct.getProduct(this.productId)
    .subscribe(product=>{
      this.productFormGroup = this.formBuilder.group({
        id:[product.id, [Validators.required]],
        name:[product.name, [Validators.required,Validators.maxLength(15)]],
        price:[product.price, [Validators.required,Validators.max(1000)]],
        quantity:[product.quantity, [Validators.required,Validators.max(10000)]],
        selected:[product.selected, [Validators.requiredTrue]],
        available:[product.available, [Validators.requiredTrue]],
      })
    })
  }

  async onUpdateProduct(){
    this.serviceProduct.UpdateProduct(this.productFormGroup.value).subscribe(data=>{
        alert("Success product updated");
    });
  }
}
