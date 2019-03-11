import { Component, OnInit } from '@angular/core';

import { SearchService } from 'src/app/Services/search.service';
import { InteractionService } from 'src/app/Services/interaction.service';

@Component({
  selector: 'app-drug-interaction',
  templateUrl: './drug-interaction.component.html',
  styleUrls: ['./drug-interaction.component.css', '../resources.component.css']
})
export class DrugInteractionComponent implements OnInit {

  step = 0;
  dataLength: number;
  searchInput = '';
  searchData: [] = [];
  selectedDrug = '';
  brand_name = [];
  selectedDrugsData = [];
  interactionFound = false;
  noInteractionFound = false;
  min2 = false;
  interactionData = [];

  constructor(private searchService: SearchService, private intractionService: InteractionService) { }

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
    };
  };

  onSelectDrug() {
    for (let i = 0; i < this.dataLength; i++) {
      if (this.searchData[i]['_id'] == this.selectedDrug) {
        this.brand_name = this.brand_name.concat(this.searchData[i]['_id']);
        this.selectedDrugsData.push(this.searchData[i]);
      };
    };
  };

  removeDrug(index) {
    this.selectedDrugsData.splice(index, 1);
    this.brand_name.splice(index, 1);
  };

  onSearchClick() {

    if (this.brand_name.length > 1) {
      let data = {
        drugs: this.brand_name
      };
      console.log(data)

      this.intractionService.interationResult(data).subscribe(res => {
        this.interactionData = res;
        // console.log(res)

        if (res == '') {
          this.noInteractionFound = true;
          this.interactionFound = false;
          this.min2 = false;
        }
        else {
          this.interactionFound = true;
          this.noInteractionFound = false;
          this.min2 = false;
        }
      });
    }
    else {
      this.min2 = true;
      this.interactionFound = false;
      this.noInteractionFound = false;
    }
  };

}
