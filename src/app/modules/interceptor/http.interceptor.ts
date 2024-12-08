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
    retry({ count: 2, delay: 2000 }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        alert('Sem conxão com a internet');
      }
      return throwError(() => error)
    }));
};
