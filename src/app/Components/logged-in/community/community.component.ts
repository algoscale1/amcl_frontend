import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  starsCount1 = 4;
  starsCount2 = 5;
  starsCount3 = 5;
  starsCount4 = 3;

  constructor() { }

  ngOnInit() {
  }

}
