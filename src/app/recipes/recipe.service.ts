import { EventEmitter, Injectable, Output } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { shoppingService } from "../shopping-list/shopping.service";
import { Recipe } from "./recipe.model";
@Injectable({
  providedIn: 'root'
})
export class recipeSevice {
  constructor(private _shoppingService: shoppingService) { }
  @Output() emitRecipe = new EventEmitter<Recipe>();
  recipeChanged = new Subject();
  private recipes: Recipe[] = [];

  getListOfRecipe() {
    return this.recipes;
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientToShoppingList(ingredients) {
    this._shoppingService.addIngredients(ingredients)
  }
  addRecipe(recipe) {
    this.recipes=this.recipes || [];
    this.recipes.push(recipe)
  }
  updateRecipe(index, recipe) {
    this.recipes[index] = recipe
  }
  deleteRecipe(index) {
    this.recipes.splice(index, 1)
  }
  setRecipes(list) {
    this.recipes = list;
    this.recipeChanged.next(this.recipes);
  }

}