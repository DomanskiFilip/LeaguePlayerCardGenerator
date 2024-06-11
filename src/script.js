//function checks if form is filled and if it is, it calls GetBasicInfo function.
function checkForm() {
    let server = document.getElementById("server").value;
    let serversRitoID = document.getElementById("serversRitoID").value;
    let summonerName = document.getElementById("summonerName").value;
    let tag = document.getElementById("tag").value;
    let apiKey = document.getElementById("apiKey").value;
    clearForm();
    document.getElementById("summoner").innerHTML = summonerName;
    if (summonerName == "" || apiKey == "" || server == "") {
        document.getElementById("FillFormError").innerHTML = "PLEASE FILL THE FORM!";
    } else {
        showCard();
        GetplayerPuuid(server, serversRitoID, summonerName, tag, apiKey);    
    }
}

// Function ShowCard shows card with summoner info and centers page on it.
function showCard() {
    document.getElementById("playerCard").style.display = "flex";
    document.getElementById("FillFormError").innerHTML = "";
    window.scrollTo(0, document.getElementById("playerCard").offsetTop - 100);
}


async function GetplayerPuuid(server, serversRitoID, summonerName, tag, apiKey) {
    const url = "https://" + serversRitoID + ".api.riotgames.com/riot/account/v1/accounts/by-riot-id/"+ summonerName +"/"+ tag +"?api_key=" + apiKey;
    try {
        const request = await fetch(url);
        if (!request.ok) { // check if HTTP status is 2xx
            throw new Error(`HTTP error! status: ${request.status}`);
        }
        let data = await request.json();
        getSummonerId(server, apiKey, data.puuid);
    } catch (error) {
        console.log(error);
    }
}

//Function getSummonerId fills riot api url with server id, player puuid and user Api Key and returns encripted summoner id.
async function getSummonerId(server, apiKey, puuid) {  
    const url = "https://" + server + ".api.riotgames.com/lol/summoner/v4/summoners/by-puuid/" + puuid + "?api_key=" + apiKey;
    const request = await fetch(url);
    let data = await request.json();
    document.getElementById("summonerId").innerHTML = data.id;
    document.getElementById("summonerLevel").innerHTML = data.summonerLevel;
    getRankInfo(server, apiKey);
    getTftInfo(server, apiKey);
}
    



// Function GetRankInfo fills riot api url with server id, summoner id and user Api Key and returns summoner rank, tier, league points, wins and looses.
async function getRankInfo(server, apiKey) {
    let summonerId = document.getElementById("summonerId").innerHTML;
    const url = "https://" + server + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerId + "?api_key=" + apiKey;
    const request = await fetch(url);
    let rankData = await request.json();
    // data from solo duo ranked queue
    document.getElementById("summonerRankSolo").innerHTML = rankData[2].tier + " " + rankData[2].rank;
    document.getElementById("summonerLeaguePointsSolo").innerHTML = rankData[2].leaguePoints;
    document.getElementById("summonerWins&LoosesSolo").innerHTML = rankData[2].wins + " / " + rankData[2].losses;
    document.getElementById("WinRatioSolo").innerHTML = (Math.round((rankData[2].wins / rankData[2].losses)* 100) / 100).toFixed(2);
    // data from flex ranked queue
    document.getElementById("summonerRankFlex").innerHTML = rankData[1].tier + " " + rankData[1].rank;
    document.getElementById("summonerLeaguePointsFlex").innerHTML = rankData[1].leaguePoints;
    document.getElementById("summonerWins&LoosesFlex").innerHTML = rankData[1].wins + " / " + rankData[1].losses;
    document.getElementById("WinRatioFlex").innerHTML = (Math.round((rankData[1].wins / rankData[1].losses)* 100) / 100).toFixed(2);
    console.log(rankData);
}

// Function GetTftInfo fills riot api url with server id, summoner id and user Api Key and returns summoner rank, tier, league points, wins and looses in TFT.
async function getTftInfo(server, apiKey) {
    let summonerId = document.getElementById("summonerId").innerHTML;
    const url = "https://" + server + ".api.riotgames.com/tft/league/v1/entries/by-summoner/" + summonerId + "?api_key=" + apiKey;
    const request = await fetch(url);
    let tftData = await request.json();
    //data from double up queue
    document.getElementById("summonerRankTftDoubleUp").innerHTML = tftData[0].tier + " " + tftData[0].rank;
    document.getElementById("summonerLeaguePointsTftDoubleUp").innerHTML = tftData[0].leaguePoints;
    document.getElementById("summonerWins&LoosesTftDoubleUp").innerHTML = tftData[0].wins + " / " + tftData[0].losses;
    document.getElementById("WinRatioTftDoubleUp").innerHTML = (Math.round((tftData[0].wins / tftData[0].losses)* 100) / 100).toFixed(2);
    //data from tft ranked queue
    document.getElementById("summonerRankTft").innerHTML = tftData[1].tier + " " + tftData[1].rank;
    document.getElementById("summonerLeaguePointsTft").innerHTML = tftData[1].leaguePoints;
    document.getElementById("summonerWins&LoosesTft").innerHTML = tftData[1].wins + " / " + tftData[1].losses;
    document.getElementById("WinRatioTft").innerHTML = (Math.round((tftData[1].wins / tftData[1].losses)* 100) / 100).toFixed(2);
    console.log(tftData);
}

// Function clears form and clears/hiddes card if needed.
function clearForm() {
    //clears form
    document.getElementById("summonerName").value = "";
    document.getElementById("server").value = "";
    //clears card
    if (document.getElementById("summoner").value != "") {
    document.getElementById("summonerRankSolo").innerHTML = "";
    document.getElementById("summonerLeaguePointsSolo").innerHTML = "";
    document.getElementById("summonerWins&LoosesSolo").innerHTML = "";
    document.getElementById("WinRatioSolo").innerHTML = "";
    document.getElementById("summonerRankFlex").innerHTML = "";
    document.getElementById("summonerLeaguePointsFlex").innerHTML = "";
    document.getElementById("summonerWins&LoosesFlex").innerHTML = "";
    document.getElementById("WinRatioFlex").innerHTML = "";
    document.getElementById("summonerRankTftDoubleUp").innerHTML = "";
    document.getElementById("summonerLeaguePointsTftDoubleUp").innerHTML = "";
    document.getElementById("summonerWins&LoosesTftDoubleUp").innerHTML = "";
    document.getElementById("WinRatioTftDoubleUp").innerHTML = "";
    document.getElementById("summonerRankTft").innerHTML = "";
    document.getElementById("summonerLeaguePointsTft").innerHTML = "";
    document.getElementById("summonerWins&LoosesTft").innerHTML = "";
    document.getElementById("WinRatioTft").innerHTML = "";
    }
    //hides card if needed
    if (document.getElementById("apiKey").value == "" && document.getElementById("playerCard").style.display == "flex" && document.getElementById("summonerName").value == "" && document.getElementById("server").value == "") {
        document.getElementById("playerCard").style.display = "none";
    }
}
