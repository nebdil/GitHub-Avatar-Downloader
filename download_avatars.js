var request = require('request');
var GITHUB_USER = "nebdil";
var GITHUB_TOKEN = "f22994992b965f0ee2fe38fd77c1cf62a5135ba6";
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };
  request(options, function(err, response, body) {
    if (err) throw err;
    console.log(response.statusCode);
    console.log(body);
  });
}

var url = getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
