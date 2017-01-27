
var GameController = function () {

    var game = new GameService()

    this.onAttack = function(attacker, target, attackName) {
        game.dealDamage(attacker, target, attackName)
        draw()
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
                game.startAttack('robo1','robo2')
            } else {
                game.startAttack('robo2','robo1')
            }
        }
    }

    this.reset = function() {
        if(checkGameState())  {
            var roboName1 = document.getElementById('robo-name-1')
            var roboName2 = document.getElementById('robo-name-2')

            roboName1.innerHTML = `
                <input type="text" class="player-name" placeholder="Enter robot name" maxLength="17" required></input>
				<button type="submit">Build</button>
            `

            roboName2.innerHTML = `
                <input type="text" class="player-name" placeholder="Enter robot name" maxLength="17" required></input>
				<button type="submit">Build</button>
            `

            document.getElementById('robo-img-1').src = ''
            document.getElementById('robo-img-2').src = ''

            game.toggleResetButton()
            game.updateLog("Game is Reset")
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
}