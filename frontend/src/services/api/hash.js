import axiosInstance from "./axios-instance";

export const getHash = (inputHex, ipAddress) => {
  return axiosInstance
    .post("/hash", { inputHex, ipAddress })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const getStatus = (hex) => {
  return axiosInstance
    .get(`/hash/${hex}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
