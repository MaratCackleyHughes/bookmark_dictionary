lookupDictDefinition = function() {
     var  partsOfSpeech = {
         n: "noun",
         v: "verb",
         a: "adjective",
         r: "adverb",
         a: "adjective satellite"
     };
    function displayDefinition(response, selection) {

        // this next statement alone returns text to JSON objects
        var definitions = JSON.parse(response);

        var html = "";
        var i;
        var j;
        var samples;
        var div = document.createElement("div");
        var contents = document.createElement("div");
        var body = document.getElementsByTagName("body")[0];
        var selectionRect = selection.getRangeAt(0).getBoundingClientRect(0);
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || body.scrollTop;
        var scrollLeft = (document.documentElement && document.documentElement.scrollLeft) || body.scrollLeft;

        //this next function removes the pop up div and the event listener that listens for the body click
        var bodyListener = function() {
            body.removeChild(div);
            body.removeEventListener("click", bodyListener);
        };
       // while these functions add the listener and the div itself
        body.addEventListener("click", bodyListener);
        div.addEventListener("click", function(evt) {
          evt.stopPropagation();
        });

        div.className = "dict_bubble top";

        contents.className = "dict_content";
        //parsing and organizing the dictionary content into html
        for(i = 0; i < definitions.length; i++) {
            if( i== 0
                || (definitions[i].lemma != definitions[i - 1].lemma)
                || (definitions[i].pos != definitions[i - 1].pos)) {
                  if(i != 0){
                      html += "</ol>";
                  }
                html += "<b>" + definitions[i].lemma + "</b> ("
                    + partsOfSpeech[definitions[i].pos] +
                    "):<ol class='dict_list'>";
            }
            html += "<li class='dict_list_li'>" + definitions[i].definition + "</li>";
            if(definitions[i].sampleset) {
                samples = definitions[i].sampleset.split("|");
                html += "<ul class='dict_samp_list'>";
                for(j = 0; j < samples.length; j++){
                    html += "<li class='dict_samp_li'><i>" + samples[j] + "</i></li>";
                }
                html += "</ul>";
            }

        }
        html += "</ol>";
        contents.innerHTML = html;
        div.appendChild(contents);
        body.appendChild(div);
        div.style.top = selectionRect.bottom + 20 + scrollTop + "px";
        div.style.left = ((selectionRect.left + selectionRect.right) / 2) - 67 + scrollLeft + "px";

        // this can be removed
        //console.log(response);
    }
    // this is the ajax that requests the selected word's defintion
    function fetchWords(words, selection) {
        var httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = function () {
            if(httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200) {
                displayDefinition(httpRequest.response, selection);
            }
        }
        httpRequest.open("GET", "http://localhost/cis223w/week5/dict/word_lookup.php?word=" + words, true);
        httpRequest.send();
    }

   // this function gets the selection from the site, and cleans it up
    return function() {
        var selection = window.getSelection();
        var words;

        if(selection.rangeCount == 0) {
            //console.log("Nothing selected.");
        } else {
            words = selection.toString().trim();
            if(words == "") {
                //console.log("Nothing selected.");
            } else {
               // console.log("Selection: ' "+ words + "'");
                fetchWords(words, selection);
            }
        }
    }
    }();
lookupDictDefinition();
