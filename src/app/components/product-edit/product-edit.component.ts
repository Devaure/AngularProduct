import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId:number;
  productFormGroup:FormGroup;
  private submitted:boolean = false;
  constructor(private activetedRoute:ActivatedRoute, private serviceProduct:ProductServiceService, private formBuilder:FormBuilder) { 
      this.productId = activetedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.submitted= true;
    if (this.productFormGroup.invalid) { return;}
    this.serviceProduct.getProduct(this.productId)
    .subscribe(product=>{
      this.formBuilder.group({
        name:[product.name, [Validators.required,Validators.maxLength(15)]],
        price:[product.prix, [Validators.required,Validators.max(1000)]],
        quantity:[product.quantity, [Validators.required,Validators.max(100)]],
        selected:[product.selected, [Validators.requiredTrue]],
        available:[product.available, [Validators.requiredTrue]],
      })
    })
  }

  onUpdateProduct(){
    
  }
}
