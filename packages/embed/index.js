import axios from "axios";

const getEmbeddableHTML = url =>
  new Promise((resolve, reject) => {
    try {
      const parsedUrl = new URL(url);
      const { host } = parsedUrl;
      if (host.includes("vimeo.com")) {
        axios
          .get(`https://vimeo.com/api/oembed.json?url=${url}`)
          .then(response => {
            resolve(response.data.html);
          })
          .catch(err => {
            reject(new Error(`Unable to get embed details ${err.message}`));
          });
        return;
      }
      let iframeUrl = url;
      if (host.includes("youtube.com")) {
        const videoId = parsedUrl.searchParams.get("v");
        iframeUrl = `https://www.youtube.com/embed/${videoId}`;
      }
      resolve(
        `<iframe src="${iframeUrl}" width="640" height="360" frameborder="0" allowfullscreen></iframe>`
      );
    } catch (err) {
      resolve(`Unable to get embed details ${err.message}`);
    }
  });

export default {
  getEmbeddableHTML
};
