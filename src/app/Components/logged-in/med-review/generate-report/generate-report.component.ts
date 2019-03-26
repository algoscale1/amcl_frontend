import { Component, OnInit } from '@angular/core';

import { PatientService } from 'src/app/Services/patient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  patientId = '';
  patientInfo = [];
  test = [];

  constructor(private patientService: PatientService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.patientId = this.route.snapshot.paramMap.get('id');
    let blood_test = new Promise((resolve, rej) => {
      this.patientService.getPatient(this.patientId).subscribe(
        res => {
          this.patientInfo = res;
          console.log(this.patientInfo);
          resolve(true);
        }
      );
    });

    blood_test.then(() => {
      this.patientInfo['blood_test'].forEach(element => {

        let range: string = element.range;

        let min_value = parseFloat(range.split('-', 2)[0]);
        let max_value = parseFloat(range.split('-', 2)[1])

        let low_max = min_value + (max_value - min_value) / 3;
        let mod_max = max_value - (max_value - min_value) / 3;

        this.test.push({
          "chart": {
            "theme": "fusion",
            "caption": element.key,
            "lowerLimit": range.split('-', 2)[0],
            "upperLimit": range.split('-', 2)[1],
            // "numberSuffix": "%",
            "chartBottomMargin": "20",
            "valueFontSize": "11",
            "valueFontBold": "0"
          },
          // Gauge Data
          "colorRange": {
            "color": [{
              "minValue": min_value,
              "maxValue": low_max,
              "label": "Low",
            },
            {
              "minValue": low_max,
              "maxValue": mod_max,
              "label": "Moderate",
            },
            {
              "minValue": mod_max,
              "maxValue": max_value,
              "label": "High",
            }
            ]
          },
          "pointers": {
            "pointer": [{
              "value": element.value
            }]
          },
          "annotations": {
            "origw": "400",
            "origh": "190",
            "autoscale": "1",
            "groups": [{
              "id": "range",
              "items": [{
                "id": "rangeBg",
                "type": "rectangle",
                "x": "$chartCenterX-115",
                "y": "$chartEndY-35",
                "tox": "$chartCenterX +115",
                "toy": "$chartEndY-15",
                "fillcolor": "#0075c2"
              },
              ]
            }]
          }
        });
      });

      // console.log(this.test)
    })

  }
}
