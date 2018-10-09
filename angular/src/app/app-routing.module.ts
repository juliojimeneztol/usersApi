import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '',     redirectTo: 'users', pathMatch: 'full' },
  { path: 'users',          component: UsersComponent},
  { path: 'users/:id/edit', component: UserComponent },
  { path: 'users/add',       component: UserComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
