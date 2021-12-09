import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
 isLoading=this._loaderService.isLoading;
  constructor(private _loaderService:LoaderService) { }

  ngOnInit(){
     console.log("loader component",this.isLoading)
  }

}
