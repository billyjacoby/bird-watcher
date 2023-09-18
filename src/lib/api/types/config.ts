export interface FrigateConfig {
  birdseye: FrigateConfigBirdseye;
  //? Not sure how to type this...
  cameras: {
    [cameraName: string]: CameraConfig;
  };
  database: Database;
  detect: Detect;
  detectors: any;
  environment_vars: any;
  ffmpeg: Ffmpeg;
  go2rtc: Go2RTC;
  live: Live;
  logger: any;
  model: Model;
  motion: null;
  mqtt: Mqtt;
  objects: any;
  plus: any;
  record: Record;
  rtmp: any;
  snapshots: Snapshots;
  telemetry: Telemetry;
  timestamp_style: TimestampStyle;
  ui: FrigateConfigUI;
}

export interface FrigateConfigUI {
  date_style: string;
  live_mode: string;
  strftime_fmt: null;
  time_format: string;
  time_style: string;
  timezone: null;
  use_experimental: boolean;
}

export interface Telemetry {
  version_check: boolean;
}

export interface Snapshots {
  bounding_box: boolean;
  crop: boolean;
  enabled: boolean;
  height: number | null;
  quality: number;
  required_zones: any[];
  timestamp: boolean;
  clean_copy?: boolean;
  retain?: SnapshotsRetain;
}

export interface SnapshotsRetain {
  default: number;
  mode: string;
  objects: any;
}

export interface Model {
  height: number;
  input_pixel_format: string;
  input_tensor: string;
  labelmap: any;
  labelmap_path: null;
  model_type: string;
  path: null;
  width: number;
}

export interface Go2RTC {
  streams: Streams;
  webrtc: Webrtc;
}

export interface Streams {
  frigate_back_yard: string[];
  frigate_back_yard_sub: string[];
  frigate_front_door: string[];
  frigate_front_door_sub: string[];
  frigate_garage: string[];
  frigate_garage_sub: string[];
}

export interface Webrtc {
  candidates: string[];
}

export interface Database {
  path: string;
}

export interface FrigateConfigBirdseye {
  enabled: boolean;
  height: number;
  mode: string;
  quality: number;
  restream: boolean;
  width: number;
}

export interface CameraConfig {
  best_image_timeout: number;
  birdseye: Birdseye;
  detect: Detect;
  enabled: boolean;
  ffmpeg: Ffmpeg;
  ffmpeg_cmds: FfmpegCmd[];
  live: Live;
  motion: Motion;
  mqtt: Mqtt;
  name: string;
  objects: Objects;
  record: Record;
  rtmp: Rtmp;
  snapshots: Mqtt;
  timestamp_style: TimestampStyle;
  ui: UI;
  zones: Zones;
}

export interface Birdseye {
  enabled: boolean;
  mode: string;
}

export interface Detect {
  enabled: boolean;
  fps: number;
  height: number;
  max_disappeared: number;
  stationary: Stationary;
  width: number;
}

export interface Stationary {
  interval: number;
  max_frames: MaxFrames;
  threshold: number;
}

export interface MaxFrames {
  default: null;
  objects: Zones;
}

export interface Zones {}

export interface Ffmpeg {
  global_args: string[];
  hwaccel_args: any[];
  input_args: string;
  inputs: Input[];
  output_args: OutputArgs;
}

export interface Input {
  global_args: any[];
  hwaccel_args: any[];
  input_args: string;
  path: string;
  roles: string[];
}

export interface OutputArgs {
  detect: string[];
  record: string;
  rtmp: string;
}

export interface FfmpegCmd {
  cmd: string;
  roles: string[];
}

export interface Live {
  height: number;
  quality: number;
  stream_name: string;
}

export interface Motion {
  contour_area: number;
  delta_alpha: number;
  frame_alpha: number;
  frame_height: number;
  improve_contrast: boolean;
  mask: string[];
  mqtt_off_delay: number;
  threshold: number;
}

export interface Mqtt {
  bounding_box: boolean;
  crop: boolean;
  enabled: boolean;
  height: number | null;
  quality: number;
  required_zones: any[];
  timestamp: boolean;
  clean_copy?: boolean;
  retain?: MqttRetain;
}

export interface MqttRetain {
  default: number;
  mode: string;
  objects: Zones;
}

export interface Objects {
  filters: Filters;
  mask: string;
  track: string[];
}

export interface Filters {
  bear: Bear;
  car: Bear;
  cat: Bear;
  dog: Bear;
  person: Bear;
}

export interface Bear {
  mask: null | string;
  max_area: number;
  max_ratio: number;
  min_area: number;
  min_ratio: number;
  min_score: number;
  threshold: number;
}

export interface Record {
  enabled: boolean;
  enabled_in_config: boolean;
  events: Events;
  expire_interval: number;
  retain: RecordRetain;
  retain_days: null;
}

export interface Events {
  objects: null;
  post_capture: number;
  pre_capture: number;
  required_zones: any[];
  retain: MqttRetain;
}

export interface RecordRetain {
  days: number;
  mode: string;
}

export interface Rtmp {
  enabled: boolean;
}

export interface TimestampStyle {
  color: Color;
  effect: null;
  format: string;
  position: string;
  thickness: number;
}

export interface Color {
  blue: number;
  green: number;
  red: number;
}

export interface UI {
  dashboard: boolean;
  order: number;
}
