import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { LogInService } from 'src/app/Services/log-in.service';
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private router: Router, private logInService: LogInService, private snackBar: MatSnackBar) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    let data = {
      email: this.signInForm.controls['email'].value,
      password: this.signInForm.controls['password'].value
    };

    this.logInService.logIn(data).subscribe(
      res => {
        // console.log(res);
        this.router.navigate(['/community']);
      },
      err => {
        if (err == 401) {
          this.snackBar.openFromComponent(ErrorComponent, {
            duration: 2000,
            data: 'Your Email or Password is wrong'
          });
        };
      }
    );
  };
}