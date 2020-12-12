const VISION_NORMAL = 0;
const VISION_AUGMENTED_LOWLIGHT = 1;
const VISION_NATURAL_LOWLIGHT = 2;
const VISION_AUGMENTED_THERMOGRAPHIC = 3;
const VISION_NATURAL_THERMOGRAPHIC = 4;

const VISIBILITY_NORMAL = 0;
const VISIBILITY_FULL_DARKNESS = 1;
const VISIBILITY_MINIMAL_LIGHT = 2;
const VISIBILITY_PARTIAL_LIGHT = 3;
const VISIBILITY_GLARE = 4;
const VISIBILITY_MIST = 5;
const VISIBILITY_LIGHT_OBSTRUCTION = 6;
const VISIBILITY_HEAVY_OBSTRUCTION = 7;
const VISIBILITY_THERMAL_SMOKE = 8;

const VISIBILITY_TABLE = [
  [0,0,0,0,0], //normal
  [8,8,8,4,2], //full darkness
  [6,4,2,4,2], //minimal light
  [2,1,0,2,1], //partial light
  [2,4,2,4,2], //glare
  [2,4,2,4,2], //mist
  [4,4,2,0,0], //light obstruction
  [6,6,4,1,0], //heavy obstruction
  [4,4,4,8,6], //thermal smoke
];

const RANGETABLE = [
  [`Short`, 4],
  [`Medium`, 5],
  [`Long`, 6],
  [`Extreme`, 9]
];

const SHOTGUNS = [
  'Defiance T-250',
  'Einfield AS-7'
];

const DAMAGETABLE = [
  ['0', 0],
  ['L', 1],
  ['M', 3],
  ['S', 6],
  ['D', 10]
]

function RangedAttack(type) {

}



