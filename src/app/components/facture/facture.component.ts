import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from 'src/app/models/facture';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent {



  page: number = 1;
  itemsPerPage: number = 5;

  id!: string | null;
  user!: User;
  dataSource !: Facture[];
  role!: string | null;

  public constructor(private api: ApiService,private router: Router) { }

  ngOnInit(): void {
    
    this.role = sessionStorage.getItem('role');
    if (this.role==="") {
      window.location.replace('/');
    }
    this.id = sessionStorage.getItem('id');
   
    this.getUserById();
    this.getAllFactureByUserId()
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

  getAllFactureByUserId(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_facturesByUserId(this.id)
        .subscribe((response: any) => {
          this.dataSource = response;
          console.log(this.dataSource);

          resolve(response);
        });
    });
  }

  goToFacture_Detail(id:number){
    this.router.navigateByUrl('facture_Detail/' + id);
  }
}
