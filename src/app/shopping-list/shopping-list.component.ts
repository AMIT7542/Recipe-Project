import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[];
  constructor(private _shoppingService:shoppingService) { }

  ngOnInit(): void {
    this.getListOfingredients()
  }
  getListOfingredients(){
  this.ingredients=this._shoppingService.getListOfIngredient();

  }
  onEdit(index)
  {
    this._shoppingService.editIngredient.next(index);
  }

}
