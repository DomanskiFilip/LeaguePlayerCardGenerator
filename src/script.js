//function checks if form is filled and if it is, it calls getPlayerPuuid function.
function checkForm() {
    let serversRitoID = document.getElementById("serverRitoID").value;
    let summonerName = document.getElementById("summonerName").value;
    let tag = document.getElementById("tag").value;
    let apiKey = document.getElementById("apiKey").value;
    let server = document.getElementById("server").value;
    
    
    document.getElementById("summoner").innerHTML = summonerName;
    if(summonerName === "" || apiKey === "" || server === "" || serversRitoID === "") {
        document.getElementById("FillFormError").innerHTML = "PLEASE FILL THE FORM!";
    } else {
        showCard();
        getPlayerPuuid(server, serversRitoID, summonerName, tag, apiKey);    
    }
    clearForm();
}

// Function ShowCard shows card with summoner info and centers page on it.
function showCard() {
    document.getElementById("playerCard").style.display = "flex";
    document.getElementById("FillFormError").innerHTML = "";
    window.scrollTo(0, document.getElementById("playerCard").offsetTop - 100);
}


async function getPlayerPuuid(server, serversRitoID, summonerName, tag, apikey) {
    const url = "http://localhost:3000/getPlayerPuuid?serversRitoID=" + serversRitoID + "&summonerName=" + summonerName + "&tag=" + tag + "&server=" + server + "&apikey=" + apikey;
      try {
        const request = await fetch(url);
        if (!request.ok) {
            throw new Error(`HTTP error! status: ${request.status}`);
        }
        let rankInfo = await request.json();
        fillRankInfo(rankInfo);
    } catch (error) {
        console.log(error);
    }
}


async function fillRankInfo(rankInfo) {
    document.getElementById("summonerLevel").innerHTML = rankInfo.summonerLevel;
    // data from solo duo ranked queue
    document.getElementById("summonerRankSolo").innerHTML = rankInfo.tier + " " + rankInfo.rank;
    document.getElementById("summonerLeaguePointsSolo").innerHTML = rankInfo.leaguePoints;
    document.getElementById("summonerWins&LoosesSolo").innerHTML = rankInfo.wins + " / " + rankInfo.losses;
    document.getElementById("WinRatioSolo").innerHTML = (Math.round((rankInfo.wins / rankInfo.losses)* 100) / 100).toFixed(2);
    // data from tft double up ranked queue
    document.getElementById("summonerRankTftDoubleUp").innerHTML = rankInfo.tierDoubleUp + " " + rankInfo.rankDoubleUp;
    document.getElementById("summonerLeaguePointsTftDoubleUp").innerHTML = rankInfo.leaguePointsDoubleUp;
    document.getElementById("summonerWins&LoosesTftDoubleUp").innerHTML = rankInfo.winsDoubleUp + " / " + rankInfo.lossesDoubleUp;
    document.getElementById("WinRatioTftDoubleUp").innerHTML = (Math.round((rankInfo.winsDoubleUp / rankInfo.lossesDoubleUp)* 100) / 100).toFixed(2);
    console.log(rankInfo);
}

// Function clears form and clears/hiddes card if needed.
function clearForm() {
    //clears form
    document.getElementById("summonerName").value = "";
    document.getElementById("server").value = "";
    document.getElementById("serverRitoID").value = "";
    document.getElementById("tag").value = "";
    //clears card
    if (document.getElementById("summoner").value != "") {
    document.getElementById("summonerRankSolo").innerHTML = "";
    document.getElementById("summonerLeaguePointsSolo").innerHTML = "";
    document.getElementById("summonerWins&LoosesSolo").innerHTML = "";
    document.getElementById("WinRatioSolo").innerHTML = "";
    document.getElementById("summonerRankTftDoubleUp").innerHTML = "";
    document.getElementById("summonerLeaguePointsTftDoubleUp").innerHTML = "";
    document.getElementById("summonerWins&LoosesTftDoubleUp").innerHTML = "";
    document.getElementById("WinRatioTftDoubleUp").innerHTML = "";
    }
    //hides card if needed
    if (document.getElementById("apiKey").value == "" && document.getElementById("playerCard").style.display == "flex" && document.getElementById("summonerName").value == "" && document.getElementById("server").value == "") {
        document.getElementById("playerCard").style.display = "none";
    }
}

// update year in footer
function updateYear(){
    let year = document.getElementById("year");
    let date = new Date();
    year.innerHTML = date.getFullYear();
  }

  updateYear();