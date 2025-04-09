// import { Component } from '@angular/core';
// import { ChartModule } from 'primeng/chart';
// import { ChartData, ChartOptions } from 'chart.js';
// @Component({
//   selector: 'convertedin-keyword-chart',
//   standalone: true,
//   imports: [ChartModule],
//   templateUrl: './keyword-chart.component.html',
//   styleUrls: ['./keyword-chart.component.scss'],
// })
// export class KeywordChartComponent {
//   data!: ChartData;

//   options!: ChartOptions;

//   ngOnInit() {
//     const documentStyle = getComputedStyle(document.documentElement);
//     const textColor = documentStyle.getPropertyValue('--text-color');

//     this.data = {
//       // labels:Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
//       datasets: [
//         {
//           label: 'My First dataset',

//           backgroundColor: documentStyle.getPropertyValue(
//             '--map-ad-primary-color'
//           ),
//           borderColor: documentStyle.getPropertyValue('--map-ad-primary-color'),
//           data: [
//             65, 59, 80, 81, 56, 55, 40, 30, 70, 10, 65, 59, 80, 81, 56, 55, 40,
//             30, 70, 10, 65, 59, 80, 81, 56, 55, 40, 30, 70, 10, 2,
//           ],
//         },
//       ],
//       xLabels: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
//     };

//     this.options = {
//       responsive: true,
//       maintainAspectRatio: false,
//       // aspectRatio: 0.8,
//       plugins: {
//         legend: {
//           display: false,
//         },
//       },
//       scales: {
//         y: {
//           ticks: {
//             callback: function (value, index, values) {
//               // Customize the labels for each y-axis value
//               return value; // Example: appending ' units' to each value
//             },
//           },
//         },
//       },
//     };
//   }
// }
