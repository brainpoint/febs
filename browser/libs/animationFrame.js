
// Window.requestAnimationFrame / Window.cancelAnimationFrame
var Window = "undefined" != typeof window ? window : ("undefined" != typeof global ? global : ("undefined" != typeof self ? self : undefined));

var animationFrame = {};

var lastTime = 0;
Window.requestAnimationFrame = Window.requestAnimationFrame || Window.mozRequestAnimationFrame ||
                        Window.webkitRequestAnimationFrame || Window.msRequestAnimationFrame;

Window.cancelAnimationFrame = Window.cancelAnimationFrame || Window.mozCancelAnimationFrame;

if (!Window.requestAnimationFrame) {
    Window.requestAnimationFrame = function(callback){
        var currTime = Date.now();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = Window.setTimeout(function(){ callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}

if (!Window.cancelAnimationFrame) {
    Window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}

animationFrame.requestAnimationFrame = Window.requestAnimationFrame;
animationFrame.cancelAnimationFrame = Window.cancelAnimationFrame;

module.exports = animationFrame;