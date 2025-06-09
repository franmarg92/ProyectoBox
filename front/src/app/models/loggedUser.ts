export interface loggedUser {
  user_id : number;
  name: string;
  lastName: string;
  dni: number;
  date_of_birth: Date;
  email: string;
  Roles: Role[];
}


export interface Role{
    role_id :number,
    name: string
}