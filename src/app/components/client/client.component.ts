import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  hide = true;
  countries: any;
  country!: string;
  email!: string;
  email_exist!:boolean;
  id!: number;
  user!: User;
  user2!: User;
  userForm !: FormGroup;
  isDisabled = true;
  err_msg!: string;
  succ_msg!: string;
  role!: string | null;

  public constructor(private http: HttpClient, private api: ApiService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => this.id = params['id']);
    this.role = sessionStorage.getItem('role');
    if (this.role==="") {
      window.location.replace('/');
    }

    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });

   
    
    this.getUserById();
    



    // if (this.user) {
    //   this.userForm = this.formBuilder.group({
    //     first_name: [this.user.first_name, Validators.required],
    //     last_name: [this.user.last_name, Validators.required],
    //     phone: [this.user.phone, Validators.required],
    //     address: [this.user.address, Validators.required],
    //     country: [this.user.country, Validators.required],
    //     email: [this.user.email, Validators.required],
    //     password: [this.user.password, Validators.required],
    //     role: ['user', Validators.required],
    //   });
    // }

    const url: string = '/assets/data/country.json';
    this.http.get(url).subscribe((response) => {
      this.countries = response;
    });
  }

  getUserById(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get_user_by_id(this.id.toString())
        .subscribe((response: any) => {
          this.user = response;

          this.init_value();
          resolve(response);
        });
    });
  }

  update(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.userForm.valid) {
        this.api.get_user_by_email(this.user.email)
          .subscribe((response: any) => {
            if (this.email_exist) {
              this.err_msg = "email already exist !"
              return;
            }
            else {
              this.api.update_user(this.userForm.value)
              .subscribe((response: any) => {
                this.succ_msg = "Info Updated Successfully"
                resolve(response);
              });
            }

            resolve(response);
          });
      }
      else {
        this.err_msg = "Pleas fill all your information !"
      }
    });
  }

  init_value() {

    if (this.user) {
      this.email = this.user.email;
      this.userForm = this.formBuilder.group({
        id: [this.user.id],
        first_name: [this.user.first_name, Validators.required],
        last_name: [this.user.last_name, Validators.required],
        phone: [this.user.phone, Validators.required],
        address: [this.user.address, Validators.required],
        country: [this.user.country, Validators.required],
        email: [this.user.email, Validators.required],
        password: [this.user.password, Validators.required],
        role: [this.user.role, Validators.required],
      });



      this.userForm.controls['email'].valueChanges.subscribe(selectedValue => {
        this.api.get_user_by_email(selectedValue)
          .subscribe((response: any) => {
            this.user2 = response;
            if (this.user2.email!=='' && this.user2.email!==this.email) {
              this.email_exist=true;
            }
            else{
              this.email_exist=false;
            }

          
          });
      })
  
      this.userForm.valueChanges.subscribe(x => {
        this.user = this.userForm.value
        this.isDisabled = false;

      })
      console.log(this.userForm.value);

    }
  }


}
