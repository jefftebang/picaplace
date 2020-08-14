const axios = require("axios");

const API_KEY = process.env.REACT_APP_HERE_API_KEY;

async function addressToCoordinates(address) {
  const response = await axios.get(
    `https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=${encodeURIComponent(
      address
    )}&&apiKey=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new Error("Cannot find the address you type.");
    error.code = 422;
    throw error;
  }

  const coordinates = data.Response.View[0].Result[0].Location.DisplayPosition;

  return coordinates;
}

module.exports = addressToCoordinates;
