import {API_BASE} from '@env';

interface FetchLatestFrameParams {
  cameraName: string;
  // Height in pixels
  height?: number;
  //Show bounding boxes for detected objects (0 or 1)
  bbox?: boolean;
  // Print the timestamp in the upper left (0 or 1)
  timestamp?: boolean;
  // Draw the zones on the image (0 or 1)
  zones?: boolean;
  mask?: boolean;
  motion?: boolean;
  regions?: boolean;
  quality?: boolean;
}

const URL = `${API_BASE}api/:camera_name/latest.jpg`;

export const getLatestCameraFrame = (cameraParams: FetchLatestFrameParams) => {
  const {cameraName, ...queryParams} = cameraParams;

  let url = URL.replace(':camera_name', cameraName);

  if (Object.keys(queryParams).length) {
    const paramsToSend: Record<string, string> = {};
    for (const [key, value] of Object.entries(queryParams)) {
      if (value === false) {
        paramsToSend[key] = '0';
      }
      if (value === true) {
        paramsToSend[key] = '1';
      }
      if (typeof value === 'number') {
        paramsToSend[key] = value.toString();
      }
    }

    const params = new URLSearchParams(paramsToSend);

    url = url + '?' + params;
  }

  return url;
};
