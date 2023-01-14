import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ApiService } from '../../../services/api.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  hide = true;
  countries: any;
  country!: string;
  email!: string;
  err_msg!: string;
  userForm !: FormGroup;
  e!: boolean;
  user!: User;
  Loading!: boolean;

  public constructor(private http: HttpClient, private formBuilder: FormBuilder,
    private api: ApiService,) { }


  ngOnInit(): void {
    this.fill_country();


    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['user', Validators.required],
    });


  }


  registerUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.userForm.valid) {
        this.Loading=true
        this.api.get_user_by_email(this.email)
          .subscribe((response: any) => {

            this.user = response;
            console.log(this.user);

            if (this.user.email !== this.email) {
              this.api.add_user(this.userForm.value)
                .subscribe((response: any) => {
                  window.location.replace('/login');
                  this.Loading=false;
                  resolve(response);
                });

             
            }
            else{
              this.err_msg="email already exist !";
              this.Loading=false;
            }

            resolve(response);
          });
      }
      else{
        this.err_msg="Pleas fill all your information !"
        this.Loading=false;
      }
    });
  }
  // registerUser(){
  //   console.log(this.userForm.value);



  //    if (this.userForm.valid) {
  //       this.api.add_user(this.userForm.value)
  //       .subscribe({
  //         next:(res)=>{
  //           alert("user Added Successfully");
  //           this.userForm.reset();
  //         },
  //         error:()=>{
  //           alert("Error While adding the user")
  //         }
  //       })
  //     }


  // }

  fill_country() {
    const url: string = '/assets/data/country.json';
    this.http.get(url).subscribe((response) => {
      this.countries = response;
      console.log(response);

    });
  }
}
