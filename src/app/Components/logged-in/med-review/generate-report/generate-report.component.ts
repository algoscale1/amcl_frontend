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
  interactions: [];
  test = [];
  glucose_value;
  glucose_level;
  glucose_level_means = '';

  constructor(private patientService: PatientService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.patientId = this.route.snapshot.paramMap.get('id');
    let blood_test = new Promise((resolve, rej) => {
      this.patientService.generateReport(this.patientId).subscribe(
        res => {
          this.patientInfo = res['patient_details'];
          this.interactions = res['interaction'];
          this.glucose_value = parseFloat(this.patientInfo['glucose_level']);
          console.log(this.patientInfo);
          console.log(this.interactions)
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

      this.glucose_level = {
        "chart": {
          "theme": "fusion",
          "caption": "Glucose Level",
          "lowerLimit": 0,
          "upperLimit": 180,
          // "numberSuffix": "%",
          "chartBottomMargin": "20",
          "valueFontSize": "11",
          "valueFontBold": "0"
        },
        // Gauge Data
        "colorRange": {
          "color": [
            {
              "minValue": 0,
              "maxValue": 60,
              "label": "Low",
            },
            {
              "minValue": 60,
              "maxValue": 120,
              "label": "Moderate",
            },
            {
              "minValue": 120,
              "maxValue": 180,
              "label": "High",
            }
          ]
        },
        "pointers": {
          "pointer": [{
            "value": this.glucose_value
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
      };

      if (this.glucose_value <= 60) {
        this.glucose_level_means = 'Hypoglycemic(Low blood glucose)';
      }
      else if (this.glucose_value > 60 && this.glucose_value <= 80) {
        this.glucose_level_means = 'Below Normal';
      }
      else if (this.glucose_value > 80 && this.glucose_value <= 100) {
        this.glucose_level_means = 'Normal';
      }
      else if (this.glucose_value > 100 && this.glucose_value <= 120) {
        this.glucose_level_means = 'Above Normal';
      }
      else if (this.glucose_value > 120) {
        this.glucose_level_means = 'Hyperglycemic(High blood glucose)';
      }

    })

  }


}
