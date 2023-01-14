import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  productForm !: FormGroup;
  accept = ".png, .jpg, .jpeg";
  checked = false;
  err_msg!: string;
  succ_msg!: string;
  user!: User;
  product: Product = { id: 0, name: '', description: '', price: 0, sale: 0, sale_amount: 0, image: '', qte_stock: 0 };
  role!: string|null;
  user_id: any;
  product_id:any

  public constructor(private http: HttpClient, private formBuilder: FormBuilder,private route: ActivatedRoute,
    private api: ApiService,) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    if (this.role !== 'admin') {
      window.location.replace('/');
    }

    this.route.params.subscribe((params: Params) => this.product_id = params['id']);
    this.user_id = sessionStorage.getItem('id');
    this.getUserById();
    this.getProductById();

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      sale: [0, Validators.required],
      qte_stock: ['', Validators.required],
      sale_amount: [1, Validators.required],
      image: ["https://dummyimage.com/450x300/dee2e6/6c757d.jpg", Validators.nullValidator],
    });

    
  }

  getUserById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_user_by_id(this.user_id.toString())
        .subscribe((response: any) => {
          this.user = response;
          resolve(response);
        });
    });
  }

  getProductById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_product_by_id(this.product_id.toString())
        .subscribe((response: any) => {
           this.product = response;
           console.log(this.product);
           
           this.init_value();
          resolve(response);
        });
    });
  }
  
  edit_product() {
    this.product = this.productForm.value;
    if (this.checked===false) {
      this.product.sale_amount = 0;
      this.product.sale=0;
    }else{
      this.product.sale=1;
    }
    
    console.log(this.product);

    return new Promise((resolve, reject) => {
      if (this.productForm.valid) {

        this.api.update_product(this.product)
          .subscribe((response: any) => {
            this.succ_msg = "Product Updated Successfully"
            window.location.replace('/')
            resolve(response);

          });

      }
      else {
        this.err_msg = "Pleas fill all product info"

      }
    });

  }


  init_value() {

  
      this.productForm = this.formBuilder.group({
        id: [this.product.id],
        name: [this.product.name, Validators.required],
        description: [this.product.description, Validators.required],
        price: [this.product.price, Validators.required],
        sale: [this.product.sale, Validators.required],
        qte_stock: [this.product.qte_stock, Validators.required],
        sale_amount: [this.product.sale_amount, Validators.required],
        image: [this.product.image, Validators.required],
      });


    }
  
}
