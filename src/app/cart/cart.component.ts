import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Array<any> = [];
  totalPrice: number = 0;
  deliveryAddress = '';

  constructor(private cartService: CartService, private loginService: LoginService) { }

  ngOnInit(): void {
    for(let p of this.cartService.getProductsInCart()) {
      this.cartItems.push({
        product: p,
        quantity: 1,
        totalPrice: p.price
      })
    }

    for(let c of this.cartItems) {
      this.totalPrice += c.totalPrice;
    }

  }

  onQuantityChange() {
    this.totalPrice = 0;
    for(let c of this.cartItems) {  
      c.totalPrice = c.product.price * c.quantity;
      this.totalPrice += c.totalPrice;
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartService.getProductsInCart().splice(0, this.cartService.getProductsInCart().length);
    this.totalPrice = 0;
  }

  confirmCart() {

    const orderObject = {
      items: this.cartItems,
      address: this.deliveryAddress,
      userId: this.loginService.getCurrentUser().id,
      price: this.totalPrice
    }

    this.cartService.saveOrder(orderObject).subscribe(res => {
      console.log(res);
      alert(JSON.stringify(res))
    })
    
  }
  


}
