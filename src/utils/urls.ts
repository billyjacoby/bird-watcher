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
