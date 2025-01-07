import axios from "axios";

export const getVideosApi = async (setVideos) => {
  axios
    .get(
      "https://animetubebackend.onrender.com/videos" ||
        "http://localhost:80/videos"
    )
    .then((r) => {
      console.log(r);
      setVideos(r.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getUserVideosApi = async (setVideos) => {
  axios
    .get(
      "https://animetubebackend.onrender.com/videos" ||
        "http://localhost:80/videos"
    )
    .then((r) => {
      console.log(r);
      setVideos(r.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const posVideosApi = async (data) => {
  try {
    console.log(data);

    const response = await axios.post(
      "https://animetubebackend.onrender.com/videos/upload"||
      "http://localhost:80/videos/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    // return response; // Return the response if needed
  } catch (error) {
    console.log(error);
  }
};

export const updateVideosApi = async (id) => {
  axios
    .patch(
      `https://animetubebackend.onrender.com/videos/updating-product/${id}` ||
        `http://localhost:80/videos/updating-product/${id}`
    )
    .then((r) => {
      console.log(r);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const deleteVideosApi = async (id) => {
  axios
    .delete(
      `https://animetubebackend.onrender.com/videos/delete-product/${id}`||
      `http://localhost:80/videos/delete-product/${id}`
    )
    .then((r) => {
      console.log(r);
    })
    .catch((error) => {
      console.log(error);
    });
};
