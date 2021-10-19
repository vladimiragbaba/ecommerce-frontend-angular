import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminAuthGuard } from './security/admin-auth.guard';
import { AtuhenticationGuard } from './security/atuhentication.guard';

const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'registration', component : RegistrationComponent},
  {path : 'products', component : ProductsComponent, canActivate: [AtuhenticationGuard]},
  {path : 'orders', component : OrdersComponent, canActivate: [AtuhenticationGuard]},
  {path : 'cart', component : CartComponent, canActivate: [AtuhenticationGuard]},
  {path : 'admin-panel', component : AdminPanelComponent, canActivate: [AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
