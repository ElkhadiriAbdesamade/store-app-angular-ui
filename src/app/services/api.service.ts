import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { Product } from '../models/product';
import { Facture } from '../models/facture';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //users
  add_user(data: User) {

    return this.http.post<User>("https://63c2bdf6e3abfa59bdb22bdb.mockapi.io/user", data)
  }
  get_users() {
    return this.http.get<User[]>("https://63c2bdf6e3abfa59bdb22bdb.mockapi.io/user")
  }
  get_user_by_id(id: string | null) {
    return this.http.get<User[]>("https://63c2bdf6e3abfa59bdb22bdb.mockapi.io/user/" + id)
  }
  get_user_by_email(email: string) {
    return this.http.get<User[]>("https://63c2bdf6e3abfa59bdb22bdb.mockapi.io/user/?email=" + email)
  }
  update_user(data: User) {
    return this.http.put<User>("https://63c2bdf6e3abfa59bdb22bdb.mockapi.io/user/"+data.id, data)
  }
  delete_user(id: string | null) {
    return this.http.delete<User>("https://63c2bdf6e3abfa59bdb22bdb.mockapi.io/user/" + id)
  }

  //-----------------Product-----------------------------
  add_product(data: Product) {
    return this.http.post<Product>("https://63c2bdf6e3abfa59bdb22bdb.mockapi.io/product", data)
  }
  get_products() {
    return this.http.get<Product[]>("https://63c2bdf6e3abfa59bdb22bdb.mockapi.io/product")
  }

  search_products(productName: String) {
    return this.http.get<Product[]>("https://63c2bdf6e3abfa59bdb22bdb.mockapi.io/product/?name="+ productName)
  }
  get_product_by_id(id: string | null) {
    return this.http.get<Product[]>("https://63c2bdf6e3abfa59bdb22bdb.mockapi.io/product/" + id)
  }
  get_product_by_name(name: string) {
    return this.http.get<Product[]>("http://localhost:8080/services/rest/v1.0/gestion/product/email/" + name)
  }
  update_product(data: Product) {
    return this.http.put<Product>("https://63c2bdf6e3abfa59bdb22bdb.mockapi.io/product/"+data.id, data)
  }
  delete_product(id: string | null) {
    return this.http.delete<Product>("https://63c2bdf6e3abfa59bdb22bdb.mockapi.io/product/" + id)
  }

  //-----------------Facture-----------------------------
  add_facture(data: Facture) {
    return this.http.post<Facture>("https://63c2f966e3abfa59bdb69be5.mockapi.io/facture", data)
  }
  get_factures() {
    return this.http.get<Facture[]>("https://63c2f966e3abfa59bdb69be5.mockapi.io/facture")
  }
  get_facturesByUserId(id: string | null) {
    return this.http.get<Facture[]>("https://63c2f966e3abfa59bdb69be5.mockapi.io/facture/?user_id="+id)
  }

  get_factureById(id: string | null) {
    return this.http.get<Facture>("https://63c2f966e3abfa59bdb69be5.mockapi.io/facture/"+id)
  }
}
