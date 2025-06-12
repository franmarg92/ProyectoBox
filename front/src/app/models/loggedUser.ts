export interface loggedUser {
  user_id : number;
  name: string;
  lastName: string;
  dni: number;
  date_of_birth: Date;
  email: string;
  role: string;
  expirationDate?: Date | null; 
  isPaid?: boolean; 
}


export interface Role{
    role_id :number,
    name: string
}