import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { RequestInterceptor } from './http/requestInterceptor';

//services
import { ConfigService }    from "./services/config.service";
import { GlobalService }    from "./services/global.service";
import { UsersService }     from "./services/users.service";
import { ValidatorService } from './services/validator.service'

const appInitializerFn = ( config : ConfigService) => {
  return () => {
    return config.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    GlobalService,
    ConfigService,
    UsersService,
    ValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
