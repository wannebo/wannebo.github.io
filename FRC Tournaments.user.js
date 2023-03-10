// ==UserScript==
// @name         FRC Tournaments
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  go 111!
// @author       You
// @match        https://www.thebluealliance.com/event/*
// @match        https://ftc-results.firstillinoisrobotics.org/*/events/*
// @icon         https://www.google.com/s2/favicons?domain=thebluealliance.com
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @run-at       document-body
// @grant        none
// ==/UserScript==

var teams={};
function getTeams(){
    $(".team-name a").each(function() {
        var teamnbr=$(this).html().split('<br>')[0];
        var teamname=$(this).html().split('<br>')[1];
        var team={};
        team.name=teamname;
        team.rank=99;
        teams[teamnbr]=team;
    });
}

function getRanks(){
    var rank=1;
    $("#rankingsTable a").each(function() {
        teams[$(this).html().split("<br>")[0]].rank=rank;
        rank++;
    });
}

function setPreRanks(){
    var favorites=[649,930,2338,2451];
    for(var t in favorites){
       if (t in teams){
           teams[t].rank=9;
       }
    }

}

function init(){
       getTeams();
       //setPreRanks();
       getRanks();
       labelTeams();
       setTimeout(reload,(10*60000));
}

function hidematches(cutoffrank){
    $("a[href*='/team/'").each(function() {
        var teamnbr=$(this).text();
        if((teamnbr.length>0 && teamnbr.length<5) && teams[teamnbr]){
            if(teams[teamnbr].rank>cutoffrank){
                $(this).parent().parent().css("height","5");
            }
        }
    });
}


function labelTeams(){
    //starttime = Date.now();
    var cutoffrank=3;
    //hidematches(cutoffrank);
    $("a[href*='/team/'").each(function() {
        var teamnbr=$(this).text();
        if((teamnbr.length>0 && teamnbr.length<5) && teams[teamnbr]){
            $(this).html(teamnbr+"<br>"+teams[teamnbr].name+""+"<br>("+teams[teamnbr].rank+")");
            if(teams[teamnbr].rank<11){
               $(this).parent().css("background-color","yellow");
               if(teams[teamnbr].rank<4){
                    $(this).parent().css("background-color","red");
                    $(this).css("color","white");
                }
            }else{
                $(this).parent().css("background-color","white");
            }

            if(teamnbr=='111'){
                $(this).parent().css("background-color","lime");

                $(this).css("color","black");
            }
            if(teamnbr=='112'){
                $(this).parent().css("background-color","blue");

                $(this).css("color","white");
            }
            //if(teams[teamnbr].rank<=cutoffrank){
            //     $(this).parent().parent().css("background-color","purple");
            //}
        }
    });
    //console.log("Elapsed: "+(Date.now()-starttime));

    setTimeout(labelTeams,20000);
}

function reload(){
    location.reload();
}

(function() {
    'use strict';

    // Your code here...
    $(document).ready(function(){

        setTimeout(init,2000);


    });
})();