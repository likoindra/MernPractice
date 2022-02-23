import React, { useState, useEffect } from "react";
import axios from "axios";

// ini akan memanggil API dari .env
const API_KEY = process.env.REACT_APP_API_KEY;

//
const Random = () => {
  // di dalam useEffect akan 2 paramter yaitu callback function dan dependecies
  // first render
  useEffect(() => {
    const fetchGif = async () => {
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
      const { data } = await axios.get(url);
      console.log(data);
    };

    fetchGif();
  }, []);

  return (
    <div>
      <h1>Random</h1>
    </div>
  );
};

export default Random;

// component akan memunculkan tag random GIF
