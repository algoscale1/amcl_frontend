import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dosage-calculator',
  templateUrl: './dosage-calculator.component.html',
  styleUrls: ['./dosage-calculator.component.css', '../resources.component.css']
})
export class DosageCalculatorComponent implements OnInit {

  kg = ['Kg', 'Pound'];
  weight: number;
  weightUnit = 'Kg';
  dosageweightUnit = 'Kg';
  dosage: number;
  dosageUnit = 'micrograms';
  dosageUnitTemp = 'micrograms';
  grams = ['micrograms', 'miligrams', 'grams'];
  result;
  resultUnit = 'micrograms';
  resultUnitTemp = 'micrograms';

  constructor() { }

  ngOnInit() {
  }

  calculate() {

    if (this.weight != null && this.dosage != null) {

      let weightTemp = this.weight;
      let dosageTemp = this.dosage;

      if (this.weightUnit == 'Pound') {
        weightTemp = weightTemp * 0.453592;
      }

      if (this.dosageweightUnit == 'Pound') {
        dosageTemp = dosageTemp * 0.453592;
      }

      if (this.dosageUnit == 'miligrams') {
        dosageTemp = dosageTemp * 1000;
      }

      if (this.dosageUnit == 'grams') {
        dosageTemp = dosageTemp * 1000000;
      }

      this.result = weightTemp * dosageTemp;
      return this.result;
    }
  };

  weightUnitChange() {

    if (this.weightUnit == 'Kg') {
      this.weight = this.weight * 0.453592;
    }
    else {
      this.weight = this.weight * 2.20462;
    }
  };

  weightdosageUnitChange() {

    if (this.dosageweightUnit == 'Kg') {
      this.dosage = this.dosage * 0.453592;
    }
    else {
      this.dosage = this.dosage * 2.20462;
    }
  };

  dosageUnitChange() {

    if (this.dosageUnit == 'miligrams') {
      if (this.dosageUnitTemp == 'micrograms') {
        this.dosage = this.dosage / 1000;
      }
      else if (this.dosageUnitTemp == 'grams') {
        this.dosage = this.dosage * 1000;
      }
    }

    else if (this.dosageUnit == 'micrograms') {
      if (this.dosageUnitTemp == 'miligrams') {
        this.dosage = this.dosage * 1000;
      }
      else if (this.dosageUnitTemp == 'grams') {
        this.dosage = this.dosage * 1000000;
      }
    }

    else if (this.dosageUnit == 'grams') {
      if (this.dosageUnitTemp == 'miligrams') {
        this.dosage = this.dosage / 1000;
      }
      else if (this.dosageUnitTemp == 'micrograms') {
        this.dosage = this.dosage / 1000000;
      }
    }

    this.dosageUnitTemp = this.dosageUnit;

  };

  resultUnitChange() {

    if (this.resultUnit == 'miligrams') {
      if (this.resultUnitTemp == 'micrograms') {
        this.result = this.result / 1000;
      }
      else if (this.resultUnitTemp == 'grams') {
        this.result = this.result * 1000;
      }
    }
    else if (this.resultUnit == 'micrograms') {
      if (this.resultUnitTemp == 'miligrams') {
        this.result = this.result * 1000;
      }
      else if (this.resultUnitTemp == 'grams') {
        this.result = this.result * 1000000;
      }
    }

    else if (this.resultUnit == 'grams') {
      if (this.resultUnitTemp == 'miligrams') {
        this.result = this.result / 1000;
      }
      else if (this.resultUnitTemp == 'micrograms') {
        this.result = this.result / 1000000;
      }
    }

    this.resultUnitTemp = this.resultUnit;

  };

}
