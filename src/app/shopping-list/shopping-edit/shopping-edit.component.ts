import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
subscription:Subscription;
collectItem;
@ViewChild('ingredientForm',{static:false}) form:NgForm;
  editMode: boolean;
  index: unknown;
  constructor(private _shoppingService:shoppingService) { }

  ngOnInit(): void {
this.subscription=this._shoppingService.editIngredient.subscribe((index)=>
{
  this.index=index;
  this.editMode=true;
  this.collectItem=this._shoppingService.getIngredient(index)
  this.form.setValue({
name:this.collectItem.name,
amount:this.collectItem.amount
  })
}
)
  }
  addItem(ingredientForm)
  {
    const value=ingredientForm.value; 
    // const amount=this.amountInputRef.nativeElement.value;
    const ingredientObj=new Ingredient(value.name,value.amount)
if(this.editMode)
{
this._shoppingService.updateIngredient(this.index,ingredientObj)
this.editMode=!this.editMode

}
else{

  this._shoppingService.addIngredient(ingredientObj)
}
this.form.reset();
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
  onClear()
  {
    this.form.reset();
    this.editMode=false;
  }
  onDeleteItem()
  {
this._shoppingService.deleteIngredient(this.index)
this.onClear();
  }

}
