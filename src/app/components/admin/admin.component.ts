import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Product } from 'src/app/models/product';
import { Facture } from 'src/app/models/facture';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  @ViewChild('paginator') paginator!:MatPaginator;

  products!:MatTableDataSource<Product>;

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'phone', 'country', 'email', 'role', 'action'];
  displayedColumns2: string[] = ['id', 'name', 'description','qte_stock' ,'sale','sale_amount','price','image','action'];
  displayedColumns3: string[] = ['id', 'full_name', 'product_name','product_qte' ,'total','action'];

  dataSource !: User[];
  dataSource2 !: Product[];
  dataSource3 !: Facture[];

  page: number = 1;
  itemsPerPage: number = 5;

  role!: string | null;
  user!: User;

  err_msg!: string;
  succ_msg!: string;
  title!: string;
  id!: string | null;


  public constructor(private http: HttpClient, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    this.id = sessionStorage.getItem('id');
    if (this.role !== 'admin') {
      window.location.replace('/');
    }
    this.getUserById();
    this.getAllUsers();
    this.getAllProducts();
    this.getAllFactures()
    this.title = 'Clients'

  


  }



  getAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_users()
        .subscribe((response: any) => {
          this.dataSource = response;
          console.log(this.dataSource);

          resolve(response);
        });
    });
  }

  getAllProducts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_products()
        .subscribe((response: any) => {
          this.dataSource2 = response;
          console.log(this.dataSource2);
          this.products=new MatTableDataSource(this.dataSource2);
          this.products.paginator=this.paginator;
          console.log(this.products);
          resolve(response);
        });
    });
  }

  getAllFactures(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_factures()
        .subscribe((response: any) => {
          this.dataSource3 = response;
          console.log(this.dataSource3);

          resolve(response);
        });
    });
  }

  getUserById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_user_by_id(this.id)
        .subscribe((response: any) => {
          this.user = response;
          resolve(response);
        });
    });
  }

  deleteUser(id: string | null) {

    if (confirm("Are You Sure !!")) {
      this.api.delete_user(id)
        .subscribe(() => { 
          this.succ_msg = " User deleted Successfully";
          this.getAllUsers();
        });
    }
  }

  
  deleteProduct(id: string | null) {

    if (confirm("Are You Sure !!")) {
      this.api.delete_product(id)
        .subscribe(() => { 
          this.succ_msg = " Product deleted Successfully";
          this.getAllProducts();
        });
    }
  }


}