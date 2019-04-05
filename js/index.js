// your code here
function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos.map(r => '<li> - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  let input = document.getElementById("username").value
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${input}/repos`);
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/:owner/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map( commit =>'<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('commits').innerHTML = commitsList;
}
