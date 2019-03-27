import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AccountComponent } from '../account.component';
import { DoctorAccountService } from 'src/app/Services/doctor-account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  editForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AccountComponent>,
    @Inject(MAT_DIALOG_DATA) public details: any, private doctorService: DoctorAccountService, private snackBar: MatSnackBar) {

    this.editForm = new FormGroup({
      name: new FormControl(this.details.name),
      phone: new FormControl(this.details.phone)
    });
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(data) {
    console.log(data);

    this.doctorService.editAccount(data, this.details._id).subscribe(
      res => {
        this.snackBar.open('Your Account was updated', '', {
          duration: 2000,
        });

        this.dialogRef.close();
      }
    )
  };

}
