// -------------------------
// MAGE
// -------------------------

// Vars
const attackMode = true;
const targetStr = 'squig';
let isMovingToTown = false;

// Methods
function getItemQuantity(name) {
  // eslint-disable-next-line
  for (let i = 0; i < 42; i++) {
    if (character.items[i] && character.items[i].name === name) {
      return character.items[i].q || 0;
    }
  }
  return 0;
}

function buyPotions(currHealth, currMag) {
  buy('hpot0', 100 - currHealth);
  buy('mpot0', 100 - currMag);
  game_log('Buying Potions', '#E0C34C');
}

function exchangeThings() {
  let retval = false;
  for (let i = 0; i < character.items.length; i++) {
    const slot = character.items[i];
    if (slot) {
      switch (slot.name) {
        case 'candypop':
          retval = i;
          exchange(i);
          break;
        default:
          // do nothing
          break;
      }
    }
  }
  return retval;
}

// Main Loop
setInterval(() => {
  if (getItemQuantity('hpot0') === 0 && isMovingToTown === false) {
    game_log('Low on Health potions. Going to town', '#E0C34C');
    isMovingToTown = true;
    smart_move({ to: 'town' }, (r) => {
      buyPotions(getItemQuantity('hpot0'), getItemQuantity('mpot0'));
      isMovingToTown = false;
    });
    return;
  }
  if (getItemQuantity('mpot0') === 0 && isMovingToTown === false) {
    game_log('Low on Magic potions. Going to town', '#E0C34C');
    isMovingToTown = true;
    smart_move({ to: 'town' }, (r) => {
      buyPotions(getItemQuantity('hpot0'), getItemQuantity('mpot0'));
      isMovingToTown = false;
    });
    return;
  }

  if ((character.max_hp - character.hp >= 200)
       || (character.max_mp - character.mp >= 300)) {
    use_hp_or_mp();
  }

  loot();

  if (!attackMode || character.rip || is_moving(character)) return;

  const target = get_nearest_monster({ type: targetStr });
  if (!target) {
    smart_move({ to: targetStr }, (r) => {
      if (r) game_log(`W00t ${targetStr} spawn!`, '#E0C34C');
    });
    return;
  }

  if (!in_attack_range(target)) {
    move(
      character.x + (target.x - character.x) / 2,
      character.y + (target.y - character.y) / 2,
    );
    // Walk half the distance
  } else if (can_attack(target)) {
    set_message(`Attacking: ${target.mtype}`);
    attack(target);
    // game_log("Target: " + parent.game_stringify(target, 2));
    // game_log("Target Distance: " + parent.distance(character, target));
  }

  if (parent.distance(character, target) < 50) {
    // game_log("Range: " + currentTargetRange);
    // game_log("I'm all out of ass!!!");
  }

  // if(character.gold > 9000) {
  // smart_move({to:"town"});
  // attackMode = false;
  // }
}, 1000 / 8); // Loops every 1/4 seconds.

/*
  EVENTS:
  - sell
  - trade
*/
game.all((event, args) => {
  game_log(`event.name: ${event.name}`);
  game_log(event, 'orange');
  game_log(JSON.stringify(args));
});

game.on('trade', (args) => {
  game_log('trade...');
  game_log(JSON.stringify(args));
});
