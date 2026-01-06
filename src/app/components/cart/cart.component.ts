import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService);
  private readonly _Router = inject(Router)
  cartDetails: ICart = {} as ICart;


  ngOnInit(): void {
    this._CartService.getCartData().subscribe({
      next: (res) => {
        let userid = res.data.cartOwner || ""
        console.log(res)
        this.cartDetails = res.data;
        localStorage.setItem('userId', userid)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateItemQuantity(id: string, count: string | number) {
    this._CartService.updateItemQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res)
        this.cartDetails = res.data;
        this._CartService.cartItemsNumber.set(res.numOfCartItems)

      },
      error(err) {
        console.log(err)
      },
    })
  }

  removeItem(id: string): void {
    this._CartService.removeItemFromCart(id).subscribe({
      next: (res) => {
        console.log(res)
        this.cartDetails = res.data;
        this._CartService.cartItemsNumber.set(res.numOfCartItems)
      },
      error(err) {
        console.log(err)
      },
    })
  }

  clearCart(): void {
    this._CartService.clearCartItems().subscribe({
      next: (res) => {
        console.log(res)
        this.cartDetails = {} as ICart;
        this._CartService.cartItemsNumber.set(0)
      },
      error(err) {
        console.log(err)
      },
    })
  }

  checkoutCart(): void {
    this._CartService.checkout(this.cartDetails._id, {
      "shippingAddress": {
        "details": "details",
        "phone": "01010700999",
        "city": "Cairo"
      }
    }).subscribe({
      next: (res) => {
        console.log("succeess", res)
        if (res.status == "success") {
          window.location.href = res.session.url
        }
      }
    })
  }

}
