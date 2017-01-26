
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

    this.makeBot1 = function(event){
        event.preventDefault()
        var roboNames = document.getElementById('robo-name-1')
        var text = roboNames.elements[0].value;
        console.log(text)
        // document.getElementById("roboName").innerHTML = text;
        if (text) {
            game.generateBot1(text)
            checkGameState()
        }
    }

    this.makeBot2 = function(event) {
        event.preventDefault()
        var roboNames = document.getElementById('robo-name-2')
        var text = roboNames.elements[0].value;
        console.log(text)
        // document.getElementById("roboName").innerHTML = text;
        if (text) {
            game.generateBot2(text)
            checkGameState()
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
        var button = document.getElementsByClassName('fight-button')
        if (button[0].style.display == 'block') {
            button[0].style.display = 'none';
        } else {
            button[0].style.display = 'block'
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

        var playerHealthId = document.getElementById("robo-health-1");
        var playerHealthTag = playerHealthId.getElementsByTagName("span");
        playerHealthTag[0].style = "width:" + healthPercent2 + "%"
    }

}