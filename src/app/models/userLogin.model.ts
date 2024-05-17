export class UserLogin {
    email! :string; 
    password! : string; 

  constructor(init?: Partial<UserLogin>) {
    Object.assign(this, init);
  }
 
}
