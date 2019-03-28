import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';

import { PatientService } from 'src/app/Services/patient.service';
import { SupplemetsComponent } from './supplemets/supplemets.component';

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
    { value: '0' },
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
  bloodTest = [];
  bloodNum = 1;
  initiatReview = false;
  cypTest = ['Yes', 'No', 'N/A'];
  reportedConcern = ['Overactive bladder', 'Insominia', 'Appetite Loss', 'Mood Disorders or Depression', 'None'];
  vaccines = ['Influenza Vaccine', 'Pneumococcal Vaccine', 'Herpes Zoster (Shingles) Vaccine', 'MMR Vaccine', 'Tdap Vaccine', 'Hepatits A/B: Optional', 'None'];
  option = ['Yes', 'No'];
  search_cond = '';
  search_med = '';
  supplement = [];

  constructor(private patientService: PatientService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private _fb: FormBuilder, public dialog: MatDialog) {

    // let getPatient = new Promise((resolve, rej) => {

    this.patientId = this.route.snapshot.paramMap.get('id');
    this.patientService.getPatient(this.patientId).subscribe(
      res => {
        this.patientInfo = res;
      }
    );

    // });

    // getPatient.then(res => {

    this.patientForm = this._fb.group({
      present: [],
      fname: [],
      lname: [],
      dob: [],
      gender: [],
      weight: [],
      heightFt: [],
      heightIn: [],
      marital_status: [],
      address: [],
      mailing_address: [],
      biling_address: [],
      profileImg: [''],
      pre_existing_conditions: [],
      medication_history: [],
      allergies: [],
      supliment_alcohol_caffiene_intake: [],
      cyp_genetic_test: [],
      self_reported_concerns: [],
      self_reported_concerns_notes: [],
      vaccines: [],
      additional_medications: [],
      additional_treatment: [],
      is_precription_taken_regularly: ['Yes'],
      recently_hospitalized: ['Yes'],
      med_filled: ['Yes'],
      adherence_notes: [],
      is_smoke: [],
      is_smoke_details: [],
      is_diabetic: ['yes'],
      blood_test: this._fb.array([
        this._fb.group({
          key: [],
          range: [],
          value: []
        })
      ]),
      glucose_level: []
    });

    // });


    this.InitialForm = new FormGroup({
      review: new FormControl('no'),
      history: new FormControl('manual')
    });
  }

  ngOnInit() {

    this.patientService.getAllIndication().subscribe(
      res => {
        this.indicationList = res;
        this.indicationList.shift();
        // console.log(this.indicationList)
      }
    );

    this.patientService.getBloodTest().subscribe(
      res => {
        this.bloodTest = res;
      }
    )

  };

  getReviewForm() {


    let firstName: string = this.patientInfo['name'];
    let height: string = this.patientInfo['height'];

    if (this.InitialForm.controls['review'].value == 'yes') {

      this.imgURL = this.patientInfo['profile_pic'].image;

      this.patientForm.patchValue({
        fname: firstName.split(' ', 1)[0],
        lname: firstName.split(' ', 2)[1],
        dob: this.patientInfo['dob'],
        gender: this.patientInfo['gender'],
        weight: this.patientInfo['weight'],
        heightFt: height.split('.', 1)[0],
        heightIn: height.split('.', 2)[1],
        marital_status: this.patientInfo['marital_status'],
        address: this.patientInfo['address'],
        mailing_address: this.patientInfo['mailing_address'],
        biling_address: this.patientInfo['biling_address'],
      });

      this.initiatReview = true;
      console.log(this.patientInfo)
    }
    else {
      this.initiatReview = false;
    }

  }

  get blood_test() {
    return this.patientForm.get('blood_test') as FormArray;
  };

  addAlias() {
    this.bloodNum++;
    this.blood_test.push(this._fb.group({
      key: [],
      range: [],
      value: []
    }));
  };

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
  };

  onselectIndication() {

    let data = {
      indication_id: this.patientForm.controls['pre_existing_conditions'].value
    }

    this.patientService.getDrugForEachIndication(data).subscribe(
      res => {
        this.drugList = res;
      }
    )
  };

  onSelectDrug(event) {
    // console.log(this.patientForm);

    if (event._selected) {

      if (event.value.food_interaction_questions) {

        const dialogRef = this.dialog.open(SupplemetsComponent, {
          width: '450px',
          data: event.value.food_interaction_questions
        });

        dialogRef.afterClosed().subscribe(result => {

          if (result == 'yes') {
            this.supplement.push(event.value.food_int_answer);
            // console.log(this.supplement)
            this.patientForm.controls['supliment_alcohol_caffiene_intake'].setValue(this.supplement);
            // console.log(this.patientForm['supliment_alcohol_caffiene_intake'])
          }
        });

      }
    }

    else if (!event._selected) {

      if (event.value.food_interaction_questions) {
        let index = this.supplement.indexOf(event.value.food_int_answer);
        if (index > -1) {
          this.supplement.splice(index, 1);
        }
        this.patientForm.controls['supliment_alcohol_caffiene_intake'].setValue(this.supplement);
        // console.log(this.patientForm['supliment_alcohol_caffiene_intake'])
      }
    }

  };

  onUpdate(data) {

    if (this.profileImg != undefined) {
      data.append('profileImage', this.profileImg);
    }

    let formdata = data;

    if (data.blood_test[0].key != undefined) {
      formdata.blood_test = formdata.blood_test.map(res => {
        return {
          key: res.key['key'],
          range: res.key['range'],
          value: res.value
        }
      })
    }

    formdata['name'] = formdata.fname + " " + formdata.lname;
    formdata['height'] = formdata.heightFt + "." + formdata.heightIn;
    for (let i = 0; i < formdata['medication_history'].length; i++) {
      formdata['medication_history'][i] = formdata['medication_history'][i]._id;
    }
    console.log(formdata)


    // this.router.navigate([this.router.url + '/generate_report']);

    this.patientService.updatePatient(this.patientId, formdata).subscribe(
      res => {
        this.snackBar.open(res, '', {
          duration: 2000
        })

        // this.ifEdit = false;
        this.router.navigate([this.router.url + '/generate_report']);

      }
    );


  };

}
