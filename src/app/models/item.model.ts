export class Item {
  itemId!: number; 
  description: string = '';
  title: string= '';
  itemImage: any;
  userId: number= 0;
  subcategoryId: number= 0;
  statusId: number= 0;

  constructor(init?: Partial<Item>) {
    Object.assign(this, init);
  }
}
