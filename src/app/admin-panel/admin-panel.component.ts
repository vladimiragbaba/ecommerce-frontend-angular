import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  
  formCategory: FormGroup;
  formUser: FormGroup;
  formProduct: FormGroup;
  productsData !: any;
  categoriesData !: any;
  usersData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  roles: string[] = ['ADMIN', 'USER'];
  selectedRole = '';

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {

    this.formCategory = formBuilder.group({
      category : ['', Validators.required],
      idCategory: ['']
    })
    
    this.formUser = formBuilder.group({
      email : ['', Validators.email],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })

    this.formProduct = formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      idProduct: [''],
      categoryId: ['', Validators.required]
    })

   }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.getAllUsers();
  }

  clickAdd(){
    this.showAdd = true;
    this.showUpdate = false;
  }

  onSubmitCategory() {
    if(this.formCategory.valid) {
      const category = this.formCategory.get('category')?.value;
      this.adminService.addCategory(category).subscribe(res => console.log(res))
      alert("Category added successfully");
      let ref = document.getElementById('cancel1')
      ref?.click();
      this.formCategory.reset();
      this.getAllCategories();
    }
  }

  onSubmitUser() {
    if(this.formUser.valid) {
      const email = this.formUser.get('email')?.value;
      const firstName = this.formUser.get('firstName')?.value;
      const lastName = this.formUser.get('lastName')?.value;
      const password = this.formUser.get('password')?.value;
      const role = this.formUser.get('role')?.value;
      
      const userJson = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        role: role
      }


      this.adminService.addUser(userJson).subscribe(res => console.log(res))
      alert("User added successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formUser.reset();
      this.getAllUsers();

    }

  }

  onSubmitProduct() {
    if(this.formProduct.valid) {
      const name = this.formProduct.get('name')?.value;
      const price = this.formProduct.get('price')?.value;
      const description = this.formProduct.get('description')?.value;
      const image = this.formProduct.get('image')?.value;
      const categoryId = this.formProduct.get('categoryId')?.value;

      const productJson = {
        name: name,
        price: Number(price),
        description: description,
        image: image,
        categoryId: categoryId
      }
      
      this.adminService.addProduct(productJson).subscribe(res => console.log(res))
      alert("Product added successfully")
      let ref = document.getElementById('cancel2');
      ref?.click();
      this.formProduct.reset();
      this.getAllProducts();
    }

  }

  getAllProducts(){
    this.adminService.getProducts().subscribe(res=>{this.productsData = res;})
  }

  getAllCategories(){
    this.adminService.getCategories().subscribe(res=>{this.categoriesData = res;})
  }

  getAllUsers(){
    this.adminService.getUsers().subscribe(res=>{this.usersData = res;})
  }

  deleteUser(user : any){
    this.adminService.deleteUser(user.id).subscribe(res=>{alert("User deleted");
    alert("User deleted successfully");
    this.getAllUsers()
  })
  }

  onEdit(category : any){
    this.showAdd = false;
    this.showUpdate = true;

    this.formCategory.controls['category'].setValue(category.name);
    this.formCategory.controls['idCategory'].setValue(category.id);

  }

  onEditProduct(product : any){
    this.showAdd = false;
    this.showUpdate = true;


    this.formProduct.controls['name'].setValue(product.name);
    this.formProduct.controls['price'].setValue(product.price);
    this.formProduct.controls['description'].setValue(product.description);
    this.formProduct.controls['image'].setValue(product.image);
    this.formProduct.controls['idProduct'].setValue(product.id);
    this.formProduct.controls['categoryId'].setValue(product.category.id);
  }


  updateCategory(){
    const categoryName = this.formCategory.get('category')?.value;
    const categoryId = this.formCategory.get('idCategory')?.value;
    this.adminService.updateCategory(categoryId, categoryName).subscribe(res => console.log(res));
    alert("Category updated successfully");
    let ref = document.getElementById('cancel1')
    ref?.click();
    this.formCategory.reset();
    this.getAllCategories();
    
  }

  onDeleteCategory(category: any) {
    this.adminService.deleteCategory(category.id).subscribe()
    alert("Category deleted successfully");
    this.getAllCategories();
  }

  updateProduct(){
    const productId = this.formProduct.get('idProduct')?.value;
    const productJson = {
      name: this.formProduct.get('name')?.value,
      price: this.formProduct.get('price')?.value,
      description: this.formProduct.get('description')?.value,
      image: this.formProduct.get('image')?.value,
      categoryId: this.formProduct.get('categoryId')?.value

    }

    this.adminService.updateProduct(productId, productJson).subscribe(res => console.log(res))
    alert("Product updated successfully");
    let ref = document.getElementById('cancel2');
    ref?.click();
    this.formProduct.reset();
    this.getAllProducts();
  }

  deleteProduct(product: any) {
    this.adminService.deleteProduct(product.id).subscribe();
    alert("Product deleted successfully");
    this.getAllProducts();
  }

}
