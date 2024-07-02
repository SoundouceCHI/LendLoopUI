export class LoanPeriod {
    startDate?: Date; 
  endDate?: Date;  

  constructor(init?: Partial<LoanPeriod>) {
    Object.assign(this, init);
  }
}
