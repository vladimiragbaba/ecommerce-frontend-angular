import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { CartService } from '../cart/cart.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  productsForCart:Array<Product>
  productsRecived:Array<Product>
  cartProducts:any;

  allCategories: Array<any> = [];
  selectedCategoryId: number = 0;

  productsInCart: Array<any> = [];

  constructor(private productService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      console.log(data)
      this.products = data;
    })
    let localData = localStorage.getItem('cart');
    if (localData !== null) {
      this.cartProducts = JSON.parse(localData);
    } else {
      this.cartProducts = [];
    }

    this.productService.getCategories().subscribe(res => {
      console.log(res)
      this.allCategories = res;
    });
    console.log(this.allCategories)

    localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart))
  }

  searchProducts() {
    console.log(this.selectedCategoryId)
    if(this.selectedCategoryId == 0) {
      this.productService.getProducts().subscribe((data: Product[]) => {
        console.log(data)
        this.products = data;
      })
    } else {
      this.productService.getProductsByCategory(this.selectedCategoryId).subscribe(res => {
        console.log(res)
        this.products = res;
      })
    }
  }

  addToCart(product: any) {
    const index = this.cartService.getProductsInCart().indexOf(product)
    if(index == -1) {
      this.cartService.getProductsInCart().push(product);
    } else {
      return;
    }
  }

  removeFromCart(product: any) {
    const index = this.cartService.getProductsInCart().indexOf(product)
    if(index == -1) {
      return;
    } else {
      this.cartService.getProductsInCart().splice(this.cartService.getProductsInCart().indexOf(product), 1);
    }
  }

}
