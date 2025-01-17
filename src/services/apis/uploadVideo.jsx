import axios from "axios";

const getBaseUrl = () => {
  // Check if the app is running locally
  return window.location.hostname === "localhost"
    ? "http://localhost:80"
    : "https://animetubebackend.onrender.com";

  // return "http://localhost:80";
};

export const getVideosApi = async (setVideos) => {
  const baseUrl = getBaseUrl();
  axios
    .get(`${baseUrl}/videos`)
    .then((r) => {
      console.log(r);
      setVideos(r.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserVideosApi = async (setUserShowVideoCollection, id) => {
  const baseUrl = getBaseUrl();
  console.log(id);
  
  axios
    .get(`${baseUrl}/videos/user-videos/${id}`)
    .then((r) => {
      console.log(r);
      setUserShowVideoCollection(r.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const posVideosApi = async (data) => {
  try {
    console.log(data);

    const baseUrl = getBaseUrl();
    const response = await axios.post(`${baseUrl}/videos/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    // return response; // Return the response if needed
  } catch (error) {
    console.log(error);
  }
};

export const updateVideosApi = async (id) => {
  const baseUrl = getBaseUrl();
  axios
    .patch(`${baseUrl}/videos/updating-product/${id}`)
    .then((r) => {
      console.log(r);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteVideosApi = async (id) => {
  const baseUrl = getBaseUrl();
  axios
    .delete(`${baseUrl}/videos/delete-product/${id}`)
    .then((r) => {
      console.log(r);
    })
    .catch((error) => {
      console.log(error);
    });
};
