import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class GlobalService {

  private errorSource        = new BehaviorSubject(false);
  private messageSource      = new BehaviorSubject('');
  private loadingSource      = new BehaviorSubject(false);

  public error       = this.errorSource.asObservable();
  public message     = this.messageSource.asObservable();
  public loading     = this.loadingSource.asObservable();

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * @param error 
   */
  public setError(error : boolean ) {
    this.errorSource.next(error);
  }

  /**
   * @param message 
   */
  public setMessage(message : string ) {
    this.messageSource.next(message);
  }

  /**
   * @param loading 
   */
  public setLoading(loading : boolean ) {
    this.loadingSource.next(loading);
  }
}
