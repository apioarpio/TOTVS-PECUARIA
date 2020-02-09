import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";

@Component({
  selector: 'pecChart-animais-raca-detail',
  templateUrl: './animais-raca-detail.component.html',
  styleUrls: ['./animais-raca-detail.component.scss']
})
export class AnimaisRacaDetailComponent implements OnInit {

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Nelore', 'Angus', 'Composto'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgb(122,73,58)', 'rgba(0,255,0,0.3)', 'rgba(16,51,20,0.3)'],
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
