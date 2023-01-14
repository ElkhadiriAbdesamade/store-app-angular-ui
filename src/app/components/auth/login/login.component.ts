import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  checked!: boolean;
  Loading!: boolean;
  hide = true;
  user!: User[];
  err_msg!: string;
  userForm !: FormGroup;
  email!: string;
  psw!: string;

  public constructor(private http: HttpClient, private formBuilder: FormBuilder,
    private api: ApiService,) { }


  ngOnInit(): void {

    this.userForm = this.formBuilder.group({

      email: ['', Validators.required],
      password: ['', Validators.required],

    });


  }

  login(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.userForm.valid) {
        this.Loading = true
        this.api.get_user_by_email(this.email)
          .subscribe({
            next: (response: any) => {

              this.user = response;
              console.log(this.user[0].email);
              if (this.user[0].password === this.psw) {
                sessionStorage.setItem('role', this.user[0].role);
                sessionStorage.setItem('user_name', this.user[0].first_name);
                sessionStorage.setItem('id', this.user[0].id.toString());
                sessionStorage.setItem('Logged', "true");
                window.location.replace('/');
              }
              else {
                this.err_msg = "email or password Incorrect !";
                this.Loading = false
              }
              resolve(response);

            },
            error:(err)=>{
              
              this.err_msg = "error while getting user";
                this.Loading = false
              
            }
          });
      }
      else{
        this.err_msg = "please Fill your email and password !";
      }


    });


  }


}
