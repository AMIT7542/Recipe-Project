import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { recipeSevice } from "../recipes/recipe.service";
import { filter, map, tap } from 'rxjs/operators';
import { Recipe } from "../recipes/recipe.model";
const baseUrl = environment.baseUrl
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private _http: HttpClient, private _recipeService: recipeSevice) {

    }
    storeRecipes(): Observable<any> {
        const recipesList = this._recipeService.getListOfRecipe();
        return this._http.put(`${baseUrl}/recipes.json`, recipesList);
    }
    fetchRecipes() {
        return this._http
          .get<Recipe[]>(
            `${baseUrl}/recipes.json`
          )
          .pipe(
            map(recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            }),
            tap(recipes => {
              this._recipeService.setRecipes(recipes);
            })
          )
      }
    deleteRecipe(id) {
        return this._http.delete(`${baseUrl}/recipes.json`, id);
    }
    getRecipe(id) {
        return this._http.get(`${baseUrl}/recipes.json`, id);
    }
  
}