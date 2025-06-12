export interface MenuItem {
    text:string;
    route?:string;
    class:string;
    event?: () => void; 

}