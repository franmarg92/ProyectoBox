export interface CreateSession {
  class_id: number;
  id_day: number;
  id_hour: number;
  max_spots: number;
  available_spots: number;
  is_available: boolean;
}
