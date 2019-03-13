import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-indication-list',
  templateUrl: './indication-list.component.html',
  styleUrls: ['./indication-list.component.css']
})
export class IndicationListComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  indicationCtrl = new FormControl();
  filteredIndication: Observable<string[]>;
  indications: string[] = [];
  indicationList = [];

  @ViewChild('indicationInput') indicationInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private patientService: PatientService) {

    this.filteredIndication = this.indicationCtrl.valueChanges.pipe(
      startWith(null),
      map((indication: string | null) => indication ? this._filter(indication) : this.indicationList.slice()));

  }

  ngOnInit() {

    this.patientService.getAllIndication().subscribe(
      res => {
        this.indicationList = res;
        // console.log(this.indicationList)
      }
    )
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      console.log(event.input.value, event.value)

      if ((value || '')) {
        this.indications.push(value);
      }

      if (input) {
        input.value = '';
      }

      console.log(this.indications);

      this.indicationCtrl.setValue(null);
    }
  }

  // add(event) {
  //   if (!this.matAutocomplete.isOpen) {
  //     const input = event.input;
  //     const value = event.value;
  //     console.log(event.value)


  //     if ((value || '')) {
  //       console.log(value)
  //       this.indications.push(value);
  //     }

  //     if (input) {
  //       input.value = '';
  //     }

  //     console.log(this.indications);

  //     this.indicationCtrl.setValue(null);
  //   }
  // }

  remove(indication: string): void {
    const index = this.indications.indexOf(indication);

    if (index >= 0) {
      this.indications.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.indications.push(event.option.viewValue);
    this.indicationInput.nativeElement.value = '';
    this.indicationCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.indicationList.filter(indication => indication.toLowerCase().indexOf(filterValue) === 0);
  }

}
