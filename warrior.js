// Support Lackey
var attack_mode = true;
var targetStr = "squig";
var isMovingToTown = false;
var playerToSupportName = "DickKickem";
var _currEnemyId = 0;
var _prevEnemyId = 0;

setInterval(function(){
    if(item_quantity("hpot0") === 0 && isMovingToTown === false) {
        game_log("Low on Health potions. Going to town", "#E0C34C");
        isMovingToTown = true;
        smart_move({to:"town"}, function(r) {
            buyPotions(item_quantity("hpot0"),item_quantity("mpot0"));
            isMovingToTown = false;
        });
        return;
    }
    if(item_quantity("mpot0") === 0 && isMovingToTown === false) {
        game_log("Low on Magic potions. Going to town", "#E0C34C");
        isMovingToTown = true;
        smart_move({to:"town"}, function(r) {
            buyPotions(item_quantity("hpot0"),item_quantity("mpot0"));
            isMovingToTown = false;
        });
        return;
    }
    
    if((character.max_hp - character.hp >= 200) ||
       (character.max_mp - character.mp >= 200)) { 
        use_hp_or_mp();
    }
    
    loot();

    if(!attack_mode || character.rip || is_moving(character)) return;
    var player = get_player(playerToSupportName);
    var target=get_target_of(player);//get_nearest_monster({type:targetStr});
    if(!target)
    {
        move(
           character.x+(player.x-character.x+10)/2,
            character.y+(player.y-character.y+10)/2
            );
        target=get_target_of(player);
        
        return;
    }
    
    if(!in_attack_range(target))
    {
        move(character.x+(target.x-character.x)/2,
            character.y+(target.y-character.y)/2
            );
            // Walk half the distance
    }
    else if(can_attack(target))
    {
        set_message("Attacking");
        attack(target);
		
		_currEnemyId = target.id;
        tauntEnemy(target);
		useSpecialAttack(target);
		_prevEnemyId = _currEnemyId;
    }

},1000/8); // Loops every 1/4 seconds.

function tauntEnemy(target) {
	// Only taunt the same enemy once
	if(_currEnemyId !== _prevEnemyId) {
		// Pick a taunt type
		if(character.level >= 68 && can_use("agitate")){
			// AGITATE
			// NOTE: Game will ignore if 2.2sec cooldown has not expired
			use_skill("agitate", target);
		} else if(can_use("taunt")) {
			// TAUNT!
			// NOTE: Game will ignore if 3sec cooldown has not expired
			use_skill("taunt", target);
		}
	} else {
		// Wait...
	}
}

function useSpecialAttack(target) {
	// Only special attack the same enemy once
	/*
		WARRIOR: 
		- War Cry: lvl 70
		- Cleave: lvl 52
		- Stomp: lvl 52
	*/
	if(_currEnemyId !== _prevEnemyId) {
		// Pick an attack type
		if(character.level >= 70 && can_use("warcry")){
			console.log("WAR CRY");
			// WAR CRY
			// NOTE: Game will ignore if 60sec cooldown has not expired
			use_skill("warcry", target);
		} else if(character.level >= 52) {
			// Stomp and Cleave
			if(can_use("stomp")) {
				// NOTE: Game will ignore if 24sec cooldown has not expired
				use_skill("stomp", target);
			}
			
			if(can_use("cleave")) {
				// NOTE: Game will ignore if 1.2sec cooldown has not expired
				use_skill("cleave", target);
			}
		}
	} else {
		// Wait...
	}
}

function item_quantity(name)
{
    for(var i=0;i<42;i++)
    {
        if(character.items[i] && character.items[i].name==name) 
            return character.items[i].q||0;
    }
    return 0;
}

function buyPotions(currHealth, currMag) {
    buy("hpot0", 100 - currHealth);
    buy("mpot0", 100 - currMag);
    game_log("Buying Potions", "#E0C34C");
}

// Learn Javascript: https://www.codecademy.com/learn/learn-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
