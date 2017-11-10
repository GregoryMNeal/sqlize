/* Create Album

Write a script to create a new album in the database. You may either connect to your local database or your remote database. The script will prompt the user for an album name, a year, and an artist ID.

*/

// Imports
var prompt = require('prompt-promise'); // for accepting user input - promise based
var db = require('./models');


// Define a Promise for prompting the User for inputs
var getUserInputs = new Promise(
  function (resolve, reject) {
    var inputs = [];
    // Prompt for the album name
    prompt('Please enter the album name: ')
    // then save the album name and prompt for the year of the album
    .then(function (value) {
      inputs.push(value);
      return prompt('Please enter the year of the album: ');
    })
    // then save the year of the album and prompt for the artist ID
    .then(function (value) {
      inputs.push(value);
      return prompt('Please enter the artist ID: ');
    })
    // then save the prompt information and return as resolved
    .then(function (value) {
      inputs.push(value);
      prompt.done();
      resolve(inputs);
    })
    // catch errors while prompting and return as rejected
    .catch(function (error) {
      prompt.finish();
      reject(error);
    });
  }
);

// Write to album table
function writeAlbum (album_name, album_year, artist_id) {
  db.album.create({name: album_name, year: album_year, artistId: artist_id})
  .then(function (album) {
    console.log(album);
  });
}

// Define main driver function
var main = function () {
  getUserInputs
    .then(function (inputs) {
      var album_name = inputs[0];
      var album_year = inputs[1];
      var artist_id = inputs[2];
      writeAlbum(album_name, album_year, artist_id);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Execute the main function
main();
