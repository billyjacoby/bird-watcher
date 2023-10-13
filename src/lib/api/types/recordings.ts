export interface RecordingResponse {
  day: string;
  events: number;
  hours?: HoursEntity[] | null;
}

export interface HoursEntity {
  duration: number;
  events: number;
  hour: string;
  motion: number;
  objects: number;
}
