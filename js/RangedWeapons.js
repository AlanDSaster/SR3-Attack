RANGEDWEAPONS = {

  'Streetline Special' : {
    'type' : 'pistol, hold-out',
    'concealability' : 8,
    'max ammo' : 6,
    'magazine type' : 'clip',
    'firing modes' : [ 'single shot' ],
    'power' : 4,
    'damage' : 'L',
    'weight' : .5,
    'avaiability' : 2,
    'time to obtain' : 12,
    'time to obtain uom' : 'hours',
    'cost' : 100,
    'street index' : .75,
    'legality' : '10P-E'
  },

}




ACCESSORIES = {

  'Bipod' : {
    'description' : 'Bipods are two-legged braces that extend downward from the weapon, allowing the weapon to be fired low to the ground with the user in a sitting or lying position. A bipod uses the underbarrel mount, does not affect Concealability, and provides 2 points of recoil compensation when deployed. Setting up a bipod is a Simple Action.',
    'accessory slot' : ['bottom'],
    'recoil compensation' : 2
  },

  'Concealable Holster' : {
    'description' : 'Custom-fitted to the wearer, the holster can be designed for wear over the hip, in the small of the back, under the arm, on the forearm, or on the ankle. It adds +2 to the Concealability of a pistol.',
    'accessory slot' : ['miscellaneous'],
    'for weapon type' : ['pistol'],
    'concealability' : 2
  },

  'Gas-Vent II System' : {
    'description' : '',
    'accessory slot' : ['barrel'],
    'recoil compensation' : 2,
    'concealability' : -1
  },

  'Gas-Vent II System' : {
    'description' : '',
    'accessory slot' : ['barrel'],
    'recoil compensation' : 3,
    'concealability' : -2
  },

  'Gyro Stabilization' : {
    'description' : '',
    'accessory slot' : ['bottom'],
    'for weapon type' : ['rifle', 'heavy weapon'],
    'rating' : 0,
    'max rating' : 6,
    'gyro stabilization' : this['rating']
  }






}
