import { Component } from '@angular/core';
import { AuthServiceService } from './shared/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  category='';
  constructor(private _auth:AuthServiceService)
  {
   this._auth.autoLogin();
    
  }

  
}
