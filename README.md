After selecting a word in a browser window, a bookmark icon triggers the retrieval of the definition of that word. 
This program takes a word that has been highlighted in the browser and queries a MySQL dictionary database and then returns a definition of that word as a pop up balloon. This program relies on the Wordnet dictionary database, you can download it here http://wnsql.sourceforge.net/. The program uses PHP to communicate with the database, the result is then inserted into the DOM with Javascript. 
To install this program put the bookmarklet.js file in your bookmark bar in the place of an URL. This will then become the event handler to call the rest of the code. The other files are to be installed on your localhost. 

