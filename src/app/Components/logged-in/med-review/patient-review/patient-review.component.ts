import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-patient-review',
  templateUrl: './patient-review.component.html',
  styleUrls: ['./patient-review.component.css', '../../add-patient/add-patient.component.css']
})
export class PatientReviewComponent implements OnInit {

  ifEdit = false;
  patientId;
  patientInfo: any = [];
  patientForm: FormGroup;
  InitialForm: FormGroup;
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
  name: String;
  height: String;
  profileImg: File;
  imgURL;
  indicationList = [];
  indications = [];
  drugList = [];

  constructor(private patientService: PatientService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    let getPatient = new Promise((resolve, rej) => {

      this.patientId = this.route.snapshot.paramMap.get('id');
      this.patientService.getPatient(this.patientId).subscribe(
        res => {
          this.patientInfo = res;
          resolve(true);
        }
      );

    });

    getPatient.then(res => {

      this.name = this.patientInfo['name'];
      this.height = this.patientInfo['height'];
      // console.log(this.patientInfo['profile_pic'].image)
      this.imgURL = this.patientInfo['profile_pic'].image;

      this.patientForm = new FormGroup({
        present: new FormControl(''),
        fname: new FormControl(this.name.split(" ", 2)[0]),
        lname: new FormControl(this.name.split(" ", 2)[1]),
        gender: new FormControl(this.patientInfo['gender']),
        weight: new FormControl(this.patientInfo['weight']),
        heightFt: new FormControl(this.height.split(".", 2)[0]),
        heightIn: new FormControl(this.height.split(".", 2)[1]),
        marital_status: new FormControl(this.patientInfo['marital_status']),
        address: new FormControl(this.patientInfo['address']),
        mailing_address: new FormControl(this.patientInfo['mailing_address']),
        biling_address: new FormControl(this.patientInfo['billing_address']),
        profileImg: new FormControl('')
      });
    });


    this.InitialForm = new FormGroup({
      review: new FormControl('yes'),
      history: new FormControl('manual')
    });
  }

  ngOnInit() {

    this.patientService.getAllIndication().subscribe(
      res => {
        this.indicationList = res;
        // console.log(this.indicationList)
      }
    )
  }

  onEdit() {
    this.ifEdit = true;
  }

  newProfile(event) {

    this.profileImg = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.profileImg);
    reader.onload = (e) => {
      this.imgURL = reader.result;
    }
  }

  onUpdate() {

    let data = new FormData();
    data.append('name', this.patientForm.controls['fname'].value + ' ' + this.patientForm.controls['lname'].value);
    data.append('gender', this.patientForm.controls['gender'].value);
    data.append('weight', this.patientForm.controls['weight'].value);
    data.append('height', this.patientForm.controls['heightFt'].value + '.' + this.patientForm.controls['heightIn'].value);
    data.append('marital_status', this.patientForm.controls['marital_status'].value);
    data.append('address', this.patientForm.controls['address'].value);
    data.append('mailing_address', this.patientForm.controls['mailing_address'].value);
    data.append('billing_address', this.patientForm.controls['biling_address'].value);
    // data.append('profileImage', this.profileImg);

    this.patientService.updatePatient(this.patientId, data).subscribe(
      res => {
        this.snackBar.open(res, '', {
          duration: 2000
        })

        this.ifEdit = false;
        // this.router.navigate(['/review/' + this.patientId], { skipLocationChange: true });
      }
    );
  };

  onselectIndication() {

    let data = {
      indication_id: this.indications
    }

    this.patientService.getDrugForEachIndication(data).subscribe(
      res => {
        this.drugList = res;
        // console.log(this.drugList);
      }
    )
  }

}
