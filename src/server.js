let express = require('express');
let cors = require('cors');
const axios = require('axios');


let app = express();

app.use(cors());

async function getPlayerPuuid(serversRitoID, summonerName, tag, API_Key) {
    const url = "https://" + serversRitoID + ".api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + summonerName + "/" + tag + "?api_key=" + API_Key;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data.puuid;
    } catch (error) {
        if (error.response) {
            console.error('getPlayerPuuid Error fetching data from Riot API:', error.response.data);
        } else {
            console.error('getPlayerPuuid Error:', error.message);
        }
    }
}

async function getSummonerInfo(server, puuid, API_Key) {
    const url = "https://" + server + ".api.riotgames.com/lol/summoner/v4/summoners/by-puuid/" + puuid + "?api_key=" + API_Key;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return { id: response.data.id, summonerLevel: response.data.summonerLevel };
    } catch (error) {
        if (error.response) {
            console.error('getSummonerInfo Error fetching data from Riot API:', error.response.data);
        } else {
            console.error('getSummonerInfo Error:', error.message);
        }
        return { id: null, summonerLevel: null };
    }
}

async function getRankInfo(server, summonerId, API_Key) {
    const url = "https://" + server + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerId + "?api_key=" + API_Key;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return { tier: response.data[0].tier, rank: response.data[0].rank, leaguePoints: response.data[0].leaguePoints, wins: response.data[0].wins, losses: response.data[0].losses };
    } catch (error) {
        if (error.response) {
            console.error('getRankInfo Error fetching data from Riot API:', error.response.data);
        } else {
            console.error('getRankInfo Error:', error.message);
        }
        return { tier: null, rank: null, leaguePoints: null, wins: null, losses: null };
    }
}

async function getTftInfo(server, summonerId, API_Key) {
    const url = "https://" + server + ".api.riotgames.com/tft/league/v1/entries/by-summoner/" + summonerId + "?api_key=" + API_Key;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return { tierDoubleUp: response.data[0].tier, rankDoubleUp: response.data[0].rank, leaguePointsDoubleUp: response.data[0].leaguePoints, winsDoubleUp: response.data[0].wins, lossesDoubleUp: response.data[0].losses };
    } catch (error) {
        if (error.response) {
            console.error('getTftInfo Error fetching data from Riot API:', error.response.data);
        } else {
            console.error('getTftInfo Error:', error.message);
        }
        return { tierDoubleUp: null, rankDoubleUp: null, leaguePointsDoubleUp: null, winsDoubleUp: null, lossesDoubleUp: null };
    }
}

app.get('/getPlayerPuuid', async (req, res) => {
    const { serversRitoID, summonerName, tag, server, apikey } = req.query;

    if (!serversRitoID || !summonerName || !tag || !server || !apikey) {
        return res.status(400).send({ error: 'Missing required query parameters' });
    }

    try {
        const PUUID = await getPlayerPuuid(serversRitoID, summonerName, tag, apikey);
        const summonerInfo = await getSummonerInfo(server, PUUID, apikey);
        const rankInfo = await getRankInfo(server, summonerInfo.id, apikey);
        const tftInfo = await getTftInfo(server, summonerInfo.id, apikey);

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
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000');
});

