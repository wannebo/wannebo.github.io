// ==UserScript==
// @name         Highlight Top User Comments
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://news.ycombinator.com/item*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ycombinator.com
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //var topusers=["tptacek","jacquesm","ingve","danso","rbanffy","patio11","pseudolus","prostoalex","tosh","ColinWright","Tomte","rayiner","Animats","JumpCrisscross","ChuckMcM","dragonwriter","todsacerdoti","luu","pjmlp","steveklabnik","jgrahamc","zdw","pjc50","jerf","uptown","coldtea","nostrademons","edw519","anigbrowl","jseliger","lelf","jrockway","walterbell","userbinator","dnetesn","aaronbrethorst","jedberg","jonbaer","signa11","davidw","llambda","sohkamyung","cperciva","fogus","toomuchtodo","adamnemecek","stavros","WalterBright","coloneltcb","DanBC","masklinn","evo_9","robin_reala","PragmaticPulp","minimaxir","dredmorbius","pmoriarty","wallflower","ceejayoz","tyingq","sp332","wglb","bane","nkurz","protomyth","btilly","saagarjha","lisper","wpietri","derefr","Retric","petercooper","DiabloD3","mooreds","brudgers","DanielBMarkham","bpierre","Anon84","Someone1234","mpweiher","crazygringo","doener","bookofjoe","ilamont","nostromo","_delirium","pavel_lishin","gumby","pcwalton","hn_throwaway_99","tzs","JoshTriplett","onion2k","DoreenMichele","adventured","edward","sethbannon","wmf","cpeterso","rdtsc"];
    var topusers=["tptacek","jacquesm","ingve","danso","pseudolus","rbanffy","tosh","Tomte","lxm","patio11","ColinWright","Animats","rayiner","JumpCrisscross","todsacerdoti","ChuckMcM","dragonwriter","TeMPOraL","luu","zdw","pjmlp","steveklabnik","jgrahamc","pjc50","jerf","coldtea","uptown","anigbrowl","nostrademons","edw519","jseliger","walterbell","jrockway","lelf","shawndumas","userbinator","signa11","jedberg","sohkamyung","tokenadult","dnetesn","WalterBright","aaronbrethorst","toomuchtodo","PragmaticPulp","jonbaer","davidw","cperciva","minimaxir","masklinn","fogus","stavros","robin_reala","adamnemecek","ceejayoz","dredmorbius","coloneltcb","DanBC","evo_9","pmoriarty","wallflower","tyingq","wglb","sp332","bane","mooreds","nkurz","wpietri","doener","protomyth","saagarjha","lisper","btilly","bookofjoe","derefr","crazygringo","Retric","hn_throwaway_99","petercooper","cwan","mpweiher","brudgers","DiabloD3","bpierre","Someone1234","DanielBMarkham","gumby","Anon84","ilamont","nostromo","feross","onion2k","DoreenMichele","pcwalton","_delirium","pavel_lishin","tzs","JoshTriplett","cpeterso","paxys"];
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
                    $(this).css("background-color","yellow");
                    $(this).parent().parent().parent().css("background-color","yellow");
                }
            }
            //$(this).parent().css("background-color","red");
        });
    }

    getUsers();
})();