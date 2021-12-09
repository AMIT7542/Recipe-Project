import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ErrorInterceptor } from "./interceptor/error-handler.interceptor";
import { LoaderInterceptor } from "./interceptor/loader.interceptor";
import { TokenInterceptor } from "./interceptor/token.interceptor";

@NgModule({
    providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        }
      ],
})
export class CoreModule
{

}