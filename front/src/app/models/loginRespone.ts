import { loggedUser } from "./loggedUser";


export interface loginResponse {
    success : boolean,
    message: string,
    token: string,
    user : loggedUser
}