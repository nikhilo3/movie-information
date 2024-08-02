// 'use strict'

// const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWI0NWEzNjdhOTFiOTVjNDhjMjU5NDA5ZWJiYTA1YyIsInN1YiI6IjY1OGNmZmE5YzA0NDI5NzgxNTg0MmY2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.McSdKtFtqaJVhugUecxGhTCvKWOMhDaYvi6U8Dvs8L8";
// const imageurl = "https://image.tmdb.org/t/p/";

// const fetchdata = async (url, callback , optionalparam)=>{
//     const response = await fetch(url)
//     const data = await response.json()

//     console.log(data);
// }

// fetchdata();

// export { imageurl, API_KEY, fetchdata};




const imageBaseURL = 'http://image.tmdb.org/t/p/';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWI0NWEzNjdhOTFiOTVjNDhjMjU5NDA5ZWJiYTA1YyIsInN1YiI6IjY1OGNmZmE5YzA0NDI5NzgxNTg0MmY2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.McSdKtFtqaJVhugUecxGhTCvKWOMhDaYvi6U8Dvs8L8'
    }
  };

const fetchdata = function(url,callback,optionalparam){
    fetch(url, options)
    .then(response => response.json())
    .then(data => callback(data,optionalparam))
    .catch(err => console.error(err));
}
  

export { imageBaseURL, fetchdata };
