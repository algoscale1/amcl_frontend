import { Component, OnInit } from '@angular/core';

import { SearchService } from 'src/app/Services/search.service';
import { SubstitutionService } from 'src/app/Services/substitution.service';

@Component({
  selector: 'app-drug-substitution',
  templateUrl: './drug-substitution.component.html',
  styleUrls: ['./drug-substitution.component.css', '../resources.component.css']
})
export class DrugSubstitutionComponent implements OnInit {

  newDataLength: number;
  newSearchInput = '';
  newSearchData: [] = [];
  newSelectedDrug = '';
  newSelectedDrugData = [];
  new_rxcui = [];
  dataLength: number;
  searchInput = '';
  searchData: [] = [];
  selectedDrug = '';
  old_brand_name = [];
  new_brand_name = '';
  new_substances_id = [];
  selectedDrugsData = [];
  substituteResult = [];
  interactionFound = false;
  noInteractionFound = false;
  spin = false;

  constructor(private searchService: SearchService, private substituteService: SubstitutionService) { }

  ngOnInit() {
  }

  onNewSearch() {
    let data = {
      search: this.newSearchInput
    };

    if (this.newSearchInput.length > 2) {
      this.searchService.brandSearch(data).subscribe(res => {
        this.newSearchData = res;
        this.newDataLength = this.newSearchData.length;
      });
    }
  };

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

  onNewDrugSelect() {

    this.searchService.drugDetails(this.newSelectedDrug).subscribe(res => {
      this.newSelectedDrugData = res;
    });

  };

  onSelectDrug() {
    for (let i = 0; i < this.dataLength; i++) {
      if (this.searchData[i]['_id'] == this.selectedDrug) {
        this.old_brand_name = this.old_brand_name.concat(this.searchData[i]['_id']);
        this.selectedDrugsData.push(this.searchData[i]);
      };
    };
  };

  removeDrug(index) {
    this.selectedDrugsData.splice(index, 1);
    this.old_brand_name.splice(index, 1);
  };

  onSearchClick() {

    let data = {
      new_drug: this.newSelectedDrugData['drug_information'].id,
      old_drugs: this.old_brand_name,
    };

    if (this.newSelectedDrugData != null && this.old_brand_name) {
      this.spin = true;
    }


    this.substituteService.substituteResult(data).subscribe(res => {
      this.substituteResult = res;
      // console.log(this.substituteResult);
      this.spin = false;

      if (res.interactions == '') {
        this.noInteractionFound = true;
      }
      else {
        this.interactionFound = true;
      }
    });

  };

}
