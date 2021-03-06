
var GameController = function () {

    var game = new GameService()

    // this.onAttack = function(attacker, target, attackName) {
    //     game.dealDamage(attacker, target, attackName)
    //     draw()
    // }

    this.makeBot = function(event, botNum){
        event.preventDefault()
        var roboNames = document.getElementById('robo-name-' + botNum)
        var text = roboNames.elements[0].value;
        // document.getElementById("roboName").innerHTML = text;
        if (text) {
            game.generateBot(text, botNum)
            checkGameState()
            toggleHealthDisplay(botNum)
        }
    }

    this.startFight = function() {
        if(checkGameState())  {
            var robo1Speed = game.getBotSpeed('robo1')
            var robo2Speed = game.getBotSpeed('robo2')
            
            if(robo1Speed > robo2Speed) {
                startAttack('robo1','robo2')
            } else {
                startAttack('robo2','robo1')
            }
        }
    }

    var startAttack = function(robo1, robo2) {
         game.startAttack(robo1, robo2)
    }

    this.reset = function() {
        if(checkGameState())  {
            var roboName1 = document.getElementById('robo-name-1')
            var roboName2 = document.getElementById('robo-name-2')

            var roboImg1 = document.getElementById('robo-img-1')
            var roboImg2 = document.getElementById('robo-img-2')

            roboName1.innerHTML = `
                <input type="text" class="player-name" placeholder="Enter robot name" maxLength="17" required></input>
				<button type="submit">Build</button>
            `

            roboName2.innerHTML = `
                <input type="text" class="player-name" placeholder="Enter robot name" maxLength="17" required></input>
				<button type="submit">Build</button>
            `

            roboImg1.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/3by2white.svg/150px-3by2white.svg.png"
            roboImg1.style.opacity = 1
            roboImg2.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/3by2white.svg/150px-3by2white.svg.png"
            roboImg2.style.opacity = 1

            // game.toggleResetButton()
            game.updateLog("Game is Reset")
            game.toggleResetButton()
            toggleFightButton()
            toggleHealthDisplay(1)
            toggleHealthDisplay(2)
        }
    }

    function checkGameState() {
        var roboName1 = document.getElementById('robo-name-1')
        var roboName2 = document.getElementById('robo-name-2')

        if (roboName1.elements.length === 0 && roboName2.elements.length === 0) {
            toggleFightButton()
            return true
        }
        return false
    }

    function toggleFightButton() {
        var button = document.getElementById('fight-start')
        if (button.style.display == 'block') {
            button.style.display = 'none';
        } else {
            button.style.display = 'block';
        }
    }

     function toggleHealthDisplay(botNum) {
        var playerHealthId = document.getElementById('robo-health-' + botNum)
        if (playerHealthId.style.display == 'block') {
            playerHealthId.style.display = 'none';
        } else {
            playerHealthId.style.display = 'block';
            var playerHealthTag = playerHealthId.getElementsByTagName("span");
            playerHealthTag[0].style = "width:100%"
        }
    }

    // function init() {
    //     var canvas = document.getElementById('c');
    //     var ctx = canvas.getContext('2d');

    //     var img = document.createElement('IMG');

    //     img.onload = function() {
    //         ctx.beginPath();
    //         ctx.drawImage(img, 0, 0);
    //         ctx.closePath();    
    //         ctx.globalCompositeOperation = 'destination-out';
    //     }

    //     img.src = "http://dl.dropbox.com/u/12501653/FROST.png";

    //     function drawPoint(pointX,pointY){
    //         var grd = ctx.createRadialGradient(pointX, pointY, 0, pointX, pointY, 50);
    //         grd.addColorStop(0, "rgba(255,255,255,.6)"); 
    //         grd.addColorStop(1, "transparent"); 
    //         ctx.fillStyle = grd;
    //         ctx.beginPath();
    //         ctx.arc(pointX,pointY,50,0,Math.PI*2,true);
    //         ctx.fill();
    //         ctx.closePath();
    //     }
        
    //     canvas.addEventListener('mousemove',function(e){
    //         e.preventDefault();
    //         drawPoint(e.screenX,e.screenY - 64);
    //     },false);
    // }
    

    function draw() {
        var health1 = game.getPlayerHealth('robo1')
        var health2 = game.getPlayerHealth('robo2')

        var healthPercent1 = game.getPlayerHealthPercent('robo1')
        var healthPercent2 = game.getPlayerHealthPercent('robo2')


        var playerHealthId = document.getElementById("robo-health-1");
        var playerHealthTag = playerHealthId.getElementsByTagName("span");
        playerHealthTag[0].style = "width:" + healthPercent1 + "%"

        var playerHealthId = document.getElementById("robo-health-2");
        var playerHealthTag = playerHealthId.getElementsByTagName("span");
        playerHealthTag[0].style = "width:" + healthPercent2 + "%"
    }
    

    // this.onAddItem = function(playerName, itemName) {
    //     game.equipItem(playerName, itemName)
    // }

    // this.onUseItem = function(playerName, itemName) {
    //     game.useItem(playerName, itemName)
    //     draw()
    // }

    // this.onReset = function(player1, player2) {
    //     game.reset()
    //     console.log("Game is Reset")
    //     draw() 
    // }
}