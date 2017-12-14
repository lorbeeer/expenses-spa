import { Component } from '@angular/core';
import { ExpenseService } from './expense/expense.service';
import 'chart.js/src/chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ExpenseService]
})
export class AppComponent {

}
