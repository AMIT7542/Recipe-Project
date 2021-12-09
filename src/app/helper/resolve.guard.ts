import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { recipeSevice } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any>{
  constructor(private _service:DataStorageService,private _recipe:recipeSevice){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipe=this._recipe.getListOfRecipe();
    if(recipe.length==0)
    {
return this._service.fetchRecipes();
    }
    else{
    return recipe
    }
   
  }
  
}
