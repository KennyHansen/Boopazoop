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
        
        var timer = 0;
        var id = setInterval(frame, 5);
        var direction;

        if (roboImg === 'robo-img-1') {
            direction = 1
        } else {
            direction = -1
        }

        function frame() {
            if (timer == 50) {
                img.style.left = '0px'; 
                clearInterval(id);
            } else {
                var pos = Math.sin(timer/50*Math.PI)
                timer++; 
                img.style.left = (pos * direction * 70) + 'px'; 
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
        var timer = 0;
        var id = setInterval(frame, 5);

        function frame() {
            if (timer == 100) {
                img.style.left = '0px'; 
                img.style.top = '0px'; 
                // img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/3by2white.svg/150px-3by2white.svg.png"
                // img.style.opacity = 1
                clearInterval(id);
            } else {
                var pos = Math.sin(timer/7*Math.PI)
                timer++;
                img.style.left = (pos * 10) + 'px'; 
                img.style.top = timer + 'px'
                img.style.opacity = (100-timer)/100
            }
        }
    }

    dataStore.animateBuild = function (img, roboImg) {
        
    }
}