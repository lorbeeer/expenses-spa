import { Action } from "@ngrx/store";
import { Expense } from "../expense.model";

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export class AddExpense implements Action {
	readonly type = ADD_EXPENSE;
	constructor(public payload: Expense){};
}
export class EditExpense implements Action {
	readonly type = EDIT_EXPENSE;
	constructor(public payload:{index:number, expense:Expense}){};
}
export class DeleteExpense implements Action {
	readonly type = DELETE_EXPENSE;
	constructor(public payload: number){};
}

export type ExpenseActions = AddExpense | EditExpense | DeleteExpense;
