import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {


  private readonly _ProductsService = inject(ProductsService);
  public products$!: Observable<IProduct[]>



  ngOnInit(): void {
    this.products$ = this._ProductsService.getAllProducts().pipe(map((res) => res.data))

  }

}
