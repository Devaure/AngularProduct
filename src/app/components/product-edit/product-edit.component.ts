import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId?:number;
  constructor(private activetedRoute:ActivatedRoute) { 
      this.productId = activetedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    
  }

}
