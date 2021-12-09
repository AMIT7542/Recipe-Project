import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { recipeSevice } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetails;
  listOfRecipe;
  id: number;
  isRecipeAvailable: boolean = true;
  constructor(private _recipeService: recipeSevice, private _router: Router, private _route: ActivatedRoute, private _service: DataStorageService) { }

  ngOnInit() {

    this._route.params.subscribe((parms: Params) => {
      this.id = +parms['id'];
      this.recipeDetails = this._recipeService.getRecipe(this.id)

    })
    if (!this.recipeDetails) {
      this.isRecipeAvailable = false;
      this._router.navigate(["**"]);
    }



  }
  onAddToShoppingList() {
    this._recipeService.addIngredientToShoppingList(this.recipeDetails.ingredients)
  }
  editRecipe() {
    this._router.navigate(['edit'], { relativeTo: this._route })

  }
  DeleteRecipe() {
    this._recipeService.deleteRecipe(this.id);
    this._service.storeRecipes().subscribe(() => {
      alert("success")
    })
    this._router.navigate([''])

  }
}
