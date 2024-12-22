import { Component, inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras } from '@angular/router';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if(error.error.errors) {
              const modalStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modalStateErrors.push(error.error.errors[key]);
                }
              }
              throw modalStateErrors.flat();
            }
            else
            {
              toastr.error(error.error, error.status);
            }
            break;
          case 401:
            toastr.error( 'Unauthorized',error.status);
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            //passing whole error object to the server-error component to display the error message on the page using the navigation extras object 
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error('Something unexpected went wrong');
            console.error(error);
            break;
        }
      }
      //return throwError(error);
      throw error;
    })
  );

};
