// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ChartData, ChartOptions } from 'chart.js';
// import { ChartModule } from 'primeng/chart';

// @Component({
//   selector: 'convertedin-keyword-difficulty-chart',
//   standalone: true,
//   imports: [ChartModule],
//   templateUrl: './keyword-difficulty-chart.component.html',
//   styleUrls: ['./keyword-difficulty-chart.component.scss'],
// })
// export class KeywordDifficultyChartComponent {
//   data!: ChartData;

//   options!: ChartOptions;

//   ngOnInit() {
//     const documentStyle = getComputedStyle(document.documentElement);
//     const textColor = documentStyle.getPropertyValue('--text-color');

//     this.data = {
//       // labels:Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
//       datasets: [
//         {
//           data: [60, 60], // Adjust these values to change the green segment size
//           backgroundColor: ['#4caf50', '#e0e0e0'], // Green and light grey
//           borderWidth: 0,
//           hoverBackgroundColor:['#4caf50', '#e0e0e0'],
//         },
//       ],
//     };

//     this.options = {
//       responsive: true,
//       maintainAspectRatio: false,
//       animation: false,

//       scales: {},
//       cutout: '80%', // Adjust this value to change thickness (e.g., '50%', '70%', '90%')
//       plugins: {
//         legend: {
//           display: false,
//         },
//         tooltip: {
//           enabled: false,
//         },
//       },
//     } as any;
//   }
// }
