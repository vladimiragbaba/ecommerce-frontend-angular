import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productsInCart: Array<any> = [];
  private cartItems: Array<any> = [];

  constructor(private httpClient: HttpClient) { }

  getProductsInCart() {
    return this.productsInCart;
  }
  getCartItems() {
    return this.cartItems;
  }

  saveOrder(order: any) {
    return this.httpClient.post('http://localhost:8080/orders/addOrder', order)
  }

  getOrders() {
    return this.httpClient.get('http://localhost:8080/orders/getAll')
  }
}
