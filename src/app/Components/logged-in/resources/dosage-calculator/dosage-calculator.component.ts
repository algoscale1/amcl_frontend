import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dosage-calculator',
  templateUrl: './dosage-calculator.component.html',
  styleUrls: ['./dosage-calculator.component.css', '../resources.component.css']
})
export class DosageCalculatorComponent implements OnInit {

  kg = ['Kg', 'Pound'];
  weight;
  weightUnit = 'Kg';
  dosage;
  dosageUnit = 'micrograms'
  grams = ['micrograms', 'miligrams', 'grams']

  constructor() { }

  ngOnInit() {
  }

}
