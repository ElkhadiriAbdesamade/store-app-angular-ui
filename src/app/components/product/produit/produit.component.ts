import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent {

  page: number = 1;
 


  products!:Product[];
  role!: string | null;
  productName!:String;
  err_msg!: string;

  public constructor(private http: HttpClient, private api: ApiService, private route: ActivatedRoute) { }
  


  
  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
   
    this.getAllProducts();
   


  }

  search(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.productName === "" || this.productName === undefined) {
        this.err_msg='Pleas Fill search Bar'
      }
      else{
        this.api.search_products(this.productName)
        .subscribe((response: any) => {
          this.products = response;
          console.log(this.products);

          resolve(response);
        });
        
      }
      
    });
  }

  getAllProducts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_products()
        .subscribe((response: any) => {
          this.products = response;
          console.log(this.products);

          resolve(response);
        });
    });
  }

  addProduct(){
    window.location.replace('/add-product');
  }
}
