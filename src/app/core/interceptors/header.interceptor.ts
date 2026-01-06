import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('userToken');

  if (token !== null) {
    if (req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')) {
      req = req.clone({
        setHeaders: { token: token }
      })
    }
  }
  return next(req);
};
