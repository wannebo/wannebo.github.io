// ==UserScript==
// @name         Highlight Top User Comments
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://news.ycombinator.com/item*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ycombinator.com
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var topusers=["tptacek","ingve","danso","pseudolus","rbanffy","todsacerdoti","tosh","Tomte","JumpCrisscross","Animats","lxm","patio11","ColinWright","rayiner","dragonwriter","zdw","pjmlp","luu","ChuckMcM","TeMPOraL","thunderbong","pjc50","anigbrowl","steveklabnik","jgrahamc","toomuchtodo","coldtea","jseliger","jerf","walterbell","bookofjoe","signa11","userbinator","nostrademons","PaulHoule","uptown","sohkamyung","ceejayoz","jedberg","jrockway","WalterBright","mooreds","crazygringo","hn_throwaway_99","minimaxir","shawndumas","stavros","paxys","dnetesn","masklinn","wglb","mfiguiere","robin_reala","davidw","jonbaer","dredmorbius","coloneltcb","aaronbrethorst","cperciva","doener","gumby","Brajeshwar","tyingq","wpietri","simonw","adamnemecek","wallflower","saagarjha","Retric","lisper","bane","LinuxBender","derefr","nkurz","btilly","rntn","mpweiher","Anon84","belter","ilamont","bpierre","brudgers","ryandrake","petercooper","Someone1234","kibwen","nostromo","DiabloD3","onion2k","pavel_lishin","DoreenMichele","wmf","pavlov","feross","tzs","mmastrac","edward","Waterluvian","ghaff","JoshTriplett"];
    function topUser(user){
        return topusers.includes(user);
    }

    function getUsers(){
        $("a.hnuser").each(function() {
            var userhref=$(this).attr("href");
            if (userhref.indexOf("id=") > 0) {
                var user=userhref.substr(userhref.indexOf("id=")+3);
                console.log(user);
                if (topUser(user)){
                    //$(this).css("background-color","yellow").css("color","black");
                    //$(this).parent().parent().parent().css("background-color","yellow").css("color","black");
                    $(this).css("border-color","yellow").css("border-width","1px");
                    $(this).parent().parent().parent().find('.comment').css("border","1px solid yellow");
                  }
                }
            }
            //$(this).parent().css("background-color","red");
        );
    }

    getUsers();
})();
