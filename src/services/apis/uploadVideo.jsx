import axios from "axios";

export const getVideosApi = async (sv) => {
  axios
    .get("http://localhost:80/videos")
    .then((r) => {
      console.log(r);
      sv(r.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const posVideosApi = async (data) => {
  try {
    console.log(data);
    
    const response = await axios.post(
      "http://localhost:80/videos/upload",
      data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    // return response; // Return the response if needed
  } catch (error) {
    console.log(error);
  };
};

export const updateVideosApi = async (id) => {
  axios
    .patch(`http://localhost:80/videos/updating-product/${id}`)
    .then((r) => {
      console.log(r);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const deleteVideosApi = async (id) => {
  axios
    .delete(`http://localhost:80/videos//delete-product/${id}`)
    .then((r) => {
      console.log(r);
    })
    .catch((error) => {
      console.log(error);
    });
};
