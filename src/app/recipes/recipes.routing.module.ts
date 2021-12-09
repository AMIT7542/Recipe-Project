import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guard/auth.guard";
import { ResolveGuard } from "../helper/resolve.guard";
import { NotFoundComponent } from "../not-found/not-found.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const routes:Routes=[
    {path:'',component:RecipesComponent,canActivate:[AuthGuard],
    children:[
{path:'',component: RecipeStartComponent},
{path:'new',component:RecipeEditComponent},
{path:':id',component:RecipeDetailComponent,resolve:[ResolveGuard]},
{path:':id/edit',component:RecipeEditComponent,resolve:[ResolveGuard]},

    ]},
    
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
    })
    
export class RecipesRoutingModule
{

}