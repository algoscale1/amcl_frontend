import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { RegisterService } from 'src/app/Services/register.service';
import { ErrorComponent } from '../log-in/error/error.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router, private snackBar: MatSnackBar, private registerService: RegisterService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      cPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  onRegister() {

    let data = {
      name: this.registerForm.controls['name'].value,
      email: this.registerForm.controls['email'].value,
      phone: this.registerForm.controls['phone'].value,
      password: this.registerForm.controls['password'].value
    };

    if (this.registerForm.controls['password'].value == this.registerForm.controls['cPassword'].value) {
      this.registerService.register(data).subscribe(
        res => {
          this.router.navigate(['/logIn']);
        },
        err => {
          this.snackBar.openFromComponent(ErrorComponent, {
            duration: 2000,
            data: err.message
          });
        }
      );
    }
    else {
      this.snackBar.openFromComponent(ErrorComponent, {
        duration: 2000,
        data: "Your Password didn't match Confirm Password"
      });
    }

  };

}
