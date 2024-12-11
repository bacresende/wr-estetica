import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, shareReplay, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../services/loading/loading.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  
  const loadingService = inject(LoadingService);

  loadingService.show();

  const headers = new HttpHeaders({
    "Content-Type": "application/json",
    "X-Parse-Application-Id": environment.appId,
    "X-Parse-REST-API-Key": environment.apiKey,
  });
  
  const reqClone = req.clone({headers});

  return next(reqClone).pipe(
    shareReplay(),
    finalize(() => loadingService.hide()),
    catchError((e: HttpErrorResponse) => {
      if (e.status === 0) {
        alert('Sem conxão com a internet');
      }
      

        let msg = e.error.error;
        console.log(`catchError ${msg}`);
        return throwError(() => new Error(msg));

    }));
};
