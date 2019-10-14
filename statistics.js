var arrayR = [];
var arrayD = [];
var arrayI = [];

function count(data) {

    for (var i = 0; i < data.results[0].members.length; i++) {
        if (data.results[0].members[i].party == "R") {
            arrayR.push(data.results[0].members[i]);

        } else if (data.results[0].members[i].party == "D") {
            arrayD.push(data.results[0].members[i]);
        } else {
            arrayI.push(data.results[0].members[i]);
        }
    }
}
count(data);
var avgRep = 0;
var avgInd = 0;
var avgDem = 0;

function porcentajeR() {
    for (var i = 0; i < arrayR.length; i++) {
        avgRep = avgRep + arrayR[i].votes_with_party_pct;
    }
    avgRep = avgRep / arrayR.length;
}

function porcentajeI() {
    for (var i = 0; i < arrayI.length; i++) {
        avgInd = avgInd + arrayI[i].votes_with_party_pct;
    }
    avgInd = avgInd / arrayI.length;
}

function porcentajeD() {
    for (var i = 0; i < arrayD.length; i++) {
        avgDem = avgDem + arrayD[i].votes_with_party_pct;
    }
    avgDem = avgDem / arrayD.length;
}

porcentajeI();
porcentajeD();
porcentajeR();

var votosTotal = arrayD.length + arrayR.length + arrayI.length;
var avgTotal = (avgRep + avgInd + avgDem) / 3;
avgTotal = avgTotal.toFixed(2);
avgDem = avgDem.toFixed(2);
avgInd = avgInd.toFixed(2);
avgRep = avgRep.toFixed(2);

var order = data.results[0].members;

order.sort(function (a, b) {
    if (a.missed_votes < b.missed_votes) {
        return 1;
    } else {
        return -1;
    }
});

var stadistics = {
    "NumberOfDemocrats": arrayD.length,
    "NumberOfRepublicans": arrayR.length,
    "NumberOfIndependents": arrayI.length,
    "Number": votosTotal,
    "%VotedWPartyRep": avgRep,
    "%VotedWPartyInd": avgInd,
    "%VotedWPartyDem": avgDem,
    "%avgTotal": avgTotal,
    "NumberOfMissedVotes": 0,
    "%Missed": 0
}

function senatorsAttendanceTables() {

    return "<tbody><tr><td>" + "Republicans" +
        "</td><td>" + stadistics.NumberOfRepublicans +
        "</td><td>" + stadistics["%VotedWPartyRep"] + "%" +
        "</td></tr>" +

        "<tr><td>" + "Democrats" +
        "</td><td>" + arrayD.length +
        "</td><td>" + avgDem + "%" +
        "</td></tr>" +

        "<tr><td>" + "Independents" +
        "</td><td>" + stadistics.NumberOfIndependents + "" +
        "</td><td>" + stadistics["%VotedWPartyInd"] + "%" +
        "</td></tr>" +

        "<tr><td>" + "Total" +
        "</td><td>" + stadistics.Number +
        "</td><td>" + stadistics["%avgTotal"] + "%" +

        "</td> </tr> </tbody>";
}

function senatorsAttendanceTablestest() {
    var html = senatorsAttendanceTables();
    document.getElementById("attendence").innerHTML = html;
} // mete el codigo html dentro de un string
senatorsAttendanceTablestest();

var least = order.slice(0,11);
var most = order.slice(94, 105);
most= most.reverse();

function leastSenatorAttendance(least){
    return least.map(function(members){
    return "<tr><td>" + "<a href = " + members.url + ">" + members.first_name + " " + members.last_name + " " + (members.middle_name || "") + "</a>"  +
            "</td><td>" + members.missed_votes +
            "</td><td>" + members.missed_votes_pct + "%" +
            "</td> </tr>";
    }).join("");
}

function leastSenatorAttendanceB(least) {
    var html = leastSenatorAttendance(least);
    document.getElementById("least").innerHTML = html;
} 
leastSenatorAttendanceB(least); 

function leastSenatorAttendanceC(most) {
    var html = leastSenatorAttendance(most);
    document.getElementById("most").innerHTML = html;
} 

leastSenatorAttendanceC(most);