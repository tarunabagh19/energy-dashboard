import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedRegion: string = '';
  regions: string[] = ['North', 'South', 'East', 'West'];

  pieChartType: ChartType = 'pie';
  lineChartType: ChartType = 'line';
  radarChartType: ChartType = 'radar';
  barChartType: ChartType = 'bar';

  pieChartData!: ChartConfiguration<'pie'>['data'];
  lineChartData!: ChartConfiguration<'line'>['data'];
  radarChartData!: ChartConfiguration<'radar'>['data'];
  barChartData: any;
  barChartLabels: string[] = [];
  barChartOptions: any = { responsive: true };

efficiencyData = [
  { region: 'North America', Solar: 18, Wind: 35, Hydro: 45, Thermal: 33 },
  { region: 'Europe',       Solar: 20, Wind: 40, Hydro: 50, Thermal: 30 },
  { region: 'Asia',         Solar: 15, Wind: 30, Hydro: 55, Thermal: 38 },
  { region: 'South America',Solar: 17, Wind: 25, Hydro: 60, Thermal: 28 },
  { region: 'Africa',       Solar: 16, Wind: 22, Hydro: 48, Thermal: 25 },
  { region: 'Australia',    Solar: 21, Wind: 37, Hydro: 52, Thermal: 31 }
];  

  regionCardData: any[] = [];
  chartConfigs: any[] = [];
  platforms: string[] = ['Solar', 'Wind', 'Hydro', 'Thermal'];

  displayedColumns: string[] = ['region', 'Solar', 'Wind', 'Hydro', 'Thermal'];
  engagementData = [
    { region: 'North', Solar: 72, Wind: 68, Hydro: 60, Thermal: 55 },
    { region: 'South', Solar: 65, Wind: 70, Hydro: 58, Thermal: 60 },
    { region: 'East', Solar: 60, Wind: 63, Hydro: 70, Thermal: 50 },
    { region: 'West', Solar: 68, Wind: 75, Hydro: 66, Thermal: 58 }
  ];

  ngOnInit(): void {
    this.selectedRegion = this.regions[0];
    this.onRegionChange();
  }

  onRegionChange(): void {
    this.pieChartData = {
      labels: ['Solar', 'Wind', 'Hydro', 'Thermal'],
      datasets: [{
        data: [30, 25, 20, 25],
        backgroundColor: ['#fbc02d', '#4caf50', '#0288d1', '#ff7043']
      }]
    };

    this.lineChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Energy Output (MW)',
          data: [120, 135, 150, 140, 160],
          borderColor: '#42a5f5',
          fill: false
        }
      ]
    };

    this.radarChartData = {
      labels: ['Solar', 'Wind', 'Hydro', 'Thermal'],
      datasets: [
        {
          label: 'Efficiency (%)',
          data: [85, 78, 75, 60],
          backgroundColor: 'rgba(77, 182, 172, 0.2)',
          borderColor: '#4db6ac'
        }
      ]
    };

    this.barChartData = [
      {
        label: 'Energy Produced (GWh)',
        data: [400, 350, 300, 280],
        backgroundColor: ['#fbc02d', '#4caf50', '#0288d1', '#ff7043']
      }
    ];

    this.barChartLabels = ['Solar', 'Wind', 'Hydro', 'Thermal'];

    this.regionCardData = [
  {
    region: 'North',
    totalOutput: 1200,
    topSource: { source: 'Solar', output: 500 },
    sourceBreakdown: [
      { source: 'Solar', output: 500, capacity: 700, efficiencyRate: 71 },
      { source: 'Wind', output: 300, capacity: 480, efficiencyRate: 63 },
      { source: 'Hydro', output: 250, capacity: 430, efficiencyRate: 58 },
      { source: 'Thermal', output: 150, capacity: 400, efficiencyRate: 38 }
    ]
  },
  {
    region: 'South',
    totalOutput: 1100,
    topSource: { source: 'Wind', output: 400 },
    sourceBreakdown: [
      { source: 'Solar', output: 300, capacity: 500, efficiencyRate: 60 },
      { source: 'Wind', output: 400, capacity: 580, efficiencyRate: 69 },
      { source: 'Hydro', output: 250, capacity: 460, efficiencyRate: 54 },
      { source: 'Thermal', output: 150, capacity: 420, efficiencyRate: 36 }
    ]
  },
  {
    region: 'East',
    totalOutput: 1250,
    topSource: { source: 'Hydro', output: 450 },
    sourceBreakdown: [
      { source: 'Solar', output: 280, capacity: 460, efficiencyRate: 61 },
      { source: 'Wind', output: 320, capacity: 500, efficiencyRate: 64 },
      { source: 'Hydro', output: 450, capacity: 620, efficiencyRate: 73 },
      { source: 'Thermal', output: 200, capacity: 450, efficiencyRate: 44 }
    ]
  },
  {
    region: 'West',
    totalOutput: 1300,
    topSource: { source: 'Wind', output: 500 },
    sourceBreakdown: [
      { source: 'Solar', output: 350, capacity: 550, efficiencyRate: 64 },
      { source: 'Wind', output: 500, capacity: 640, efficiencyRate: 78 },
      { source: 'Hydro', output: 300, capacity: 480, efficiencyRate: 62 },
      { source: 'Thermal', output: 150, capacity: 410, efficiencyRate: 37 }
    ]
  }
];


    this.chartConfigs = this.platforms.map(source => {
      return {
        labels: ['North', 'South', 'East', 'West'],
        datasets: [
          {
            label: source + ' Output (GWh)',
            data: [300, 280, 250, 260],
            backgroundColor: '#90caf9'
          }
        ]
      };
    });
  }
}
