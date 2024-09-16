export class User {
  id: number = 0;
  email: string = '';
  name: string = '';
  role: string = '';
  description: string | null = "";
  website: string | null = "";
  imgUrl: string | null = "";

  constructor(id: number, email: string, name: string, role: string, description: string, website: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
    this.description = this.description;
    this.website = website;
  }
}
