export class Expense {
	constructor(
		public id:number,
		public description:string,
		public sum:number,
		public categoryId:number
	){}
}