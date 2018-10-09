import { Injectable } from '@angular/core';
import { Validator } from '../entities/validator';

@Injectable()
export class ValidatorService {

  public Validators: Validator[];

  constructor() { }

  /**
   * Validate method
   * @param data
   * @return data Validator[]
   */
  public validate(data){
    this.process(data);
    return data;
  }

  /**
   * Process data parameters
   * @param params
   * @return params Validator[] 
   */
  private process(params){
    for (let key in params){
      if (params.hasOwnProperty(key)){
        switch (params[key].type) {
          case 'string':
            params[key].error = this.isValidString(params[key].value) ? false : true;
            break;
          case 'int':
            params[key].error = this.isValidInt(params[key].value) ? false : true;
            break;
          case 'email':
            params[key].error = this.isValidEmail(params[key].value) ? false : true;
            break;
          case 'number':
            params[key].error = this.isValidNumber(params[key].value) ? false : true;
            break;
          case 'postalCode':
            params[key].error = this.isValidPostalCode(params[key].value) ? false : true;
            break;
          case 'phone':
            params[key].error = this.isValidPhone(params[key].value) ? false : true;
            break;
          case 'alphanumeric':
            params[key].error = this.isValidAlphaNumeric(params[key].value) ? false : true;
            break;
          case 'formatstring':
            params[key].error = this.isValidFormatString(params[key].value) ? false : true;
            break;
          case 'cvv':
            params[key].error = this.isValidCvv(params[key].value) ? false : true;
            break;

        }//end switch
      }//end if
    }

    return params;
  }

  /**
   * Validate string value
   * @param value
   * @return boolean
   */
  private isValidString(value:string): boolean{

    var response:boolean = false;
    if(value !== undefined){
      response = /(^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+)$/.test(value);
    }//end if

    return response
  }

  /**
   * Validate string value
   * @param value
   * @return boolean
   */
  private isValidAlphaNumeric(value:string): boolean{

    var response:boolean = false;
    if(value !== undefined){
      response = /(^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s]+)$/.test(value);
    }//end if
      
    return response
  }

  /**
   * Validate string value
   * @param value
   * @return boolean
   */
  private isValidFormatString(value:string): boolean{

    var response:boolean = false;
    if(value !== undefined){
      response = /(^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ()_@./%?#&+-\s]+)$/.test(value);
    }//end if
      
    return response
  }
  /**
   * Validate int value
   * @param value
   * @return boolean
   */
  private isValidInt(value: string): boolean{

    var response:boolean = false;
    if(value !== undefined){
      response = /(^[1-9]+)$/.test(value);
    }//end if

    return response
  }

  /**
   * Validate string value
   * @param value
   * @return boolean
   */
  private isValidEmail(value: string): boolean{

    var response:boolean = false;
    if(value !== undefined){
      response = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }//end if

    return response
  }

  /**
   * Validate number value
   * @param value
   * @return boolean
   */
  private isValidNumber(value: string): boolean{

    var response:boolean = false;
    if(value !== undefined){
      response = /(^[0-9]+)$/.test(value);
    }//end if

    return response
  }

  /**
   * Validate postal code value
   * @param value
   * @return boolean
   */
  private isValidPostalCode(value: string): boolean{

    var response:boolean = false;
    if(value !== undefined){
      response = /(^[0-9]{5})$/.test(value);
    }//end if

    return response;
  }

  /**
   * Validate phone number value
   * @param value
   * @return boolean
   */
  private isValidPhone(value: string): boolean{

    var response:boolean = false;
    if(value !== undefined){
      response = /(^[0-9\s]{10})$/.test(value.trim());
    }//end if
    
    return response
  }

  /**
   * Validate cvv
   * @param value
   * @return boolean
   */
  private isValidCvv(value: string): boolean{

    var response:boolean = false;
    if(value !== undefined){
      response = /(^[0-9]{3,4})$/.test(value);
    }//end if

    return response;
  }

}
