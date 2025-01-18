import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {NgForOf, NgIf} from "@angular/common";
import { ActivatedRoute,RouterModule } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf, NgForOf, RouterModule,HttpClientModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products : any;
  //data: any[] = [];

  constructor(private http: HttpClient,private route :ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Route parameters:', params);
    });
    this.http.get("http://localhost:8888/INVENTORY-SERVICE/products").subscribe({
      next : (data) => {
        this.products=data;

      },
      error : (err)=> {}
    }) ;
  }

}
