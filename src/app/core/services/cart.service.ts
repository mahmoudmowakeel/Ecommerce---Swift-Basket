import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  readonly _HttpClient = inject(HttpClient);
  public cartItemsNumber: WritableSignal<number> = signal(0)


  addProductToCart(id: string): Observable<any> {
    let requestParam = {
      productId: id
    };
    return this._HttpClient.post(`${environments.baseURL}/api/v1/cart`, requestParam
    )
  }

  getCartData(): Observable<any> {
    return this._HttpClient.get(`${environments.baseURL}/api/v1/cart`)
  }

  updateItemQuantity(id: string, count: string | number): Observable<any> {
    return this._HttpClient.put(`${environments.baseURL}/api/v1/cart/${id}`, {
      count
    }
    )
  }

  removeItemFromCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${environments.baseURL}/api/v1/cart/${id}`)
  }


  clearCartItems(): Observable<any> {
    return this._HttpClient.delete(`${environments.baseURL}/api/v1/cart`,

    )
  }

  checkout(cartid: string, shippingAddress: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}`, shippingAddress)
  }
}
