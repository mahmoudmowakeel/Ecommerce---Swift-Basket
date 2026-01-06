import { Component, inject, OnInit, signal, WritableSignal, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent implements OnInit {

  readonly _AuthService = inject(AuthService)
  readonly _CartService = inject(CartService);
  isopenMenue = signal(false)

   constructor() {
    // Watch for menu state changes
    effect(() => {
      if (this.isopenMenue()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  ngOnInit(): void {
    this._CartService.getCartData().subscribe({
      next: (res) => {
        this._CartService.cartItemsNumber.set(res.numOfCartItems)
      }
    })
  }


}
