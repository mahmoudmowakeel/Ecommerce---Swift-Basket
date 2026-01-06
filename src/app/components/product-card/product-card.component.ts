import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  private readonly _CartService = inject(CartService);


  @Input({ required: true }) product!: IProduct

  addToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res)
        this._CartService.cartItemsNumber.set(res.numOfCartItems)
      }
    })
  }

}
