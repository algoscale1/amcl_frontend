import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SearchService } from 'src/app/Services/search.service';
import { SideEffectsComponent } from './side-effects/side-effects.component';

@Component({
  selector: 'app-drug-info',
  templateUrl: './drug-info.component.html',
  styleUrls: ['./drug-info.component.css', '../resources.component.css']
})
export class DrugInfoComponent implements OnInit {

  dataLength: number;
  searchInput = '';
  searchData: [] = [];
  selectedDrug = '';
  drugData: [] = [];
  substances: [] = [];
  sideEffect: [] = [];
  step = 0;
  searchSubmit = false;

  constructor(private searchService: SearchService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onSearch() {
    let data = {
      search: this.searchInput
    };

    if (this.searchInput.length > 2) {
      this.searchService.brandSearch(data).subscribe(res => {
        this.searchData = res;
        this.dataLength = this.searchData.length;
      });
    }
  };

  onSearchClick() {

    if (this.selectedDrug) {
      this.searchService.drugDetails(this.selectedDrug).subscribe(res => {
        this.drugData = res;
        // console.log(this.drugData);
        this.searchSubmit = true;
      });

    };
  };

  getDrug(id) {

    this.searchService.sideEffects(id).subscribe(res => {
      this.sideEffect = res;
      // console.log(this.sideEffect)

      const dialogRef = this.dialog.open(SideEffectsComponent, {
        width: '500px',
        data: { drug: this.sideEffect, class: id }
      });

      // dialogRef.afterClosed().subscribe(result => { });
    });
  };

}
