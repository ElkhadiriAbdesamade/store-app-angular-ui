import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  productForm !: FormGroup;
  accept = ".png, .jpg, .jpeg";
  checked = false;
  err_msg!: String;
  succ_msg!: String;

  product: Product = { id: 0, name: '', description: '', price: 0, sale: 1, sale_amount: 0, image: '', qte_stock: 0 };
  role!: string|null;


  public constructor(private http: HttpClient, private formBuilder: FormBuilder,
    private api: ApiService,) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    if (this.role !== 'admin') {
      window.location.replace('/');
    }
    
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

 

  
  addProduct() {
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

        this.api.add_product(this.productForm.value)
          .subscribe((response: any) => {
            this.succ_msg = "Product Added Successfully "
            window.location.replace('/');
            resolve(response);
          });

      }
      else {
        this.err_msg = "Pleas fill all The information !"

      }
    });

  }
}
