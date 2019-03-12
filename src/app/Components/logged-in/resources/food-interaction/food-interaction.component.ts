import { Component, OnInit } from '@angular/core';

import { SearchService } from 'src/app/Services/search.service';

@Component({
  selector: 'app-food-interaction',
  templateUrl: './food-interaction.component.html',
  styleUrls: ['./food-interaction.component.css', '../resources.component.css']
})
export class FoodInteractionComponent implements OnInit {

  dataLength: number;
  searchInput = '';
  searchData: [] = [];
  selectedDrug = '';
  drugData: [] = [];
  substances: [] = [];
  sideEffect: [] = [];
  step = 0;
  searchSubmit = false;

  constructor(private searchService: SearchService) { }

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

    // this.searchService.getSubstances().subscribe(res => {
    //   this.substances = res;
    // });

    if (this.selectedDrug) {
      this.searchService.drugDetails(this.selectedDrug).subscribe(res => {
        this.drugData = res;
        this.searchSubmit = true;
      });

    };
  };


}
