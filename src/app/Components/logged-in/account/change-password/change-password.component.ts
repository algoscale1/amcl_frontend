import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AccountComponent } from '../account.component';
import { DoctorAccountService } from 'src/app/Services/doctor-account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AccountComponent>,
    @Inject(MAT_DIALOG_DATA) public details: any, private doctorService: DoctorAccountService, private snackBar: MatSnackBar) {

    this.passwordForm = new FormGroup({
      old_password: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

    console.log(this.details._id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(data) {
    console.log(data);

    this.doctorService.editAccount(data, this.details._id).subscribe(
      res => {
        this.snackBar.open('Your Password was changed', '', {
          duration: 2000,
        });

        this.dialogRef.close();
      }
    )
  };

}
