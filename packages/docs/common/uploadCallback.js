const uploadCallback = file => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/3/image');
    xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
    const data = new FormData();
    data.append('image', file);
    xhr.send(data);
    xhr.addEventListener('load', () => {
      const { data } = JSON.parse(xhr.responseText);
      resolve({ src: data.link });
    });
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
};

export default uploadCallback;
