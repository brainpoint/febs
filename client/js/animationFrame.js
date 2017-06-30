
// window.requestAnimationFrame / window.cancelAnimationFrame
var lastTime = 0;
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback){
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function(){ callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}