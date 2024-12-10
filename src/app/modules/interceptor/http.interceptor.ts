import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, shareReplay, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  
  const headers = new HttpHeaders({
    "Content-Type": "application/json",
    "X-Parse-Application-Id": environment.appId,
    "X-Parse-REST-API-Key": environment.apiKey,
  });
  
  const reqClone = req.clone({headers});

  return next(reqClone).pipe(
    shareReplay(),
    catchError((e: HttpErrorResponse) => {
      if (e.status === 0) {
        alert('Sem conxão com a internet');
      }

        let msg = e.error.error;
        console.log(`catchError ${msg}`);
        return throwError(() => new Error(msg));

    }));
};
