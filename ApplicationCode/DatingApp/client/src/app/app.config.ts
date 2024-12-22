import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

import { withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './_interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    //provideHttpClient(),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right'
    })
  ]
};
