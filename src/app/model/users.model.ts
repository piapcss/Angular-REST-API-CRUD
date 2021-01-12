
export class Users {

  public id: number;
  public name: string;
  public email: string;
  public contact: string;

  constructor(id: number, name: string, email: string, contact: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.contact = contact;
  }
}
