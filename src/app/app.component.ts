import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { Product } from './model/product';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'API_2';
allProductList:Product[]=[];
isLoading:boolean=false;
@ViewChild('formVariable')originalForm:NgForm;
editMode:boolean=false;
currentUpdateId:string;

constructor(private http:HttpClient,private productServe:ProductService)
{

}

ngOnInit(): void {
this.fetchAllProducts();

}

customFetchProduct()
{
this.fetchAllProducts();
}


//submitmethod
onProductCreation(productData:{product_name:string,product_description:string,product_price:number,id:string}){
console.log(productData);


//'create method for post or send the data to databse'
if(!this.editMode){this.productServe.createPro(productData)}
else
{
this.productServe.updatePro(this.currentUpdateId,productData)
}


}


//fetch all product
private fetchAllProducts()
{
this.isLoading=true

this.productServe.fetchPro().subscribe(res=>{
console.log(res);
this.allProductList=res;
});
this.isLoading=false



}


//deleetebyid
deleteProductUsingId(id:string)
{
this.productServe.deleteProUsingId(id);
}


//delete
ClearProduct()
{
this.productServe.deletePro();
}

//update

updateProductUsingId(updateIdtakenFromUi:string)
{
this.currentUpdateId=updateIdtakenFromUi;

//'get the id to update the product'
let updateProductFromId=this.allProductList.find(element=>{
return element.id==updateIdtakenFromUi;
})


//'return the product'
console.log(updateProductFromId);

this.originalForm.setValue({
  product_name:updateProductFromId.product_name,
  product_description:updateProductFromId.product_description,
  product_price:updateProductFromId.product_price
})

this.editMode=true


//'change button text'

}

//class end

}
