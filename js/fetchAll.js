function fetchGenerico(url, loyalty){


fetch(url, {
    method: "GET",
    headers: new Headers({
        "X-API-Key": 'REVBQ9Xj38hu1f68aK6utmw7enBgW6bLddlwEeW5'
    })
}).then(function(response) {
    if (response.ok)
        return response.json();
    throw new Error(response.statusText);
}).then((json) => {
    app.members = json.results[0].members;
    app.diezPercent = Math.round(app.members.length * 0.10);
    //filtro array segun party
    app.republican = json.results[0].members.filter(miembro => { return miembro.party == "R" });
    app.democrat = json.results[0].members.filter(miembro => { return miembro.party == "D" });
    app.independent = json.results[0].members.filter(miembro => { return miembro.party == "I" });

    allMyStats();
})

function allMyStats() {
    //Calculo las cantidades de representantes de c/u
    app.statistics.numberOfDemocrats = app.democrat.length;
    app.statistics.numberOfRepublicans = app.republican.length;
    app.statistics.numberOfIndependents = app.independent.length;
    //Calculo las cantidades de representantes totales
    app.statistics.numberOfRepr = app.democrat.length + app.republican.length + app.independent.length;
    //Calculo porcentajes de votos
    app.statistics.votedWPartyDemPct = averageVotes(app.democrat);
    app.statistics.votedWPartyRepPct = averageVotes(app.republican);
    app.statistics.votedWPartyIndPct = (averageVotes(app.independent)||0);
    app.statistics.avgTotalPct = (app.statistics.votedWPartyDemPct + app.statistics.votedWPartyRepPct + (app.statistics.votedWPartyIndPct||0)) / 3;
    //Aplico fixed para bajar decimales
    app.statistics.votedWPartyDemPct = fixed(app.statistics.votedWPartyDemPct);
    app.statistics.votedWPartyRepPct = fixed(app.statistics.votedWPartyRepPct);
    app.statistics.votedWPartyIndPct = fixed(app.statistics.votedWPartyIndPct);
    app.statistics.avgTotalPct = fixed(app.statistics.avgTotalPct);
    //ordeno y creo arrays 
    if(pagina=="loyalty"){
        app.members = sortPct(app.members)
        app.least = app.members.slice(0, app.diezPercent - 1);
        app.most = app.members.slice(app.members.length - app.diezPercent, app.members.length - 1);
        app.most = app.most.reverse();
    
        console.log(app.most);
    } 
    else if(pagina == "missed votes"){
        app.members = sortPctVotes(app.members)
        app.least = app.members.slice(0, app.diezPercent - 1);
        app.most = app.members.slice(app.members.length - app.diezPercent, app.members.length - 1);
        app.most = app.most.reverse();

        console.log(app.most);
    }
    

}

function averageVotes(cantMiembros) {
    var avg = 0;
    for (var i = 0; i < cantMiembros.length; i++) {
        avg += cantMiembros[i].votes_with_party_pct;
    }
    avg = avg / cantMiembros.length;
    return avg;
}

function fixed(number) {
    var fixed = number.toFixed(2);
    return fixed;
}

function sortPct(order) {
    order.sort(function(a, b) {
        if (a.votes_with_party_pct > b.votes_with_party_pct) {
            return 1;
        } else {
            return -1;
        }
    });
    return order
}
function sortPctVotes(order) {
    order.sort(function(a, b) {
        if (a.missed_votes < b.missed_votes) {
            return 1;
        } else {
            return -1;
        }
    });
    return order
}
}