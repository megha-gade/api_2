import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Product } from "../model/product";

@Injectable({providedIn:"root"})
export class ProductService{
allPro:Product[]=[];
constructor(private http:HttpClient)
{

}

//create
createPro(productData:{product_name:string,product_description:string,product_price:number,id:string})
{


if(productData.product_name==null || productData.product_description==null
  || productData.product_price==null)
{
this.http.delete('https://api2-4cea3-default-rtdb.firebaseio.com/product/'+productData.id+'.json')
}
  this.http.post<{name:string}>('https://api2-4cea3-default-rtdb.firebaseio.com/product.json',productData)
  .subscribe(res=>console.log(res));
}

//fetch
fetchPro()
{
 return this.http.get<{[key:string]:Product}>('https://api2-4cea3-default-rtdb.firebaseio.com/product.json')
.pipe(map(res=>{
const allProductArray=[];
for(let key in res)
{
if(res.hasOwnProperty(key))
{
allProductArray.push({...res[key],id:key})
}
}
return allProductArray;
}))
}


//delete by id

deleteProUsingId(id:string)
{
this.http.delete('https://api2-4cea3-default-rtdb.firebaseio.com/product/'+id+'.json').subscribe()
}


//delete
deletePro(){
this.http.delete('https://api2-4cea3-default-rtdb.firebaseio.com/product.json').subscribe();
}

//update
updatePro(id:string,value:Product)
{
this.http.post('https://api2-4cea3-default-rtdb.firebaseio.com/product/'+id+'.json',value)
}


}
