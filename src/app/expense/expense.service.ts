import { Injectable, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Expense } from './expense.model';
import * as ExpenseActions from './store/expense.actions'
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ExpenseService {
	id = 2;
	editIndex:number;
	editMode = false;
	sendExpense:Subject<Expense> = new Subject(); 
	showForm:Subject<string> = new Subject(); 
	
	constructor (private store:Store<{expense: {expenses: Expense[]}}>){}

	addExpense(data:{description:string, sum:number, categoryId:number}){
		const item = new Expense(this.id+1, data.description, data.sum, data.categoryId);
		this.store.dispatch(new ExpenseActions.AddExpense(item));
	}
	startEditExpense(index:number, expense: Expense){
		this.editIndex = index;
		this.editMode = true;
		this.sendExpense.next(expense);
		this.showForm.next('block');
	}
	startAddExpense(){
		this.showForm.next('block');
	}
	cancelEditExpense(){
		this.editMode = false;
	}
	
	editExpense(data:{description:string, sum:number, categoryId:number}){
		const expense = new Expense(this.editIndex, data.description, data.sum, data.categoryId);
		this.store.dispatch(new ExpenseActions.EditExpense({index: this.editIndex, expense: expense}));
		this.editMode = false;
	}
	deleteExpense(){
		if (this.editMode) {
			this.store.dispatch(new ExpenseActions.DeleteExpense(this.editIndex));
			this.editMode = false;
		}
	}
}