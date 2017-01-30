function Animation() {

    var dataStore = this

    // dataStore.animate = function(roboImg, animation) {

    //     var animateFunc = "animate" + animation
    //     var animateImg = document.getElementById(roboImg)


    //     console.log(dataStore[animateFunc])
    //     if (dataStore[animateFunc]) {
    //         dataStore[animateFunc](animateImg, roboImg)
    //     }
    // }

    dataStore.animateAttack = function(img, roboImg) {
        var pos = 0;
        var id = setInterval(frame, 5);
        var direction;

        if (roboImg === 'robo-img-1') {
            direction = 1
        } else {
            direction = -1
        }

        function frame() {
            if (pos == 50) {
                img.style.left = '0px'; 
                clearInterval(id);
            } else {
                pos++; 
                img.style.left = (pos * direction * 2) + 'px'; 
            }
        }
    }

    dataStore.animateHit = function (img, roboImg) {
        var timer = 0;
        var id = setInterval(frame, 5);

        function frame() {
            if (timer == 50) {
                img.style.left = '0px'; 
                clearInterval(id);
            } else {
                var pos = Math.sin(timer/10*Math.PI)
                timer++;
                img.style.left = (pos * 10) + 'px'; 
            }
        }
    }

    dataStore.animateDeath = function (img, roboImg) {
        
    }

    dataStore.animateBuild = function (img, roboImg) {
        
    }
}