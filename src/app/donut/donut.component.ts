import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../expense/expense.model';
import { Category } from '../expense/category.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit {
  expenseState: Observable<{expenses: Expense[], categories: Category[]}>;
  colorArray=[];
  
  public doughnutChartData:number[]=[];
  public donutColors=[];
  public doughnutChartLabels:string[]=[];
  public chartClicked(e:any):void {
    console.log(e);
  }
  public chartHovered(e:any):void {
    console.log('hovered!');
  }
  
  constructor(private store:Store<{expense:{expenses: Expense[], categories: Category[]}}>) { }
  ngOnInit(){
    this.expenseState = this.store.select('expense');
    this.expenseState.subscribe(
      (state) => {
        this.doughnutChartLabels=[];
        this.doughnutChartData=[];
        this.donutColors=[];
        let colorArray=[];

        state.categories.forEach(
          (category) => {
            let summa = 0;
            state.expenses.forEach(
              (exp) => {
                if ( exp.categoryId == category.id){
                  summa += exp.sum;
                }
              }
            );
            
              this.doughnutChartLabels.push(category.name);
              this.doughnutChartData.push(summa);
              
              switch (category.color) {
                case 'primary':
                  colorArray.push('#007bff');
                  break;
                case 'success':
                  colorArray.push('#28a745');

                  break;
                case 'warning':
                  colorArray.push('#ffc107');

              }
            
          }
        );
        this.donutColors = [{ backgroundColor: colorArray}];
      }
    );
  }
}
