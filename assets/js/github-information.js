function userInformationHTML(user) {
    //user.html is the users github repo
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>) 
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function repoInformationHTML(repos) {
    if (repos.length == 0)//if repo is empty
     {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo)
    //maps method works like a forEach but it returns an array with the results of the function
    {
        //we want to return an li and inside an achor tag
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
} // the join('\n) joins everything on a new line so it stops us iterating over the new list again


function fetchGitHubInformation(event) {
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return; //if username is empty
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

        $.when(
            $.getJSON(`https://api.github.com/users/${username}`),
            $.getJSON(`https://api.github.com/users/${username}/repos`)//list repos for that users
        ).then(
            function(firstResponse, secondResponse) {
                var userData = firstResponse[0];
                var repoData = secondResponse[0];
                $("#gh-user-data").html(userInformationHTML(userData));
                $("#gh-repo-data").html(repoInformationHTML(repoData));
            },
    function(errorResponse) {
        if (errorResponse.status === 404) {
            $("#gh-user-data").html(
                `<h2>No info found for user ${username}</h2>`);
        } else {
            console.log(errorResponse);
            $("#gh-user-data").html(
                `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
        }
    });
}
$(document).ready(fetchGitHubInformation)