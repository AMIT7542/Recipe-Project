import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
@Injectable({
    providedIn:'root'
})
export class shoppingService
{
    editIngredient=new Subject();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];
     
getListOfIngredient()
{
   return this.ingredients;
}
addIngredient(ingredient:Ingredient)
{
    this.ingredients.push(ingredient)
}
addIngredients(ingredients)
{
    this.ingredients.push(...ingredients);
}
getIngredient(index)
{
  
    return this.ingredients[index];
}
updateIngredient(index,ingredient)
{
    this.ingredients[index]=ingredient
}
deleteIngredient(index)
{
    this.ingredients.splice(index,1)
}
}