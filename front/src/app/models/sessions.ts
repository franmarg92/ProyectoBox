import { days } from "./days";
import { hours } from "./hours";
import { activity } from "./activity";

export interface Session {
    class_id: number;  
    id_activity: number;
    id_day: number;
    id_hour: number;
    available_spots: number;
    max_spots: number;
    is_available: boolean;
    activity: activity;  
    days: days;  
    hours: hours; 
}