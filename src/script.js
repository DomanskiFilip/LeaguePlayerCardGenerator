//function checks if form is filled and if it is, it calls GetBasicInfo function.
function checkForm() {
    let server = document.getElementById("server").value;
    let summonerName = document.getElementById("summonerName").value;
    let apiKey = document.getElementById("apiKey").value;
    clearForm();
    if (summonerName == "" || apiKey == "" || server == "") {
        document.getElementById("FillFormError").innerHTML = "PLEASE FILL THE FORM!";
    } else {
        showCard();
        getBasicInfo(server, summonerName, apiKey);    
    }
}

// Function ShowCard shows card with summoner info and centers page on it.
function showCard() {
    document.getElementById("playerCard").style.display = "flex";
    document.getElementById("FillFormError").innerHTML = "";
    window.scrollTo(0, document.getElementById("playerCard").offsetTop - 100);
}


// Function GetBasicInfo fills riot api url with server id, summoner name and user Api Key and returns encripted summoner id, icon if and summoner level.
async function getBasicInfo(server, summonerName, apiKey) {
    const url = "https://" + server + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=" + apiKey;
    const request = await fetch(url);
    let data = await request.json();
    document.getElementById("summoner").innerHTML = data.name;
    document.getElementById("summonerLevel").innerHTML = data.summonerLevel;
    document.getElementById("summonerId").innerHTML = data.id;
    console.log(data);
    getRankInfo(server, apiKey);
    getTftInfo(server, apiKey)
}

// Function GetRankInfo fills riot api url with server id, summoner id and user Api Key and returns summoner rank, tier, league points, wins and looses.
async function getRankInfo(server, apiKey) {
    let summonerId = document.getElementById("summonerId").innerHTML;
    const url = "https://" + server + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerId + "?api_key=" + apiKey;
    const request = await fetch(url);
    let rankData = await request.json();
    // data from solo duo ranked queue
    document.getElementById("summonerRankSolo").innerHTML = rankData[0].tier + " " + rankData[0].rank;
    document.getElementById("summonerLeaguePointsSolo").innerHTML = rankData[0].leaguePoints;
    document.getElementById("summonerWins&LoosesSolo").innerHTML = rankData[0].wins + " / " + rankData[0].losses;
    document.getElementById("WinRatioSolo").innerHTML = (Math.round((rankData[0].wins / rankData[0].losses)* 100) / 100).toFixed(2);
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
    document.getElementById("summonerRankTft").innerHTML = tftData[0].tier + " " + tftData[0].rank;
    document.getElementById("summonerLeaguePointsTft").innerHTML = tftData[0].leaguePoints;
    document.getElementById("summonerWins&LoosesTft").innerHTML = tftData[0].wins + " / " + tftData[0].losses;
    document.getElementById("WinRatioTft").innerHTML = (Math.round((tftData[0].wins / tftData[0].losses)* 100) / 100).toFixed(2);
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