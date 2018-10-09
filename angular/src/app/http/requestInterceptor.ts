import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { GlobalService } from '../services/global.service';
 
@Injectable()

export class RequestInterceptor implements HttpInterceptor {

  /**
   * 
   */
  private requests: HttpRequest<any>[] = [];

  /**
   * Constructor
   * @param globalService
   */
  constructor(
      private globalService: GlobalService
  ) {
  }

  /**
   * Remove request loading
   * @param req 
   */
  private removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }//end if
    this.globalService.setLoading(this.requests.length > 0);
  }

  /**
   * Intercept 
   * @param req 
   * @param next 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.globalService.setLoading(true);
    let reqClone = req.clone();

    return Observable.create( observer => {
      const subscription = next.handle(reqClone)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          (error : HttpErrorResponse) => {
            if(error instanceof HttpErrorResponse){
              let message = 'Existe un error'
              this.globalService.setError(true)
              this.globalService.setMessage(message)
              this.globalService.setLoading(false)
            }
            this.removeRequest(req); observer.error(error);
          },
          () => {
            this.removeRequest(req); 
            observer.complete(); 
          }
        );
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}