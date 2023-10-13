import {getTimeZone} from 'react-native-localize';

import {API_BASE} from '@env';

export const showIPOnly = (url: string) => {
  url = url.replace('http://', '');
  if (url[url.length - 1] === '/') {
    url = url.substring(url.length - 1, 0);
  }
  return url;
};

export const ipToAPIBase = (ip: string) => {
  ip = 'http://' + ip + '/';
  return ip;
};

export const getRecordingUrl = (cameraName: string, dateTime: Date): string => {
  const dateString = `${dateTime.getFullYear()}-${
    dateTime.getMonth() + 1
  }/${dateTime.getDate()}/${dateTime.getHours()}`;
  return `${API_BASE}vod/${dateString}/${cameraName}/${getTimeZone().replace(
    '/',
    ',',
  )}/master.m3u8`;
};
