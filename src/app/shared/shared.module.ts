import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { headerComponent } from "../header/header.component";
import { LoaderComponent } from "../loader/loader.component";
import { AppDropdownDirective } from "./app-dropdown.directive";
import { CurrencyDirective } from "./currency.directive";
import { AlertComponent } from './alert/alert.component';
@NgModule({
    declarations: [
        CurrencyDirective,
        AppDropdownDirective,
        LoaderComponent,
        AlertComponent,
    ],
    imports: [CommonModule],
    exports: [
        CurrencyDirective,
        AppDropdownDirective,
        LoaderComponent,
        AlertComponent,
        CommonModule,

    ]

})
export class SharedModule {

}