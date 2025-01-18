import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterModule} from '@angular/router';



@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [NgForOf, NgIf,HttpClientModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers: any
  constructor(private http: HttpClient,private route :ActivatedRoute, private router:Router) {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Route parameters:', params);
    });
    this.http.get("http://localhost:8888/CUSTOMER-SERVICE/customers").subscribe({
      next : (data) => {
        this.customers=data;

      },
      error : (err)=> {}
    }) ;
  }

  getOrders(c: any) {
    this.router.navigateByUrl("/orders/"+c.id);

  }
}
