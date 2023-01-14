import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Facture } from 'src/app/models/facture';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-facture-detail',
  templateUrl: './facture-detail.component.html',
  styleUrls: ['./facture-detail.component.scss']
})
export class FactureDetailComponent {

  user!: User;
  id!: string | null;
  facture!:Facture;
  facture_id!: string | null;
  product!:Product;
  role!: string | null;

  public constructor( private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit(): void {
 
    this.role = sessionStorage.getItem('role');
    this.route.params.subscribe((params: Params) => this.facture_id = params['id']);
    
    if (this.role==="") {
      window.location.replace('/');
    }
    this.getAllFactureById()
    
  }

  getUserById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_user_by_id(this.facture.user_id.toString())
        .subscribe((response: any) => {
          this.user = response;
          resolve(response);
        });
    });
  }

  getProductById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_product_by_id(this.facture.product_id.toString())
        .subscribe((response: any) => {
          this.product = response;
          resolve(response);
        });
    });
  }

  getAllFactureById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_factureById(this.facture_id)
        .subscribe((response: any) => {
          this.facture = response;
          console.log(this.facture);
          this.getProductById();
          this.getUserById();
          resolve(response);
        });
    });
  }

  downloadAsPDF(){

  }
}
