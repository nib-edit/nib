const uploadFile = (file, signedRequest, url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(url);
        } else {
          reject("Could not upload file.");
        }
      }
    };
    xhr.send(file);
  });
};

const getSignedRequest = (file, key) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `/sign-s3?file-name=${file.name}&file-type=${file.type}&key=${key}`
    );
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject("Could not get signed URL.");
        }
      }
    };
    xhr.send();
  });
};

export const uploadImage = (file, key) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject("No file selected.");
    }
    getSignedRequest(file, key).then(req => {
      const {signedRequest, url} = req;
      uploadFile(file, signedRequest, url).then(src => resolve({src}));
    });
  });
};
