import { Component, OnInit, Input } from '@angular/core';
import { Expense } from './expense.model';
import { ExpenseService } from './expense.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Category } from './category.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styles: [`
   .round {
    width: 2.5rem;
   }
  `]
})
export class ExpenseComponent implements OnInit {
  @Input() expense: Expense;
  @Input() index: number;
  expenseState:Observable<{expenses:Expense[], categories: Category[]}>
  fa: string;
  color: string;
  constructor(private expenseService:ExpenseService,
              private store:Store<{expense:{expenses:Expense[], categories: Category[]}}>) { }

  ngOnInit() {
    this.expenseState = this.store.select('expense');
    this.expenseState.subscribe(
      (state) => {
        this.fa = state.categories.find(
          (ctg) => {
            return ctg.id == this.expense.categoryId
          }
        ).fa;
        this.color = state.categories.find(
          (ctg) => {
            return ctg.id == this.expense.categoryId
          }
        ).color;
      });
  }
  onStartEdit(){
    this.expenseService.startEditExpense(this.index, this.expense);
  }
}
