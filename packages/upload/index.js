const uploadFile = (file, signedRequest, url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(url);
        } else {
          reject(new Error("Could not upload file."));
        }
      }
    };
    xhr.send(file);
  });
};

const getSignedRequest = (file, key) =>
  new Promise((resolve, reject) => {
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
          reject(new Error("Could not get signed URL."));
        }
      }
    };
    xhr.send();
  });

const uploadImage = (file, key) =>
  new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file selected."));
    }
    getSignedRequest(file, key).then(req => {
      const { signedRequest, url } = req;
      uploadFile(file, signedRequest, url).then(src => resolve({ src }));
    });
  });

export default { uploadImage };
