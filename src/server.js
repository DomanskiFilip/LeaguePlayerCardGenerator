var express = require('express');
var cors = require('cors');
const axios = require('axios');


var app = express();

app.use(cors());

async function getPlayerPuuid(serversRitoID, summonerName, tag, API_Key) {
    const url = "https://" + serversRitoID + ".api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + summonerName + "/" + tag + "?api_key=" + API_Key;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data.puuid;
    } catch (error) {
        console.error('getPlayerPuuid Error fetching data from Riot API:', error.response.data);
    }
}

async function getSummonerInfo(server, puuid, API_Key) {
    const url = "https://" + server + ".api.riotgames.com/lol/summoner/v4/summoners/by-puuid/" + puuid + "?api_key=" + API_Key;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return { id: response.data.id, summonerLevel: response.data.summonerLevel };
    } catch (error) {
        console.error('getSummonerInfo Error fetching data from Riot API:', error.response.data);
        return { id: null, summonerLevel: null }; // return null values in case of an error
    }
}

async function getRankInfo(server, summonerId, API_Key) {
    const url = "https://" + server + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerId + "?api_key=" + API_Key;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return { tier: response.data[0].tier, rank: response.data[0].rank, leaguePoints: response.data[0].leaguePoints, wins: response.data[0].wins, losses: response.data[0].losses };
    } catch (error) {
        console.error('getRankInfo Error fetching data from Riot API:', error.response.data);
        return { tier: null, rank: null, leaguePoints: null, wins: null, losses: null }; // return null values in case of an error
    }
}


async function getTftInfo(server, summonerId, API_Key){
    const url = "https://" + server + ".api.riotgames.com/tft/league/v1/entries/by-summoner/" + summonerId + "?api_key=" + API_Key;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return { tierDoubleUp: response.data[0].tier, rankDoubleUp: response.data[0].rank, leaguePointsDoubleUp: response.data[0].leaguePoints, winsDoubleUp: response.data[0].wins, lossesDoubleUp: response.data[0].losses };
    } catch (error) {
        console.error('getTftInfo Error fetching data from Riot API:', error.response.data);
        return { tierDoubleUp: null, rankDoubleUp: null, leaguePointsDoubleUp: null, winsDoubleUp: null, lossesDoubleUp: null }; // return null values in case of an error
    }
}

app.get('/getPlayerPuuid', async (req, res) => {
    const PUUID = await getPlayerPuuid(req.query.serversRitoID, req.query.summonerName, req.query.tag, req.query.apikey);
    const summonerInfo = await getSummonerInfo(req.query.server, PUUID, req.query.apikey);
    const rankInfo = await getRankInfo(req.query.server, summonerInfo.id, req.query.apikey);
    const tftInfo = await getTftInfo(req.query.server, summonerInfo.id, req.query.apikey);
    res.send({ 
        rank: rankInfo.rank,
        tier: rankInfo.tier,
        leaguePoints: rankInfo.leaguePoints,
        wins: rankInfo.wins,
        losses: rankInfo.losses,

        rankDoubleUp: tftInfo.rankDoubleUp, 
        tierDoubleUp: tftInfo.tierDoubleUp,
        leaguePointsDoubleUp: tftInfo.leaguePointsDoubleUp,
        winsDoubleUp: tftInfo.winsDoubleUp,
        lossesDoubleUp: tftInfo.lossesDoubleUp,

        summonerLevel: summonerInfo.summonerLevel
    });
});



app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000');
});

