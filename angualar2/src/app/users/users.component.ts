import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entities/user'
import { UsersService } from '../services/users.service'
import { ConfigService } from '../services/config.service';
import { Config } from '../entities/config';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  private config : Config = new Config();
  public users   : User[];

  constructor(
    private router        : Router,
    private configService : ConfigService,
    private usersService  : UsersService
  ) { 
    this.config = this.configService.config
  }

  ngOnInit(): void {
    this.getUsers()
  }

  /**
   * Obtiene los usuarios 
   */
  private getUsers(): void{
    this.usersService.getUsers()
      .subscribe( users => {
        this.users = users
        console.log(users)
        this.setWorkFlow()
      });
  }

  /**
   * Define el flujo de navegacion
   */
  private setWorkFlow(): void{ 
    if( this.users.length <= 0 ){
      this.router.navigate(['/users/add']);
    }//end if
  }

  /**
   * Elimina una direccion
   * @param id
   */
  public delete(id: number): void{
    this.usersService.deleteUser(id)
      .subscribe(() => {
        this.getUsers()
      });
  }

  /**
   * Redirecciona a url de edicion
   * @param id 
   */
  public edit(id : number): void{
    const url = `/users/${id}/edit`;
    this.router.navigate([url]);
  }

}
