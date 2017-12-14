import * as ExpenseActions from './expense.actions';
import { Expense } from "../expense.model";
import { Category } from '../category.model';

const initialState = {
	expenses: [
		new Expense(1,'Buy tickets', 200, 1),
		new Expense(2, 'Buy coctails', 150, 2),
		new Expense(2, 'Buy glasses', 150, 3),
	],
	categories: [
		new Category(1,'Travel', 'fa fa-plane', 'primary'),
		new Category(2, 'Drinks', 'fa fa-cutlery', 'warning'),
		new Category(3, 'Home', 'fa fa-home', 'success')
	]
}

export function expenseReducer(state = initialState, action: ExpenseActions.ExpenseActions){
	switch(action.type){
		case ExpenseActions.ADD_EXPENSE:
			return {
				...state,
				expenses: [...state.expenses, action.payload]
			}
		case ExpenseActions.EDIT_EXPENSE:
			const expenses = [...state.expenses];
			const expense = state.expenses[action.payload.index];
			const updatedExpense = {...expense, ...action.payload.expense};
			expenses[action.payload.index] = updatedExpense;
			return {
				...state,
				expenses: expenses
			}
		case ExpenseActions.DELETE_EXPENSE:
			const oldArray = [...state.expenses];
			oldArray.splice(action.payload, 1);
			return {
				...state,
				expenses: oldArray
			}
		default:
			return state;
	}
}