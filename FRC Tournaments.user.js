// ==UserScript==
// @name         Blue Alliance Decoder
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Updates Blue Alliance Results page with team name and current rank, highlighting top 3,8 and 24 teams. (Go 111/112!)
// @author       Erik Wannebo
// @match        https://www.thebluealliance.com/event/*
// @icon         https://www.google.com/s2/favicons?domain=thebluealliance.com
// @require	     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
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
function fixColumns(){

    $("#results div.row div.col-sm-6").each(function() {
        console.log('column');
        $(this).after($("</div><div class='row'>"));
    });
}

function init(){
       getTeams();
       getRanks();
       fixColumns();
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

function setColors(elem,bgcolor,fntcolor){
    $(elem).parent().css("background-color",bgcolor);
    $(elem).css("color",fntcolor);
}

function labelTeams(){
    $("a[href*='/team/'").each(function() {
        var teamnbr=$(this).text();
        if((teamnbr.length>0 && teamnbr.length<5) && teams[teamnbr]){
            $(this).html(teamnbr+"<br>"+teams[teamnbr].name+""+"<br>("+teams[teamnbr].rank+")");
            if(teams[teamnbr].rank<25){
               setColors(this,"yellow","black");
                if(teams[teamnbr].rank<9){
                    setColors(this,"orange","black");
                    if(teams[teamnbr].rank<4){
                        setColors(this,"red","white");
                    }
                }
            }else{
                 setColors(this,"white","black");
            }
            if(teamnbr=='111'){
                setColors(this,"lime","black");
            }
            if(teamnbr=='112'){
               setColors(this,"blue","white");
            }
        }
    });
    setTimeout(labelTeams,20000);
}

function reload(){
    location.reload();
}

(function() {
    'use strict';
    $(document).ready(function(){
        setTimeout(init,2000);
    });
})();
