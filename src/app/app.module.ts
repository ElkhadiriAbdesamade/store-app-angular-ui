import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProduitComponent } from '../app/components/product/produit/produit.component';
import { ClientComponent } from './components/client/client.component';
import { FactureComponent } from './components/facture/facture.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProduitDetailComponent } from '../app/components/product/produit-detail/produit-detail.component';



import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { QRCodeModule } from 'angularx-qrcode';


import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FactureDetailComponent } from './components/facture-detail/facture-detail.component';

import { NgxPrintElementModule } from 'ngx-print-element';



const appRoute: Routes=[
  // {path:'login',component: LoginComponent},
  {path:'',component: ProduitComponent},
  {path:'client/:id',component: ClientComponent},
  {path:'product_details/:id',component: ProduitDetailComponent},
  {path:'edit_product/:id',component: EditProductComponent},
  {path:'facture',component: FactureComponent},
  {path:'login',component: LoginComponent},
  {path:'signup',component: SignUpComponent},
  {path:'admin',component: AdminComponent},
  {path:'add-product',component: AddProductComponent},
  {path:'facture/:id',component: FactureComponent},
  {path:'facture_Detail/:id',component: FactureDetailComponent},
  {path:'**',component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ProduitComponent,
    ClientComponent,
    FactureComponent,
    NavbarComponent,
    FooterComponent,
    ProduitDetailComponent,
    LoginComponent,
    SignUpComponent,
    AdminComponent,
    AddProductComponent,
    EditProductComponent,
    NotFoundComponent,
    FactureDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    NgxMatFileInputModule,
    NgxPaginationModule,
    NgxPrintElementModule,
    QRCodeModule,

    RouterModule.forRoot(appRoute),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
