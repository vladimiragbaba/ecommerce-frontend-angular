import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../products/product.model';
import { Category } from '../products/category.model';
import { User } from '../profile-info/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  BACKEND_BASE = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) { }

  addCategory(name: string): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + '/categories/add', {
      name: name
    })
  }

  addUser(userJson: any): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + '/users/registerAdmin', userJson)
  }

  addProduct(productJson: any): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + '/products/addProduct', productJson);
  }
  getProducts():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.BACKEND_BASE + '/products/getProducts');

  }
  getCategories():Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.BACKEND_BASE + '/categories/getCategories')
  }
  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.BACKEND_BASE + '/users/getUsers')
  }
  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.BACKEND_BASE+'/users/delete/'+id);
  }

  updateCategory(categoryId: number, categoryName: string): Observable<any> {
    return this.httpClient.put(this.BACKEND_BASE + '/categories/update/' + categoryId, {
        name: categoryName
    } )
  }
  
  deleteCategory(categoryId: number): Observable<any> {
    return this.httpClient.delete(this.BACKEND_BASE + '/categories/delete/' + categoryId);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.httpClient.delete(this.BACKEND_BASE + '/products/delete/' + productId)
  }

  updateProduct(productId: number, productJson: any): Observable<any> {
    return this.httpClient.put(this.BACKEND_BASE + '/products/update/' + productId, productJson)
  }
}
