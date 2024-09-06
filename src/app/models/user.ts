export class User {
  id: number = 0;
  email: string = '';
  name: string = '';
  role: string = '';

  constructor(id: number, email: string, name: string, role: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
  }
}
