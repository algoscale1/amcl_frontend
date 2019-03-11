import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AddPatientService } from 'src/app/Services/add-patient.service';
import { ErrorComponent } from '../../log-in/error/error.component';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  profile_comp: String = '70%';
  url = '../../../../assets/images/1.jpeg';
  ft = [
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' },
    { value: '6' },
    { value: '7' },
    { value: '8' },
    { value: '9' }
  ];
  inch = [
    { value: '1' }, { value: '2' },
    { value: '3' }, { value: '4' },
    { value: '5' }, { value: '6' },
    { value: '7' }, { value: '8' },
    { value: '9' }, { value: '10' },
    { value: '11' }, { value: '12' },
  ];
  gender = [
    { value: 'Male' },
    { value: 'Female' }
  ];
  marital = [
    { value: 'Married' },
    { value: 'Single' }
  ];
  billingAdd = true;

  patientForm: FormGroup;

  constructor(private addPatientService: AddPatientService, private router: Router, private snackBar: MatSnackBar) {
    this.patientForm = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      heightFt: new FormControl('', Validators.required),
      heightIn: new FormControl('', Validators.required),
      marital_status: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      mailing_address: new FormControl('', Validators.required),
      billAddChange: new FormControl('yes'),
      biling_address: new FormControl('')
    });
  }

  ngOnInit() {
  }

  ChangBillingAddress() {
    if (this.patientForm.controls['billAddChange'].value == 'no') {
      this.billingAdd = false;
    }
    else {
      this.billingAdd = true;
    }
  }

  onSubmit() {

    this.patientForm.controls['biling_address'].setValue(this.patientForm.controls['mailing_address'].value);

    let data = {
      name: this.patientForm.controls['fname'].value + ' ' + this.patientForm.controls['lname'].value,
      gender: this.patientForm.controls['gender'].value,
      weight: this.patientForm.controls['weight'].value,
      height: this.patientForm.controls['heightFt'].value + '.' + this.patientForm.controls['heightIn'].value,
      marital_status: this.patientForm.controls['marital_status'].value,
      address: this.patientForm.controls['address'].value,
      mailing_address: this.patientForm.controls['mailing_address'].value,
      billing_address: this.patientForm.controls['biling_address'].value
    };

    this.addPatientService.addPatient(data).subscribe(
      res => {
        this.snackBar.openFromComponent(ErrorComponent, {
          duration: 3000,
          data: 'Patient Added!'
        });

        this.router.navigate(['/review_list']);
      },
      err => { }
    )

  };

}
