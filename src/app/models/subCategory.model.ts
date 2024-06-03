export class SubCategory {
    subcategoryId? : number; 
    subcategoryName? : number; 
    categoryId?: number ; 

  constructor(init?: Partial<SubCategory>) {
    Object.assign(this, init);
  }
}
