# LeaguePlayerCardGenerator

welcome to my first website project made with github in mind!

As a Cs student, web developer and League player I decided to combine my interests into one simple github project.

This website allows anybody to check basic statistics about their League account useing freely avaliable api keys given to anybody who creates riot developer account.

simply create a developer account, copy your api key, paste it into the website together with server and nick name of a player you want to find the statistics of and you are good to go!

The app fetches information about the account from riot games server and displays current win ratio, rank and League Points (LP) in four different modes.

The project was functional untill recent changes to riot api where they blocked front end access on top of other changes.

12/6/2024: I updated the code to support the new structure of riots apis useing RiotID to get puuid istead of summonername

due to CORS I am not able to host a working web version at this time at: https://adappstudio.co.uk/Filip/LPCG/

To use the app you need to start local server in terminal useing npm start
