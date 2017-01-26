// var health = 100
// TODO (for fun?)

// 1) (DONE) refactor health into healthbars 
// 2) make sprites play with different moves/states
// 3) add cool sounds
// 4) change buttons to actual keystrokes for movement and attacks
// 5) make hitboxes a thing
// 6) make new players spawn after defeating an old one
// 7) add a counter-attack method


// Constructors
var GameService = function () {

    var minHealth = 30
    var maxHealth = 300

    var minMS = 10
    var maxMS = 100

    // Seed function    
    // in order to work 'Math.seed' must NOT be undefined,
    // so in any case, you HAVE to provide a Math.seed
    Math.seededRandom = function(max, min) {
        max = max || 1;
        min = min || 0;
    
        Math.seed = (Math.seed * 9301 + 49297) % 233280;
        var rnd = Math.seed / 233280;
    
        return min + rnd * (max - min);
    }

    var dataStore = this;

    function Player(name, health, attacks, mobility, robo) {
        this.name = name
        this.health = health;
        this.maxHealth = health;
        this.attacks = attacks;
        this.mobility = mobility;
        // this.equippedItems = [];
        // this.stashedItems = [];
        this.isAlive = true;
        this.robo = robo;
        // this.sprite = name + '.png';
        // this.hits = 0;
    }

    function Item(itemName, itemValue, itemDescription) {
        this.name = itemName;
        this.value = itemValue;
        this.description = itemDescription;
    }

    var players = {}

    var items = {
        shield1: new Item("Shield of Lesser Blocking", { block: 2 }, "This blocks 2 damage"),
        shield2: new Item("Shield of Blocking", { block: 5 }, "This blocks 5 damage"),
        shield3: new Item("Shield of Greater Blocking", { block: 12 }, "This blocks 12 damage"),
        shield4: new Item("Shield of Master Blocking", { block: 20, bonusHealth: 50 }, "This blocks 20 damage"),

        heal1: new Item("Choccy Milk", { heal: 10 }, "Doot")
    }

    var attacks1 = [
        '0010101001011001001000010001001',
        'boopa',
        'klurgle',
        'yonkle',
        'spooter',
        'fizzle',
        'brickle',
        'mecha',
        'moople',
        'kizzuble',
        'klappa',
        'dronkle',
        'zupa',
        'crackle',
        'freeka',
        'noodle',
        'bloopa',
        'blinkle',
        'scrabble',
        'oggle',
        'pizzal',
        'chooga',
        'zip',
        'chonkle',
        'burple',
        'churple',
        'zuka',
        'blabble'
    ]

    var attacks2 = [
        '01010010001010100100100100100010101010101010',
        'zoop',
        'blitz',
        'derp',
        'kahoot',
        'zerp',
        'chik',
        'clunk',
        'bap',
        'zork',
        'zorp',
        'zoop',
        'tron',
        'tink',
        'flop',
        'bzzzzrrrt',
        'zop-zippity-zoop',
        '01010010001010100100100100100010101010101010'
    ]


    dataStore.getPlayerHealth = function(playerName) {
        return players[playerName].health
    }

    dataStore.getPlayerHealthPercent = function(playerName) {
        return (players[playerName].health / players[playerName].maxHealth) * 100
    }

    dataStore.getPlayerHits = function(playerName) {
        return players[playerName].hits
    }

    dataStore.getAttackDamage = function(attackerName, attackName) {
        return players[attackerName].attacks[attackName]
    }


    dataStore.getBotSpeed = function(botName) {
        return players[botName].mobility
    }

    dataStore.equipItem = function(playerName, itemKey) {
        var player = players[playerName]
        var item1 = items[itemKey]
        if (items[itemKey] == item1 || items[itemKey].name == itemKey) {
            searchItems(playerName, item1)
            player.equippedItems.push(items[itemKey])
            console.log(player.name + ' has equipped ' + items[itemKey].name + "!")
        }
    }

    dataStore.startAttack = function(attackerName, targetName) {
        var attacker = players[attackerName]
        var target = players[targetName]
        var damageType = getRandomAttack(attacker)

        dataStore.dealDamage(attackerName, targetName, damageType)
    }
    
    dataStore.dealDamage = function(attackerName, targetName, attackType) {
        var attacker = players[attackerName]
        var target = players[targetName]
        var health = target.health
        var attackName = attackType.name
        var damage = attackType.damage
        if (!attacker.isAlive) {
            console.log(attacker.name + ' is down, the fight is over!')
        } else if (target.isAlive) {
            // Health Check
            if (health <= damage) {
                //Don't let the health drop below 0
                logDamage(attacker, target, attackType, health, false)
                killPlayer(target)
            } else {
                logDamage(attacker, target, attackType, damage, true)
                target.health = +(health - damage).toFixed(1);
            }
            var counter = setTimeout(function(){counterAttack(target, attacker); }, 1000);
            draw()
        } else {
            console.log(target.name + ' is down, the fight is over!')
        }
    }

    var counterAttack = function(target, attacker) {
        var damageType = getRandomAttack(target)
        var targetName = target.robo.toLowerCase()
        var attackerName = attacker.robo.toLowerCase()
        dataStore.dealDamage(targetName, attackerName, damageType, true)
    }

    var getRandomAttack = function(player) {
        var attacks = player.attacks
        var randomIndex = Math.floor((Object.keys(attacks).length * Math.random()))
        var counter = 0
        
        for(attack in attacks) {
            if (counter == randomIndex) {
                return attacks[attack];
            } else {
                counter++;
            }
        }
    }
    // dataStore.useItem = function(playerName, itemKey) {
    //     var player = players[playerName]
    //     var item1 = items[itemKey]
    //     if (item1.value.heal) {
    //         healDamage(player, item1.value.heal, item1.name)
    //     }
    // }

    dataStore.generateBot1 = function(botName) {
        console.log("Robot 1 created")

        //Create image and remove text input
        var botImage = document.getElementById('robo-img-1')
        var botImageUrl = "https://robohash.org/" + botName + '.png'
        botImage.src = botImageUrl

        var roboNames = document.getElementById('robo-name-1')
        roboNames.elements[0].parentNode.removeChild(roboNames.elements[0])
        roboNames.innerHTML = `<h3 class="player-name">${botName}</h3> ${roboNames.innerHTML}`

        //Create stats
        var stringNum = 0
        for (var i = 0; i < botName.length; i++) {
            stringNum += botName.charCodeAt(i);
        }

        Math.seed = stringNum;

        var health = getRandomValue(minHealth, maxHealth)
        var attacks = generateAttacks()
        var mobility = getRandomValue(minMS, maxMS)

        players.robo1 = new Player(botName, health, attacks, mobility, 'robo1')


        // players[botName] = new Player(botName, health, attacks, mobility)
    }

    dataStore.generateBot2 = function(botName) {
        console.log("Robot 2 created")

        //Create image and remove text input
        var botImage = document.getElementById('robo-img-2')
        var botImageUrl = "https://robohash.org/" + botName + '.png'
        botImage.src = botImageUrl

        var roboNames = document.getElementById('robo-name-2')
        roboNames.elements[0].parentNode.removeChild(roboNames.elements[0])
        roboNames.innerHTML = `<h3 class="player-name">${botName}</h3> ${roboNames.innerHTML}`

        //Create stats
        var stringNum = 0
        for (var i = 0; i < botName.length; i++) {
            stringNum += botName.charCodeAt(i);
        }

        Math.seed = stringNum;

        var health = getRandomValue(minHealth, maxHealth)
        var attacks = generateAttacks()
        var mobility = getRandomValue(minMS, maxMS)

        players.robo2 = new Player(botName, health, attacks, mobility, 'robo2')
    }




    // var searchItems = function(playerName, item) {
    //     var player = players[playerName]
    //     var equippedItems = player.equippedItems
    //     var stashedItems = player.stashedItems
    //     var itemType = item.type
    //     for (var i = 0; i < equippedItems.length; i++) {
    //         var equippedItem = equippedItems[i];
    //         if (equippedItem.type == itemType) {
    //             equippedItems.splice(i, 1)
    //             stashedItems.push[equippedItem]
    //             console.log(player.name + " has moved " + equippedItem.name + " into their stash.")
    //         }
    //     }
    // }

    function killPlayer(player) {
        player.health = 0;
        player.isAlive = false;
    }

    function logDamage(attacker, target, attackType, damage, isAlive) {
        console.log(attacker.name + " hits " + target.name + " with " + attackType.name + " for " + damage + " damage (" + target.health + "=>" + (target.health - damage) + ")");
        if (!isAlive) {
            console.log(attacker.name + ' knocked out ' + target.name + '!!!')
        }
    }


    function playSound(soundFile) {
        // Plays a sound like Hadouken
        var audio = new Audio('sounds/' + soundFile + '.mp3');
        audio.play();
    }

    var generateAttacks = function() {

        var attackArray1 = getRandomValues(0,attacks1.length, 4)
        var attackArray2 = getRandomValues(0,attacks2.length, 4)

        var leAttacks = {
            attack1:{
                string1:attacks1[attackArray1[0]],
                string2:attacks2[attackArray2[0]],
                name:attacks1[attackArray1[0]] + attacks2[attackArray2[0]],
                damage:attackArray1[0] + attackArray2[0]
            },
            attack2:{
                string1:attacks1[attackArray1[1]],
                string2:attacks2[attackArray2[1]],
                name:attacks1[attackArray1[1]] + attacks2[attackArray2[1]],
                damage:attackArray1[1] + attackArray2[1]
            },
            attack3:{
                string1:attacks1[attackArray1[2]],
                string2:attacks2[attackArray2[2]],
                name:attacks1[attackArray1[2]] + attacks2[attackArray2[2]],
                damage:attackArray1[2] + attackArray2[2]
            },
            attack4:{
                string1:attacks1[attackArray1[3]],
                string2:attacks2[attackArray2[3]],
                name:"HYPER" + (attacks1[attackArray1[3]] + attacks2[attackArray2[3]]).toUpperCase(),
                damage:(attackArray1[3] + attackArray2[3]) * 2
            },
        }
        return leAttacks
        
    }

    var getRandomValue = function(num1, num2) {
        return Math.seededRandom(num1, num2).toFixed()
    }

    var getRandomValues = function(num1, num2, amount) {
        var values = []
        for (var i = num1; i < amount; i++) {
            values.push(Math.floor(Math.seededRandom(i, num2)))
        }
        return values
    }

    function draw() {
        var health1 = dataStore.getPlayerHealth('robo1')
        var health2 = dataStore.getPlayerHealth('robo2')

        var healthPercent1 = dataStore.getPlayerHealthPercent('robo1')
        var healthPercent2 = dataStore.getPlayerHealthPercent('robo2')


        var playerHealthId = document.getElementById("robo-health-1");
        var playerHealthTag = playerHealthId.getElementsByTagName("span");
        playerHealthTag[0].style = "width:" + healthPercent1 + "%"

        var playerHealthId = document.getElementById("robo-health-2");
        var playerHealthTag = playerHealthId.getElementsByTagName("span");
        playerHealthTag[0].style = "width:" + healthPercent2 + "%"
    }
    
    // var updateHits = function(playerName) {
    //     var player = players[playerName]
    //     player.hits += 1;
    // }

    // var healDamage = function(target, heal, healType) {
    //     var health = target.health
    //     if (!target.isAlive) {
    //         console.log(target.name + ' is down, the fight is over!')
    //     } else if (target.isAlive) {
    //         if (target.health + heal > target.maxHealth) {
    //             heal = target.maxHealth - target.health
    //         }
    //         logHealing(target, heal, healType)
    //         target.health += heal
    //     }
    // }

    // function filterDamage(target, damage) {
    //     var block = 0
    //     if (target.equippedItems) {
    //         for (var i = 0; i < target.equippedItems.length; i++) {
    //             var item = target.equippedItems[i];
    //             if (item.value.block) block += item.value.block;
    //         }
    //     }
    //     damage = damage - block
    //     if (damage < 0) damage = 0;
    //     return damage
    // }
    // function logHealing(target, heal, healType) {
    //     console.log(target.name + " used " + healType + " to restore " + heal + " health (" + (target.health) + "=>" + (target.health + heal) + ")");
    // }

}
