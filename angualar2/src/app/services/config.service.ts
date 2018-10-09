import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../entities/config';

@Injectable()

export class ConfigService {

  public initialized : boolean = false
  public config      : Config  = new Config()
  
  /**
   * End point rest service
   */
  private endPoint = '/config/config.json';

  /**
   * Constructor service
   * @param http 
   */
  constructor(private http: HttpClient) {}

  /**
   * Load app config
   */
  public loadAppConfig() {
    let date = new Date();
    const id : number = date.getTime() 
    const url = `${this.endPoint}?ts=${id}`
    return this.http.get<Config>(url)
      .toPromise()
      .then(data => {
        this.config      = data
        this.initialized = true
      });
  }

  /**
   * Get config data
   */
  public getConfig() {
    return this.config;
  }
}