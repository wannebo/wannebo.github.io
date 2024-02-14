// ==UserScript==
// @name              Hacker News - Dark Theme
// @namespace         https://github.com/dparpyani
// @description       A dark theme for Hacker News (YCombinator).
// @match         https://news.ycombinator.com/*
// @require           https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js
// @grant             none
// @version           1.2
// ==/UserScript==

var loadScript = function (src, callback) {
  var elem = document.createElement('script');
  elem.type = 'text/javascript';
  elem.onload = callback;
  elem.src = src;
  document.body.appendChild(elem);
};

function start() {
  var locationIs = function (regex) {
    return window.location.href.match(regex);
  };

  var config = {
    textAreaBg: '#E0E0E0',
    textAreaLeftBorder: '12px solid #CCCCCC',
    inputColor: 'black',
    inputHoverOnBg: '#CCCCCC',
    inputHoverOffBg: '#DFDFDF',
    fontColor: '#CCCCCC',
    comheadDefaultColor: '#828282',
    comheadLinksColor: 'orange',
    topBarText: '&nbsp;',
    topBarColor: '#1A1A1A',
    bodyBg: '#1A1A1A',
    centreBg: '#2B2B2B',
    commonBorderSpacing: '1px solid #2B2B2B'
  };

  // Avoid name collisions
  var myJQuery = jQuery;
  jQuery.noConflict(true);

  // Common

  //// Background colors
  myJQuery('body').css('background-color', config.bodyBg);
  myJQuery('table').css('background-color', config.centreBg);

  myJQuery('input').css('background-color', config.inputHoverOffBg);
  myJQuery('input').hover(function () {
    myJQuery(this).css('background-color', config.inputHoverOnBg);
  }, function () {
    myJQuery(this).css('background-color', config.inputHoverOffBg);
  });

  //// Text colors
  myJQuery('body').css('color', config.fontColor);
  myJQuery('table, tr, td').children().css('color', config.fontColor);
  myJQuery('font').css('color', config.fontColor);
  myJQuery('a:link').css('color', config.fontColor);
  //// Comments
  myJQuery('.c00').css('color', config.fontColor);

  myJQuery('.comhead, .subtext').css('color', config.comheadDefaultColor);
  myJQuery('.subtext > a').css('color', config.comheadLinksColor);

  myJQuery('input').css('color', config.inputColor);
  myJQuery('.pagetop:eq(1)').children().css('color', 'yellow'); // Login button

  //// Spacing
  myJQuery('td').css('border', config.commonBorderSpacing);

  if (locationIs(/.*ycombinator\.com\/rss.*/)) {
    // RSS -- No theme
  } else if (locationIs(/.*ycombinator\.com\/dmca.*/)) {
    // DMCA

  } else if (locationIs(/.*ycombinator\.com\/.*login.*/)) {
    // Login

  } else if (locationIs(/.*ycombinator\.com\/submit.*/)) {
    // Submit

  } else if (locationIs(/.*ycombinator\.com\/item.*/)) {
    // Discussions

    //// Background colors
    myJQuery('textarea').css('background-color', config.textAreaBg);
    myJQuery('textarea').css('border-left', config.textAreaLeftBorder);

    //// Text Colors
    myJQuery('.comhead > a').css('color', config.comheadLinksColor);

    //// Bar at top
    if (myJQuery('tr:first-child').has('td[bgcolor="#000000"]').length) {
        // Check for black bar
        myJQuery('tr:eq(1)').next().html(config.topBarText);
        myJQuery('tr:eq(1)').next().css('background-color', config.topBarColor);
    } else {
        myJQuery('tr:eq(0)').next().html(config.topBarText);
        myJQuery('tr:eq(0)').next().css('background-color', config.topBarColor);
    }
  } else {
    //// Bar at top
    if (myJQuery('tr:first-child').has('td[bgcolor="#000000"]').length) {
        // Check for black bar
        myJQuery('tr:eq(1)').next().html(config.topBarText);
        myJQuery('tr:eq(1)').next().css('background-color', config.topBarColor);
    } else {
        myJQuery('tr:eq(0)').next().html(config.topBarText);
        myJQuery('tr:eq(0)').next().css('background-color', config.topBarColor);
    }
  }

  //// Footer
  myJQuery('.pagetop:eq(0)').append(' | <a href="http://www.github.com/dparpyani" style="color: cyan;">Hi there :)</a>');

  myJQuery('span.age > a').each(function(index){
      //$(this).css('font-size','24 pt');
      //console.log(myJQuery(this).text());
      var age=myJQuery(this).text();
      if(age.includes("hours")){
          var hours=age.split(' ')[0];
          if((0+hours)>12){
              //console.log(myJQuery(this).closest('tr').prev().text());
              //console.log(myJQuery(this).closest('tr').prev().children('td.title').children('span.titleline').children('a').text());
              myJQuery(this).closest('tr').prev().children('td.title').children('span.titleline').children('a').css('color','#888888');
              myJQuery(this).closest('tr').children('td.subtext').children('span').children('a').css('color','#888888');
          }
      }


  });
  var comments=0;
  var itemcomments=[];
  var itemcount=0;
  myJQuery('span.subline > a[href^="item"]').each(function(index){
      var commentsline=myJQuery(this).text();
      comments=0;
      if(commentsline.includes("comments")){
          comments=commentsline.split(/\s|&nbsp;/g)[0];
          console.log(comments);
          if((0+comments)<20){
              myJQuery(this).closest('tr').prev().children('td.title').children('span.titleline').children('a').css('font-size','8pt'); ;
          }
          if((0+comments)>50){
              myJQuery(this).closest('tr').prev().children('td.title').children('span.titleline').children('a').css('font-size','14pt'); ;
          }
          if((0+comments)>100){
              myJQuery(this).closest('tr').prev().children('td.title').children('span.titleline').children('a').css('font-size','16pt'); ;
          }
      }
      itemcomments.push(comments);
      itemcount++;
  });
    itemcount=0;
    var score=0;
    myJQuery('span.subline span.score').each(function(index){
      var scoreline=myJQuery(this).text();
      score=scoreline.split(' ')[0];
      comments=itemcomments[itemcount];
      if(comments>0 && score>0 && (score/comments)>2){
          myJQuery(this).closest('tr').prev().children('td.title').children('span.titleline').children('a').css('color','#aaaa00');
      }

      itemcount++;
  });
}

start();
