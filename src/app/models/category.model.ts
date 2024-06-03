export class Category {
    categoryId? : number; 
    categoryName? : string; 

  constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
}
