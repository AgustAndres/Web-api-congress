var app = new Vue({
    el: '#app',
    data: {
        members: []
    }
});

fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
    method: "GET",
    headers: new Headers({
        "X-API-Key": 'REVBQ9Xj38hu1f68aK6utmw7enBgW6bLddlwEeW5'
    })
}).then(function(response) {
    if (response.ok)
        return response.json();
    throw new Error(response.statusText);
}).then(function(json) {
    console.log(json);
    app.members = json.results[0].members;
})