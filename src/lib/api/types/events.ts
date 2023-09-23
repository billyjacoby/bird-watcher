export interface FrigateEvent {
  //? Unsure what the non null types should be here
  area: null | any;
  box: null | any;
  plus_id: null | any;
  false_positive: null | any;
  ratio: null | any;
  camera: string;
  end_time: number;
  has_clip: boolean;
  has_snapshot: boolean;
  id: string;
  label: string;
  region: null | string;
  retain_indefinitely: boolean;
  start_time: number;
  sub_label: null | string;
  thumbnail: string;
  top_score: number;
  zones?: string[];
  snapshotURL?: string;
  vodURL: string;
}

export interface CameraEventParams extends Record<string, string | undefined> {
  before?: string;
  after?: string;
  cameras?: string;
  labels?: string;
  zones?: string;
  limit?: string;
  has_snapshot?: string;
  has_clip?: string;
  include_thumbnails?: string;
  in_progress?: string;
}

export interface SnapshotQueryParams
  extends Record<string, string | undefined> {
  h?: string;
  bbox?: string;
  timestamp?: string;
  crop?: string;
  quality?: string;
}
