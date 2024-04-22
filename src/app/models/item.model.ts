export class Item {
    itemId!: number;
  description!: string;
  title!: string;
  itemImage!: Uint8Array;
  userId!: number;
  subcategoryId!: number;
  statusId!: number;

  constructor(init?: Partial<Item>) {
    Object.assign(this, init);
  }
}
