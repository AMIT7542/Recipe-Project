import { Component, Input, OnChanges, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { recipeSevice } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit,OnChanges {
@Input() recipe:Recipe;
@Input() index:number;
  constructor(private _recipeService:recipeSevice,private _route:Router) { }

  ngOnInit(): void {
  
  }
  ngOnChanges()
  {

  }
}
