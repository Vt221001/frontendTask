const getHeaders = async (requestHeaders) => {
  headers = {};
  const token = localStorage.getItem("access-token");
  requestHeaders.forEach((heared) => {
    switch (heared) {
      case "access-token":
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        } else {
          console.warn("Access token not found in the local storage");
        }
        break;
      case "typeApplication":
        headers["Content-Type"] = "application/json";
        break;
      default:
        console.warn("Header not found");
        break;
    }
  });
  return headers;
};

export default getHeaders;
