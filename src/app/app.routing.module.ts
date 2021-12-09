import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { ResolveGuard } from "./helper/resolve.guard";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes:Routes=[
    {path:'',redirectTo:'/recipes',pathMatch:'full'},
    {
        path: "recipes",
        loadChildren: () =>
          import("./recipes/recipes.module").then(m => m.RecipesModule)
      },
      {
        path: "shopping-list",
      loadChildren: "./shopping-list/shopping.module#ShoppingModule"
      },
      {
        path: "auth",
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
      }
    // {path:"**",component:NotFoundComponent}

]
@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
})

export class AppRoutingModule
{

}