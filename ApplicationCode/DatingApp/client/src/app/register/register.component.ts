import { Component, EventEmitter, Output, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  model: any = {};
  //@Input() usersFromHomeComponent: any;
  /*usersFromHomeComponent = input.required<any>();*/
  //@Output() cancelRegister = new EventEmitter();
  cancelRegister = output<boolean>();

  register() {
    console.log(this.model);
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => { console.log(error); }
    })
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
