import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../shared/auth-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _auth:AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this._auth.getToken();
    if(token)
    {
     
    const  modifiedrequest = request.clone({
       params:new HttpParams().set('auth',token)
     });
     return next.handle(modifiedrequest);
    }
    else{
     
    return next.handle(request);
    }
  }
}
