import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup?:FormGroup
  submitted:boolean = false;
  constructor(private formBuilder:FormBuilder, private productService:ProductServiceService) { }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name:["", [Validators.required,Validators.maxLength(7)]],
      price:[0, [Validators.required,Validators.max(1000)]],
      quantity:[0, [Validators.required,Validators.max(100)]],
      selected:[true, [Validators.required]],
      available:[true, [Validators.required]],
    });
  }

  onSaveProduct(){
    this.productService.saveProduct(this.productFormGroup?.value).subscribe(data=>{
        alert("Success saving product");
    })
  }

}
