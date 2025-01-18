import {provideRouter, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {OrdersComponent} from "./orders/orders.component";
import {OrderdetailsComponent} from "./orderdetails/orderdetails.component";

export const routes: Routes = [
  {
    path : "products",component : ProductsComponent
  },
  {
    path : "customers",component : CustomersComponent
  },
  {
    path : "orders/:customerId",component : OrdersComponent
  },
  {
    path : "orderdetails/:orderId",component : OrderdetailsComponent
  },

];

