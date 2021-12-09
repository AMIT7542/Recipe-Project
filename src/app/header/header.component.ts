import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroy } from 'bowser/tank/node_modules/@angular/core/core';
import { Subscription } from 'rxjs';
import { recipeSevice } from '../recipes/recipe.service';
import { AuthServiceService } from '../shared/auth-service.service';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class headerComponent implements OnInit,OnDestroy {
    collapsed = true;
    loggedIn=false;
    private userSub: Subscription;
constructor(private _router:Router,private _dataStorageService:DataStorageService,private _recipeService:recipeSevice,private _auth:AuthServiceService){

}
  ngOnInit(): void {
   this.userSub=this._auth.loggedIn.subscribe(data=>
    {
this.loggedIn=data;
    })
  }
    
storeRecipes()
{
this._dataStorageService.storeRecipes().subscribe(()=>
{
  alert("success")
})
}
fetchRecipes()
{
  this._dataStorageService.fetchRecipes().subscribe((data)=>{

    this._recipeService.setRecipes(data);
  })

 
}
logOut()
{
  this._auth.clearStorage();
  this._router.navigate(['/auth']);
}
ngOnDestroy()
{
  this.userSub.unsubscribe();
}
} 
