import { Component, inject, OnInit } from '@angular/core';
import { AllordersService } from '../../core/services/allorders.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {

  ordersDetails!: any[]

  private readonly _AllordersService = inject(AllordersService);
  private readonly _CartService = inject(CartService);
  userId: string = localStorage.getItem('userId')!


  ngOnInit(): void {
    if (this.userId) {
      this._AllordersService.getUserOrders(this.userId).subscribe({
        next: (res) => {
          console.log('orderss', res)
          console.log('orderss', res)
          this.ordersDetails = res;
        },
        error(err) {
          console.error(err)
        },
      })
    }

  }





}
