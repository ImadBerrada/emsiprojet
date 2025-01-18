import {Component, OnInit} from '@angular/core';
import {HttpClient,HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    HttpClientModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  orders: any
  customerId!:number;
  constructor(private http: HttpClient,private route :ActivatedRoute, private router:Router) {
    this.customerId = route.snapshot.params['customerId'];
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Route parameters:', params);
    });
    this.http.get("http://localhost:8888/BILLING-SERVICE/bills/search/byCustomerId?customerid="+this.customerId).subscribe({
      next : (data) => {
        this.orders=data;

      },
      error : (err)=> {}
    }) ;
  }

  getOrderDetails(o: any) {
    this.router.navigateByUrl("/orderdetails/"+o.id);
  }
}
