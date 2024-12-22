import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {

  baseurl = 'https://localhost:5001/api/';
  private http=inject(HttpClient);
  validationErrors: string[] = [];

get400Error() {
  this.http.get(this.baseurl + 'buggy/bad-request').subscribe({
    next: response => { console.log(response); },
    error: error => { console.log(error); }
  } 
  );
}

get401Error() {
  this.http.get(this.baseurl + 'buggy/auth').subscribe( {
    next: response => { console.log(response); },
    error: error => { console.log(error); }
  }
  );
}

get404Error() {
  this.http.get(this.baseurl + 'buggy/not-found').subscribe({
    next: response => { console.log(response); },
    error: error => { console.log(error); }
  }
  );
}

get500Error() {
  this.http.get(this.baseurl + 'buggy/server-error').subscribe({
    next: response => { console.log(response); },
    error: error => { console.log(error); }
  }
  );
}

get400ValidationError() {
  //note that the post method requires a body, so we pass an empty object to it as a parameter 
  this.http.post(this.baseurl + 'account/register', {}).subscribe({
    next: response => { console.log(response); },
    error: error => {
      console.log(error);
      //error.error is the object that contains the validation errors. We can loop through the object and push the errors to the validationErrors array or just assign the whole array.
      //Check on test-errors.compoenet.html to see how the validation errors are displayed
      this.validationErrors = error;
      }
  }
  );
}

}
