const request = require('request');
const dotenv = require('dotenv').config();
const fs = require('fs');
const user = process.env.GITHUB_USER;
const token = process.env.GITHUB_TOKEN;
console.log('Welcome to the GitHub Avatar Downloader!');
var inputOwner = process.argv[2];
var inputRepo = process.argv[3];
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ user + ':' + token + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };
  request(options, function(err, response, body) {
    if (err) throw err;
    console.log(response.statusCode);
    var parsedArr = JSON.parse(body);
    // console.log(parsedObj);
    cb(err, parsedArr);

  });
}
function downloadImageByURL(url, filePath) {
  request.get(url).on('error', function(err) {
    throw err;
  }).pipe(fs.createWriteStream('avatars/' + filePath + '.jpg'));
};

getRepoContributors(inputOwner, inputRepo, function(err, result) {
  if((!inputOwner) || (!inputRepo)) {
    console.log("Missing input");
  }
  else{
    console.log("Errors:", err);
    console.log("Result:", result);
    result.forEach(function(e) {
    console.log(e.avatar_url);
    downloadImageByURL(e.avatar_url, e.login);
  })}

});
