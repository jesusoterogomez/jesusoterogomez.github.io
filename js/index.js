(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"===("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports={init:b.init}:a.ityped=b}(this,function(a){function b(a){var b=a;return b.strings=a.strings||["Put your string here...","and Enjoy!"],b.typeSpeed=a.typeSpeed||100,b.backSpeed=a.backSpeed||50,b.backDelay=a.backDelay||500,b.startDelay=a.startDelay||500,b.showCursor=a.showCursor,b.loop=a.loop||!1,void 0===b.showCursor&&(b.showCursor=!0),b.showCursor&&k.insertAdjacentElement("afterend",m),void 0!==b.cursorChar&&(m.textContent=b.cursorChar),Promise.resolve(b)}function c(a,c){k=document.querySelector(a),b(c).then(function(a){l=a,d(l.strings)})}function d(a){j(a,function(b,c,d){var e=l.typeSpeed*b.length-1;l.backSpeed<l.typeSpeed?e-=(l.typeSpeed-l.backSpeed)*b.length:l.backSpeed>l.typeSpeed&&(e+=(l.backSpeed-l.typeSpeed)*b.length);var f=this.async(),h=a.length;g(k,b,c,h).then(function(){setTimeout(function(){f()},e)})},function(){l.loop&&d(a)})}function e(a,b){return new Promise(function(c,d){for(var e=function(d){count=0;var e=d,g=b.length;setTimeout(function(d){f(a,b.charAt(e)),count++,count===g-1&&c()},l.typeSpeed*d)},g=0;g<b.length;g++)e(g)})}function f(a,b){a.innerHTML+=b}function g(a,b,c,d){return new Promise(function(f,g){e(a,b).then(function(){setTimeout(function(){i(a,b,c,d).then(function(){setTimeout(function(){f()},l.startDelay)})},l.backDelay)})})}function h(a,b,c,d){for(var e=function(e){var f=e,g=c;setTimeout(function(e){a.innerHTML=b.substring(0,c-f),g--,1===f&&d()},l.backSpeed*e)},f=c;f>0;f--)e(f)}function i(a,b,c,d){return new Promise(function(e,f){var g=b.length;c+1===d?l.loop?l.loop&&h(a,b,g,e):(void 0!==l.onFinished&&"function"==typeof l.onFinished&&l.onFinished(),a.innerHTML=b):c+1!==d&&h(a,b,g,e)})}var j=function(a,b,c){var d=-1,e=a.length>>>0;!function f(g){var h,i=g===!1;do++d;while(!(d in a)&&d!==e);return i||d===e?void(c&&c(!i,a)):(g=b.call({async:function(){return h=!0,f}},a[d],d,a),void(h||f(g)))}()},k=void 0,l=void 0,m=document.createElement("span");return m.classList.add("ityped-cursor"),m.textContent="|",{init:c}}(this));
},{}],2:[function(require,module,exports){
"use strict";

var _ityped = require("ityped");

var strings = ["Javascript", "Node.js", "React", "SCSS", "Gulp", "Browserify"];

var target = '.replace';
(0, _ityped.init)(".replace", {
    strings: strings,

    //optional
    typeSpeed: 50,
    backSpeed: 35,
    startDelay: 500,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: "|"
});

},{"ityped":1}]},{},[2]);
