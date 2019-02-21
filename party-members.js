function applyToParty() {
  // TODO:
  // - Update to use `parent.party_list` instead of hard-coded values
  var partyMembers = ['Player1', 'Player2', 'Etc'];

  for (let i = 0; i < partyMembers.length; i++) {
    // Select ability to apply to members...
    // Only apply if that member meets certain criteria...
    if (can_use('energize') && character.mp > 1000) {
      const partyMember = get_player(partyMembers[i]);

      if (partyMember) {
        // If the member's selected attribute meets the criteria...
        if (partyMember.mp < partyMember.max_mp - 310 && in_attack_range(partyMember)) {
          use_skill('energize', partyMember);

          return;
        }
      }
    }
  }
}
