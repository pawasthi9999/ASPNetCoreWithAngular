import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent {
  error: any;

  constructor(private router: Router)
  {
    //this is the only way to get the error object from the navigation extras which are passed from _interceptors/error.interceptor.ts file
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }
}
