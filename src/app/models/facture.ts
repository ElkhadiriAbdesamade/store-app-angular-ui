export interface Facture {
    id:number;
    user_id :number;
    product_id :number;
    user_fullName:String;
    product_name:String;
    product_qte:number;
    total_price :number;
    creation_Date:string|null;
    
}