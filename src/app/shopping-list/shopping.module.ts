import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RecipesRoutingModule } from "../recipes/recipes.routing.module";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingRouterModule } from "./shopping-routing.module";

@NgModule(
    {
        declarations: [
            ShoppingListComponent,
            ShoppingEditComponent,
        ],
        imports: [
            RouterModule,
            ReactiveFormsModule,
            FormsModule,
            ShoppingRouterModule,
            SharedModule
        ],


    }
)
export class ShoppingModule {

}