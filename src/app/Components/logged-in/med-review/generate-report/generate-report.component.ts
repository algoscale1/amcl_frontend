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

  constructor(private patientService: PatientService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.patientId = this.route.snapshot.paramMap.get('id');
    this.patientService.getPatient(this.patientId).subscribe(
      res => {
        this.patientInfo = res;
        console.log(this.patientInfo);
      }
    );
  }

  hemoglobinChart = {
    "chart": {
      "theme": "fusion",
      "caption": "Hemoglobin",
      // "subcaption": "food.hsm.com",
      "lowerLimit": "0",
      "upperLimit": "40",
      "numberSuffix": "g/dl",
      "chartBottomMargin": "20",
      "valueFontSize": "11",
      "valueFontBold": "0"
    },
    // Gauge Data
    "colorRange": {
      "color": [{
        "minValue": "0",
        "maxValue": "15",
        "label": "Low",
      },
      {
        "minValue": "15",
        "maxValue": "30",
        "label": "Moderate",
      },
      {
        "minValue": "30",
        "maxValue": "40",
        "label": "High",
      }
      ]
    },
    "pointers": {
      "pointer": [{
        "value": "18"
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

  hematocritData = {
    "chart": {
      "theme": "fusion",
      "caption": "Hematocrit",
      // "subcaption": "food.hsm.com",
      "lowerLimit": "0",
      "upperLimit": "100",
      "numberSuffix": "%",
      "chartBottomMargin": "20",
      "valueFontSize": "11",
      "valueFontBold": "0"
    },
    // Gauge Data
    "colorRange": {
      "color": [{
        "minValue": "0",
        "maxValue": "35",
        "label": "Low",
      },
      {
        "minValue": "35",
        "maxValue": "70",
        "label": "Moderate",
      },
      {
        "minValue": "70",
        "maxValue": "100",
        "label": "High",
      }
      ]
    },
    "pointers": {
      "pointer": [{
        "value": "79"
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
  }

  neutrophilsData = {
    "chart": {
      "theme": "fusion",
      "caption": "Neutrophils/100 Leukocytes",
      // "subcaption": "food.hsm.com",
      "lowerLimit": "0",
      "upperLimit": "100",
      "numberSuffix": "%",
      "chartBottomMargin": "20",
      "valueFontSize": "11",
      "valueFontBold": "0"
    },
    // Gauge Data
    "colorRange": {
      "color": [{
        "minValue": "0",
        "maxValue": "35",
        "label": "Low",
      },
      {
        "minValue": "35",
        "maxValue": "70",
        "label": "Moderate",
      },
      {
        "minValue": "70",
        "maxValue": "100",
        "label": "High",
      }
      ]
    },
    "pointers": {
      "pointer": [{
        "value": "28"
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

  glucoseData = {
    "chart": {
      "theme": "fusion",
      "caption": "Blood glucose level for Type I Diabetes",
      // "subcaption": "food.hsm.com",
      "lowerLimit": "0",
      "upperLimit": "100",
      "numberSuffix": "%",
      "chartBottomMargin": "20",
      "valueFontSize": "10",
      "valueFontBold": "0"
    },
    // Gauge Data
    "colorRange": {
      "color": [{
        "minValue": "0",
        "maxValue": "35",
        "label": "Low",
      },
      {
        "minValue": "35",
        "maxValue": "70",
        "label": "Moderate",
      },
      {
        "minValue": "70",
        "maxValue": "100",
        "label": "High",
      }
      ]
    },
    "pointers": {
      "pointer": [{
        "value": "28"
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

}
