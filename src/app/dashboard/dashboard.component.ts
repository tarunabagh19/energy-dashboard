import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public selectedBrand = 'All';
  brands = ['All', 'Disney', 'BBC', 'Netflix'];
  likesDataByPlatform:any = {
    Instagram: [320, 180, 400],
    Twitter:   [210, 300, 250],
    Facebook:  [150, 120, 170],
    YouTube:   [500, 400, 450]
  };
  brandData: any = {
    'Disney': {
      pieChartData: {
        labels: ['Originals', 'Licensed Content', 'Live TV'],
        datasets: [
          { data: [45, 35, 20], backgroundColor: ['#cc65fe', '#e03c3c', '#f67b7b'] }
        ]
      },
      lineChartData: {
        labels: ['May 8', 'May 9', 'May 10', 'May 11'],
        datasets: [
          { label: 'Disney+', data: [8.2, 8.4, 8.3, 8.1], borderColor: '#113ccf', fill: false }
        ]
      }
    },
    'BBC': {
      pieChartData: {
        labels: ['News', 'Drama', 'Documentary'],
        datasets: [
          { data: [40, 30, 30], backgroundColor: ['#ffce56', '#e03c3c', '#f67b7b'] }
        ]
      },
      lineChartData: {
        labels: ['May 8', 'May 9', 'May 10', 'May 11'],
        datasets: [
          { label: 'BBC iPlayer', data: [7.9, 8.0, 8.1, 8.2], borderColor: '#cc65fe', fill: false }
        ]
      }
    },
    'Netflix': {
      pieChartData: {
        labels: ['Originals', 'Movies', 'Series'],
        datasets: [
          { data: [50, 30, 20], backgroundColor: ['#ff6384', '#e03c3c', '#f67b7b'] }
        ]
      },
      lineChartData: {
        labels: ['May 8', 'May 9', 'May 10', 'May 11'],
        datasets: [
          { label: 'Netflix', data: [8.0, 8.1, 8.0, 8.3], borderColor: '#e50914', fill: false }
        ]
      }
    }
  };

  pieChartData: any = null;
  piechartOfLikes:any = null;
  lineChartData: any = null;
  pieChartType: ChartType = 'pie';
  lineChartType: ChartType = 'line';

  ngOnInit() {
    this.pieChartData = {
      labels: ['Disney Originals', 'BBC News', 'Netflix Originals'],
      datasets: [
        { data: [45, 40, 50], backgroundColor: ['#36A2EB', '#2fd280', '#f0a6ee'] }
      ]
    };
    this.lineChartData = {
      labels: ['May 8', 'May 9', 'May 10', 'May 11'],
      datasets: [
        { label: 'Disney+', data: [8.2, 8.4, 8.3, 8.1], borderColor: '#113ccf', fill: false },
        { label: 'BBC iPlayer', data: [7.9, 8.0, 8.1, 8.2], borderColor: '#36a2eb', fill: false },
        { label: 'Netflix', data: [8.0, 8.1, 8.0, 8.3], borderColor: '#e50914', fill: false }
      ]
    };


    
  }
  onBrandChange() {
    if (this.selectedBrand === 'All') {
      this.pieChartData = {
        labels: ['Disney Originals', 'BBC News', 'Netflix Originals'],
        datasets: [
          { data: [45, 40, 50], backgroundColor: ['#36A2EB', '#2fd280', '#f0a6ee'] }
        ]
      };
      this.lineChartData = {
        labels: ['May 8', 'May 9', 'May 10', 'May 11'],
        datasets: [
          { label: 'Disney+', data: [8.2, 8.4, 8.3, 8.1], borderColor: '#113ccf', fill: false },
          { label: 'BBC iPlayer', data: [7.9, 8.0, 8.1, 8.2], borderColor: '#cc65fe', fill: false },
          { label: 'Netflix', data: [8.0, 8.1, 8.0, 8.3], borderColor: '#e50914', fill: false }
        ]
      };
    } else {
      this.pieChartData = this.brandData[this.selectedBrand].pieChartData;
      this.lineChartData = this.brandData[this.selectedBrand].lineChartData;
    }
  }


  platforms = ['Instagram', 'Twitter', 'Facebook', 'YouTube'];
  

  // Construct chart datasets dynamically
  getChartData() {
    return this.platforms.map(platform => ({
      labels: this.brands,
      datasets: [
        {
          label: `${platform} Likes`,
          data: this.likesDataByPlatform[platform],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    }));
  }
  barChartData = this.platforms.map((platform, index) => ({
    label: platform,
    data: this.likesDataByPlatform[platform],
    backgroundColor: this.getColor(index),
    stack: 'likesStack'
  }));

  barChartLabels = this.brands;
  barChartType: ChartType = 'bar';
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Overall Likes by Brand and Platform'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        position: 'top'
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  getColor(index: number): string {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];
    return colors[index % colors.length];
  }
  chartConfigs = this.getChartData();


  brandsCard = ['Disney', 'BBC', 'Netflix'];

  reachDataByPlatform:any = {
    Instagram: [1000, 800, 1200],
    Twitter:   [900, 1100, 1000],
    Facebook:  [700, 600, 750],
    YouTube:   [2000, 1800, 2100]
  };

  getBrandLikeData() {
    return this.brandsCard.map((brand, i) => {
      const platformBreakdown = this.platforms.map(platform => {
        const likes = this.likesDataByPlatform[platform][i];
        const reach = this.reachDataByPlatform[platform][i];
        const engagementRate = reach > 0 ? (likes / reach) * 100 : 0;
        return {
          platform,
          likes,
          reach,
          engagementRate: +engagementRate.toFixed(1)
        };
      });

      const totalLikes = platformBreakdown.reduce((sum, p) => sum + p.likes, 0);
      const topPlatform = platformBreakdown.reduce((max, p) => p.likes > max.likes ? p : max, platformBreakdown[0]);

      return {
        brand,
        totalLikes,
        platformBreakdown,
        topPlatform
      };
    });
  }

  brandCardData = this.getBrandLikeData();

  public radarChartLabels: string[] = ['Instagram', 'Twitter', 'Facebook', 'YouTube'];

public radarChartData = {
  labels: this.radarChartLabels,
  datasets: [
    {
      label: 'Disney',
      data: [32, 23.3, 21.4, 25.0],
      fill: true,
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
    },
    {
      label: 'BBC',
      data: [22.5, 27.3, 20.0, 22.2],
      fill: true,
      backgroundColor: 'rgba(54,162,235,0.2)',
      borderColor: 'rgba(54,162,235,1)',
    },
    {
      label: 'Netflix',
      data: [33.3, 25.0, 22.7, 21.4],
      fill: true,
      backgroundColor: 'rgba(255,206,86,0.2)',
      borderColor: 'rgba(255,206,86,1)',
    }
  ]
};

public radarChartType: ChartType = 'radar';


engagementData = [
  { brand: 'Disney',  Instagram: 32.0, Twitter: 23.3, Facebook: 21.4, YouTube: 25.0 },
  { brand: 'BBC',     Instagram: 22.5, Twitter: 27.3, Facebook: 20.0, YouTube: 22.2 },
  { brand: 'Netflix', Instagram: 33.3, Twitter: 25.0, Facebook: 22.7, YouTube: 21.4 }
];

displayedColumns: string[] = ['brand', 'Instagram', 'Twitter', 'Facebook', 'YouTube'];

}
