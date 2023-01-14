import { Component } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
 

  constructor(private router: Router) { }

  role!: string | null;
  user_name!: string | null;
  id!: string | null;
  logged!:string | null;
  


  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    this.user_name = sessionStorage.getItem('user_name');
    this.id = sessionStorage.getItem('id');
    this.logged = sessionStorage.getItem('Logged');
    
  }

  goToProfile(){
    this.router.navigateByUrl('client/' + this.id);
  }

  goToFacture(){
    this.router.navigateByUrl('facture/' + this.id);
  }

  logout() {
    sessionStorage.setItem('role', '');
    sessionStorage.setItem('user_name', '');
    sessionStorage.setItem('id', '');
    sessionStorage.setItem('Logged', "false");
    sessionStorage.setItem('email', "");
    window.location.replace('/');
  }

}
