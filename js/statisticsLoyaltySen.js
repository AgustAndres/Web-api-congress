var app = new Vue({
    el: '#app',
    data: {
        members: [],
        statistics: {
            "numberOfDemocrats": 0,
            "numberOfRepublicans": 0,
            "numberOfIndependents": 0,
            "numberOfRepr": 0,

            "votedWPartyRepPct": 0,
            "votedWPartyIndPct": 0,
            "votedWPartyDemPct": 0,

            "avgTotalPct": 0,
            "numberOfPartyVotes": 0,
            "partyVotes": 0,

            "leastEngagedNames": 0,
            "mostEngagedNames": 0,

            "leastLoyalNames": 0,
            "mostLoyalNames": 0
        },
        most: [],
        least: [],
        democrat: [],
        independent: [],
        republican: [],
        diezPercent: 0,
    }
});

//Reempleza tabla 
var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
var pagina = "loyalty";
fetchGenerico(url, pagina); 