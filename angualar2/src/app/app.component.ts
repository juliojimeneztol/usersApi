import { Component, OnInit } from '@angular/core';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  public loading : boolean = false;
  public error   : boolean = false;
  public message : string  = '';

  /**
   * Constructor
   * @param router 
   */
  constructor(
    private globalService: GlobalService
  ){
  }
  
  ngOnInit() {
    this.globalService.error.subscribe( error => {
      this.error = error
    });
    this.globalService.loading.subscribe( loading => {
      this.loading = loading
    });
    this.globalService.message.subscribe( message => {
      this.message = message
    });
  }
}