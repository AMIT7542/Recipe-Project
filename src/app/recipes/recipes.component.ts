import { Component, OnChanges, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { recipeSevice } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  constructor(private _recipeService:recipeSevice) { }
passRecipe:Recipe[];
  ngOnInit(): void {
   this._recipeService.emitRecipe.subscribe(recipe=>{
     this.passRecipe=recipe;
   })
   
  }
 

}
