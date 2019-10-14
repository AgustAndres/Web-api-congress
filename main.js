function senatorsTables(data) {
  return data.results[0].members.map(function (members) {
    return "<tr><td>" + "<a href = " + members.url + ">" + members.first_name + " " + members.last_name + " " + (members.middle_name || "") + "</a>" +
      "</td><td>" + members.party +
      "</td><td>" + members.state +
      "</td><td>" + members.seniority +
      "</td><td>" + members.votes_with_party_pct + "%" +
      "</td> </tr>";
  }).join("");
}

function renderHeaders(data) {
  var html = senatorsTables(data);
  document.getElementById("senate-data").innerHTML = html;
} // mete el codigo html dentro de un string


renderHeaders(data);

var arraySenator = []; //= data.results[0].members;

//import axios from 'axios';
var app = new Vue({
  el: '#app',
  data: {
    senators: [
      

    ]
  }
});

app.senators= [
  {
    first_name: '5',
    middle_name:'5',
    last_name:'5',
    party: '5',
    state: '5',
    seniority: '5',
    votes_with_party_pct: '5'
  },
  {
    first_name: '5',
    middle_name:'5',
    last_name:'5',
    party: '5',
    state: '5',
    seniority: '5',
    votes_with_party_pct: '5'
  }
];