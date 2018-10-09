import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isNumber } from 'util';
import { User } from '../entities/user'
import { UsersService } from '../services/users.service'
import { ConfigService } from '../services/config.service';
import { Config } from '../entities/config';
import { Validator } from '../entities/validator';
import { ValidatorService } from '../services/validator.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user  : User   = new User();
  private config : Config = new Config();
  public rules = {
    'name' : new Validator(
      'name',
      '',
      'string',
      'El campo name es requerido'
    ),
    'username' : new Validator(
      'username',
      '',
      'alphanumeric',
      'El campo username es requerido'
    ),
    'email' : new Validator(
      'email',
      '',
      'email',
      'El campo email es requerido'
    )
  };

  /**
   * Costructor
   * @param router 
   * @param route 
   * @param configService 
   * @param validatorService 
   * @param usersService 
   */
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private configService : ConfigService,
    private validatorService : ValidatorService,
    private usersService  : UsersService,
    private globalService : GlobalService
  ) { 
    this.config = this.configService.config
  }

  ngOnInit(): void {
    this.getUser()
  }

  /**
   * Obtiene el objeto tarjeta por medio del id
   */
  private getUser(): void{
    let id = +this.route.snapshot.paramMap.get('id');
    if( isNumber(id) && id > 0){
      this.usersService.getUser(id)
      .subscribe((user: User) => {
        this.user = user
      });
    }//end if
  }

  /**
   * Guardar el objeto user
   */
  public save(): void{

    let validate = this.validateForm(undefined);
    if(validate){
      this.usersService.addUser(this.user)
        .subscribe( (response: User) => {
          this.setWorkFlow(response)
        });
    }//end if
  }

  /**
   * Genera la validacion del formulario
   * @return boolean
   */
  public validateForm(field : string | undefined ): boolean{
    let valid: boolean = true;
    let response = this.rules
    this.setRulesValidate(field);
    if( field == undefined){
      response = this.validatorService.validate(this.rules);
    }else{
      let param = {[field] : this.rules[field]}
      response = this.validatorService.validate(param);
    }
    for (let key in response){
      if (response.hasOwnProperty(key)){
        if ( response[key].error ){
          this.rules[key].error = response[key].error
          valid = false;
        }//end if
      }//end if
    }//end for

    return valid
  }

  /**
   * Define las reglas de validacion para el formulario
   */
  private setRulesValidate(field : string | undefined ): void{
    if( field !== undefined ){
      this.rules[field].value = this.user[field]
    }else{
      this.rules.name.value     = this.user.name;
      this.rules.username.value = this.user.username;
      this.rules.email.value    = this.user.email;
    }//end if
  }

  /**
   * Define el flujo de navegacion
   */
  private setWorkFlow(response : User): void{ 
    if( response.status ){
      this.router.navigate(['/users']);
    }else{
      this.globalService.setMessage(response.error);
    }//end if
  }

}
