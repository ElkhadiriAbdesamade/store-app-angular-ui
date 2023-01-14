import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Facture } from 'src/app/models/facture';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.scss']
})
export class ProduitDetailComponent {


  today = new Date();
  pipe = new DatePipe('en-US');
  changedDate !: string | null;
  seconds=4;


  product_id!: number;
  user_id!: string | null;
  product!: Product;
  user!: User;
  product_qte = 1;
  err_msg!: String;
  succ_msg!: String;
  facture: Facture = {
    id: 0,
    product_id: 0, product_name: "", product_qte: 0, total_price: 0, user_fullName: "", user_id: 0, creation_Date: ""
  }
  public constructor(private http: HttpClient, private api: ApiService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.user_id = sessionStorage.getItem('id');
    if (this.user_id==='' || this.user_id===null) {
      window.location.replace('/login')
    }
    this.route.params.subscribe((params: Params) => this.product_id = params['id']);
    this.getProductById();
    this.getUserById();
    this.changeFormat()
  }

  changeFormat() {
    let ChangedFormat = this.pipe.transform(this.today, 'MM/dd/YYYY');
    this.changedDate = ChangedFormat;
    console.log(this.changedDate);
  }

  getProductById() {
    return new Promise((resolve, reject) => {
      this.api.get_product_by_id(this.product_id.toString())
        .subscribe((response: any) => {
          this.product = response;
          console.log(this.product);

          resolve(response);
        });
    });
  }

  getUserById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_user_by_id(this.user_id)
        .subscribe((response: any) => {
          this.user = response;
          resolve(response);
        });
    });
  }

  addFacture() {
    this.facture.product_id = this.product.id;
    this.facture.user_id = this.user.id;
    this.facture.product_name = this.product.name;
    this.facture.user_fullName = this.user.first_name + " " + this.user.last_name;
    this.facture.product_qte = this.product_qte;
    this.facture.total_price = (this.product.price - (this.product.price * this.product.sale_amount) / 100) * this.product_qte;

    this.facture.creation_Date = this.changedDate

    console.log(this.facture);

    return new Promise((resolve, reject) => {
      
      if (this.facture.product_qte !== 0 && this.facture.product_qte > 0) {
        if (this.product.qte_stock < this.product_qte) {
          this.err_msg = 'Quantity Must not be More than Quantity Stock';
          return;
        }
        this.product.qte_stock = this.product.qte_stock - this.product_qte;

        this.api.update_product(this.product)
              .subscribe((response: any) => {
                
                resolve(response);
              });

        this.api.add_facture(this.facture)
          .subscribe((response: any) => {
            this.succ_msg = 'Thank you for your purchase';
            setInterval(()=>{
              this.seconds--
              if (this.seconds===0) {
                window.location.replace('/')
              }
            }, 1000);
            resolve(response);
          });


      } else {
        this.err_msg = 'Quantity Must not be less then 0'
      }
    })
  }




}
