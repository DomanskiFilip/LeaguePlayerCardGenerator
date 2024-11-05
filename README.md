# LeaguePlayerCardGenerator

welcome to my first website project made with github in mind!

As a Cs student, web developer and League player I decided to combine my interests into one simple github project.

This website allows anybody to check basic statistics about their League account useing freely avaliable api keys given to anybody who creates riot developer account.

simply create a developer account, copy your api key, paste it into the website together with server and nick name of a player you want to find the statistics of and you are good to go!

The app fetches information about the account from riot games server and displays current win ratio, rank and League Points (LP) in four different modes.

12/6/2024: I updated the code to support the new structure of riots apis useing RiotID to get puuid istead of summonername

To use the app you need to start local node.js server in terminal:

you can do this by going to Node.js comand prompt -> navigateing to correct folder useing cd -> writeing npm start

05/11/2024: I added Dockerfile you can now build it and run it as container! remember to assign port when runing the container by doing so you can go to your localhost at the assigned port and the webpage will appear fully functional

after that you can open index.html locally fill the form and eveything should work!

I am also planing to host the website online so stay tuned!
