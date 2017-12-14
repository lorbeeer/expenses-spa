import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { ExpenseService } from '../expense/expense.service';
import { Store } from '@ngrx/store';
import { Expense } from '../expense/expense.model';
import { Category } from '../expense/category.model';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styles: [`
    .fallback {
      background-color: rgba(0, 0, 0, 0.6);
      position: fixed;
      top:0;
      left:0;
      width:100%;
      height: 100vh;
    }
  `]
})
export class ExpenseFormComponent implements OnInit {
  @ViewChild('f')  form:NgForm;
  displayForm = 'none';
  expenseState:Observable<{expenses: Expense[], categories: Category[]}>;

  constructor(
    private expenseService: ExpenseService,
    private store:Store<{expense: {expenses: Expense[], categories: Category[]}}>
    ) { }

  ngOnInit() {
    this.expenseState = this.store.select('expense');
    this.expenseService.sendExpense.subscribe(
      (ex: Expense) => this.form.setValue({description: ex.description, sum: ex.sum , categoryId: ex.categoryId})
    );
    this.expenseService.showForm.subscribe(
      (str) => this.displayForm = str
    )
  }

  onSubmit(f:NgForm){
    if (this.expenseService.editMode) {
      this.expenseService.editExpense(f.value);
    }else{
      this.expenseService.addExpense(f.value);
    }
    this.displayForm = 'none';
    f.reset();
  }
  onDelete(){
    this.expenseService.deleteExpense();
    this.displayForm = 'none';
    this.form.reset();
  }

  onCancel(){
    this.expenseService.cancelEditExpense();
    this.displayForm = 'none';
    this.form.reset();
  }
}
