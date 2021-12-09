import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { recipeSevice } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: any
  constructor(private _recipeService: recipeSevice, private _router: Router, private _route: ActivatedRoute, private _dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this._recipeService.recipeChanged.subscribe(data => {
   
      this.recipes = data;
    })
    this.recipes=this._recipeService.getListOfRecipe();
  }
  onNewRecipe() {
    this._router.navigate(['new'], { relativeTo: this._route })
  }
  fetchRecipes() {
    
    this._dataStorageService.fetchRecipes().subscribe((data) => {
      
      this._recipeService.setRecipes(data);
      this.recipes=this._recipeService.getListOfRecipe();
    })

  }
}