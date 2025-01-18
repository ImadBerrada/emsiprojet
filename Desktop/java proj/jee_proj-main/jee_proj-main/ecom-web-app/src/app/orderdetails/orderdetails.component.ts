import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe, DecimalPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [HttpClientModule, JsonPipe, NgIf, DatePipe, NgForOf, DecimalPipe],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent implements OnInit{
  orderDetails: any
  orderId!:number;
  constructor(private http: HttpClient,private route :ActivatedRoute, private router:Router) {
    this.orderId = route.snapshot.params['orderId'];
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Route parameters:', params);
    });
    this.http.get("http://localhost:8888/BILLING-SERVICE/bill/"+this.orderId).subscribe({
      next : (data) => {
        this.orderDetails=data;

      },
      error : (err)=> {}
    }) ;
  }

  getOrderDetails(o: any) {
    this.router.navigateByUrl("/orderdetails/"+o.id);
  }
}