function UpdateWeaponsTable() {

  table = document.getElementById('WeaponsTable');
  thead = table.tHead;
  tbody = table.tBodies[0];

  for(var i=0; i<tbody.rows.length; i++) {
    shotsfired = parseInt(document.getElementsByName('FAshotsfired')[i].value);
    console.log(`shotsfired: ${shotsfired}`);
    tracers = document.getElementsByName('weaponammunition_tracers')[i].checked;
    choke = parseInt(document.getElementsByName('weaponchoke')[i].value);
    skillranks = parseInt(document.getElementsByName('weaponskillranks')[i].value);
    dicepool = parseInt(document.getElementsByName('weapondicepool')[i].value);
    weaponname = document.getElementsByName('weaponname')[i].value;
    weaponpower = parseInt(document.getElementsByName('weaponpower')[i].value);
    weapondamageindex = parseInt(document.getElementsByName('weapondamage')[i].value);
    targetrange = document.getElementsByName('weapontargetrange')[i];
    minimumrange = parseInt(document.getElementsByName('weaponminimumrange')[i].value);
    shortrange = parseInt(document.getElementsByName('weaponshortrange')[i].value);
    mediumrange = parseInt(document.getElementsByName('weaponmediumrange')[i].value);
    longrange = parseInt(document.getElementsByName('weaponlongrange')[i].value);
    extremerange = parseInt(document.getElementsByName('weaponextremerange')[i].value);
    recoilcompensation = parseInt(document.getElementsByName('weaponrecoilcompensation')[i].value);

    accessoryinternal = document.getElementsByName('weaponaccessoriesinternal')[i].value;
    accessorytop = document.getElementsByName('weaponaccessoriestop')[i].value;
    accessorybottom = document.getElementsByName('weaponaccessoriesbottom')[i].value;
    accessorybarrel = document.getElementsByName('weaponaccessoriesbarrel')[i].value;
    accessorystock = document.getElementsByName('weaponaccessoriesstock')[i].value;

    metersfromtarget = parseInt(document.getElementById('rangedattack_metersfromtarget').value);
    aimactions = parseInt(document.getElementById('rangedattack_aimactions').value);
    numberoftargets = parseInt(document.getElementById('rangedattack_numberoftargets').value);

    blindfire = document.getElementById('rangedattack_blindfire').checked;
    partialcover = document.getElementById('rangedattack_partialcover').checked;
    usingsecondfirearm = document.getElementById('rangedattack_usingsecondfirearm').checked;
    calledshot = document.getElementById('rangedattack_calledshot').checked;

    targetmovement = document.getElementById('rangedattack_targetmovement').value;
    attackermovement = document.getElementById('rangedattack_attackermovement').value;
    attackerdifficultground = document.getElementById('rangedattack_attackerdifficultground').checked;
    gyrostabilization = parseInt(document.getElementById('rangedattack_gyrostabilization').value);
    visiontype = document.getElementById('rangedattack_visiontype').value;
    visionconditions = document.getElementById('rangedattack_visionconditions').value;
    flashlight = document.getElementById('rangedattack_flashlight').checked;

    othermodifiers = parseInt(document.getElementById('rangedattack_othermodifiers').value);

    aimactionsmodifier = aimactions * -1;
    magnificationmodifier = 0;
    smartlinkmodifier = 0;
    magnification = 0;
    smartlink = 0;

    accessories = [
      accessoryinternal,
      accessorytop,
      accessorybottom,
      accessorybarrel,
      accessorystock,
    ];

    if(accessories.includes('Magnification 1')) magnification = 1;
    if(accessories.includes('Magnification 2')) magnification = 2;
    if(accessories.includes('Magnification 3')) magnification = 3;
    if(accessories.includes('Smart Link (+Goggles)')) smartlink = 1;
    if(accessories.includes('Smart Link (+Cyberware)')) smartlink = 2;
    console.log('Includes Smart Link (+Cyberware): ' + accessories.includes('Smart Link (+Cyberware)'));
    if(metersfromtarget < longrange) {
      opticsmodifier = smartlink;
    } else {
      opticsmodifier = magnification;
    }



    rangeindex=0;

    if(metersfromtarget < minimumrange) {
      targetrange.value = 'BELOW MIN RANGE';
    } else if(metersfromtarget > extremerange) {
      targetrange.value = 'OVER MAX RANGE';
    } else {
      rangeindex = -1;
      if(metersfromtarget > minimumrange) rangeindex++;
      if(metersfromtarget > shortrange) rangeindex++;
      if(metersfromtarget > mediumrange) rangeindex++;
      if(metersfromtarget > longrange) rangeindex++;
      rangeindex -= magnification;
      if(rangeindex < 0) rangeindex = 0;


      targetrange.value = `${RANGETABLE[rangeindex][0]}, TN: ${RANGETABLE[rangeindex][1]}`;

    }

    numberoftargetsmodifier = (numberoftargets - 1) * 2;

    blindfiremodifier = 0;
    partialcovermodifier = 0;
    usingsecondfirearmmodifier = 0;
    calledshotmodifier = 0;
    if(blindfire) blindfiremodifier = 8;
    if(partialcover) partialcovermodifier = 4;
    if(usingsecondfirearm) usingsecondfirearmmodifier = 2;
    if(calledshot) calledshotmodifier = 4;

    targetmovementmodifier = 0;
    switch(targetmovement) {
      case 'Stationary':
        targetmovementmodifier = -1;
        break;
      case 'Walking':
        targetmovementmodifier = 0;
        break;
      case 'Running':
        targetmovementmodifier = 2;
        break;
    }

    attackermovementmodifier = 0;
    switch(attackermovement) {
      case 'Stationary':
        attackermovementmodifier = 0;
        break;
      case 'Walking':
        switch(attackerdifficultground) {
          case true:
            attackermovementmodifier = 2;
            break;
          case false:
            attackermovementmodifier = 1;
            break;
        }
        break;
      case 'Running':
        switch(attackerdifficultground) {
          case true:
            attackermovementmodifier = 6;
            break;
          case false:
            attackermovementmodifier = 4;
            break;
        }
        break;
    }

    flashlightmodifier = 0;
    if(flashlight) flashlightmodifier = -4;
    visionmodifier = VISIBILITY_TABLE[visionconditions][visiontype];
    visionmodifier += flashlightmodifier;
    if(visionmodifier < 0) visionmodifier = 0;

    //metersfromtarget
    chokemodifier=0;
    console.group(`Weapon Shotgun Stats`);

    console.log(`SHOTGUNS.includes(${weaponname}): ${SHOTGUNS.includes(weaponname)}`);
    if(SHOTGUNS.includes(weaponname)) {
      console.log('Entering if statement');
      chokemodifier = parseInt((metersfromtarget / choke)) * -1;
    }
    console.log(
      `choke: ${choke}`
      + '\n' + `metersfromtarget: ${metersfromtarget}`
      + '\n' + `chokemodifier: ${chokemodifier}`
    );
    console.groupEnd();

    baseTN = RANGETABLE[rangeindex][1];


    attackermovementmodifier -= gyrostabilization;
    if(attackermovementmodifier < 0) attackermovementmodifier = 0;




    singleshot_TN = baseTN
      + aimactionsmodifier
      + numberoftargetsmodifier
      + blindfiremodifier
      + partialcovermodifier
      + usingsecondfirearmmodifier
      + calledshotmodifier
      + targetmovementmodifier
      + attackermovementmodifier
      + visionmodifier
      + othermodifiers
      + chokemodifier;
    if(singleshot_TN < 2) singleshot_TN = 2;
    console.group('SS/SA 1 TN');
    console.log(
        '\n' + `baseTN: ${baseTN}`
      + '\n' + `aimactionsmodifier: ${aimactionsmodifier}`
      + '\n' + `numberoftargetsmodifier: ${numberoftargetsmodifier}`
      + '\n' + `blindfiremodifier: ${blindfiremodifier}`
      + '\n' + `partialcovermodifier: ${partialcovermodifier}`
      + '\n' + `usingsecondfirearmmodifier: ${usingsecondfirearmmodifier}`
      + '\n' + `calledshotmodifier: ${calledshotmodifier}`
      + '\n' + `targetmovementmodifier: ${targetmovementmodifier}`
      + '\n' + `attackermovementmodifier: ${attackermovementmodifier}`
      + '\n' + `visionmodifier: ${visionmodifier}`
      + '\n' + `othermodifiers: ${othermodifiers}`
      + '\n' + `chokemodifier: ${chokemodifier}`
    );
    console.groupEnd();
    document.getElementsByName('weaponTN_SS')[i].value = singleshot_TN;
    document.getElementsByName('weaponTN_SA1')[i].value = singleshot_TN;
    normaldamage = DAMAGETABLE[weapondamageindex][0];
    normalpower = weaponpower - chokemodifier;
    document.getElementsByName('weaponpower_normal')[i].value = normalpower;
    document.getElementsByName('weapondamage_normal')[i].value = normaldamage;


    recoilmodifier = 1 - recoilcompensation - gyrostabilization;
    if(recoilmodifier < 0) recoil = 0;

    semiautosecondshot_TN = baseTN
      + aimactionsmodifier
      + numberoftargetsmodifier
      + blindfiremodifier
      + partialcovermodifier
      + usingsecondfirearmmodifier
      + calledshotmodifier
      + targetmovementmodifier
      + attackermovementmodifier
      + visionmodifier
      + othermodifiers
      + recoilmodifier
      + chokemodifier;
    if(semiautosecondshot_TN < 2) semiautosecondshot_TN = 2;
    console.group('SA 2 TN');
    console.groupEnd();
    document.getElementsByName('weaponTN_SA2')[i].value = semiautosecondshot_TN;

    tracersfiredmodifier=0;
    if(tracers) {
      tracersfired = 1;
      if(metersfromtarget > shortrange) {
        if(tracersfired > smartlink) {
          tracersfiredmodifier = tracersfired * -1;
          smartlinkmodifier = 0;
        } else {
          tracersfiredmodifier=0;
        }
      }
      burstpowermodifier = 3;
      burstdamagemodifier = 1;
      burstpower = weaponpower + 3 - chokemodifier;
      document.getElementsByName('weaponpower_burst')[i].value = burstpower;
      damageindex = weapondamageindex + burstdamagemodifier;
      if(damageindex > 4) damageindex = 4;
      if(damageindex < 0) damageindex = 0;
      document.getElementsByName('weapondamage_burst')[i].value = DAMAGETABLE[damageindex][0];
    }
    fullautodamageindex = parseInt(shotsfired/3);
    recoilmodifier = 3 - recoilcompensation - gyrostabilization;
    if(recoilmodifier < 0) recoil = 0;
    burstfirstshot_TN = baseTN
      + aimactionsmodifier
      + numberoftargetsmodifier
      + blindfiremodifier
      + partialcovermodifier
      + usingsecondfirearmmodifier
      + calledshotmodifier
      + targetmovementmodifier
      + attackermovementmodifier
      + visionmodifier
      + othermodifiers
      + recoilmodifier
      + chokemodifier
      + tracersfiredmodifier;
    if(burstfirstshot_TN < 2) burstfirstshot_TN = 2;
    console.group('Burst 1 TN');
    console.groupEnd();
    document.getElementsByName('weaponTN_B1')[i].value = burstfirstshot_TN;

    tracersfiredmodifier = 0;
    if(tracers) {
      tracersfired = 2;
      if(metersfromtarget > shortrange) {
        if(tracersfired > smartlink) {
          tracersfiredmodifier = tracersfired * -1;
          smartlinkmodifier = 0;
        } else {
          tracersfiredmodifier=0;
        }
      }
      burstpowermodifier = 3;
      burstdamagemodifier = 1;
      burstpower = weaponpower + 3 - chokemodifier;
      document.getElementsByName('weaponpower_burst')[i].value = burstpower;
      damageindex = weapondamageindex + burstdamagemodifier;
      if(damageindex > 4) damageindex = 4;
      if(damageindex < 0) damageindex = 0;
      document.getElementsByName('weapondamage_burst')[i].value = DAMAGETABLE[damageindex][0];
    }
    recoilmodifier = 6 - recoilcompensation - gyrostabilization;
    if(recoilmodifier < 0) recoil = 0;
    burstsecondshot_TN = baseTN
      + aimactionsmodifier
      + numberoftargetsmodifier
      + blindfiremodifier
      + partialcovermodifier
      + usingsecondfirearmmodifier
      + calledshotmodifier
      + targetmovementmodifier
      + attackermovementmodifier
      + visionmodifier
      + othermodifiers
      + recoilmodifier
      + chokemodifier
      + tracersfiredmodifier;
    if(burstsecondshot_TN < 2) burstsecondshot_TN = 2;
    console.group('Burst 2 TN');
    console.groupEnd();
    document.getElementsByName('weaponTN_B2')[i].value = burstsecondshot_TN;


    //Full Auto modifiers

    fullautopowermodifier = 0;
    tracersfiredmodifier = 0;
    fullautodamageindexmodifier = 0;
    if(tracers) {
      tracersfired = parseInt(shotsfired/3);
      if(metersfromtarget > shortrange) {
        if(tracersfired > smartlink) {
          tracersfiredmodifier = tracersfired * -1;
          smartlinkmodifier = 0;
        } else {
          tracersfiredmodifier=0;
        }
      }
      shotsfiredmodifier = parseInt(shotsfired/3) * 2;
      fullautopowermodifier = parseInt(shotsfired/3);
    }
    fullautodamageindexmodifier = parseInt(shotsfired/3);

    recoilmodifier = 0 ;
    recoilmodifier = shotsfired - recoilcompensation - gyrostabilization;
    if(recoilmodifier < 0) recoilmodifier = 0;
    fullauto_TN = baseTN
      + aimactionsmodifier
      + numberoftargetsmodifier
      + blindfiremodifier
      + partialcovermodifier
      + usingsecondfirearmmodifier
      + calledshotmodifier
      + targetmovementmodifier
      + attackermovementmodifier
      + visionmodifier
      + othermodifiers
      + recoilmodifier
      + chokemodifier
      + tracersfiredmodifier;
    if(fullauto_TN < 2) fullauto_TN = 2;
    console.group('FA TN');
    console.log(`baseTN : ${baseTN}` + '\n'
    + `aimactionsmodifier : ${aimactionsmodifier}` + '\n'
    + `numberoftargetsmodifier : ${numberoftargetsmodifier}` + '\n'
    + `blindfiremodifier : ${blindfiremodifier}` + '\n'
    + `partialcovermodifier : ${partialcovermodifier}` + '\n'
    + `usingsecondfirearmmodifier : ${usingsecondfirearmmodifier}` + '\n'
    + `calledshotmodifier : ${calledshotmodifier}` + '\n'
    + `targetmovementmodifier : ${targetmovementmodifier}` + '\n'
    + `attackermovementmodifier : ${attackermovementmodifier}` + '\n'
    + `visionmodifier : ${visionmodifier}` + '\n'
    + `othermodifiers : ${othermodifiers}` + '\n'
    + `recoilmodifier : ${recoilmodifier}` + '\n'
    + `chokemodifier : ${chokemodifier}` + '\n'
    + `tracersfiredmodifier : ${tracersfiredmodifier}`
    );
    console.groupEnd();
    document.getElementsByName('weaponTN_FA')[i].value = fullauto_TN;
    fullautopower = weaponpower + fullautopowermodifier - chokemodifier;
    document.getElementsByName('weaponpower_fullauto')[i].value = fullautopower;
    damageindex = weapondamageindex + fullautodamageindexmodifier;
    if(damageindex > 4) damageindex = 4;
    if(damageindex < 0) damageindex = 0;
    fullautodamage = DAMAGETABLE[damageindex][0];
    document.getElementsByName('weapondamage_fullauto')[i].value = fullautodamage;


    console.log(accessories);
  }
}
