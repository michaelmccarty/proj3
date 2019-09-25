// const allTypes = [
//   "Normal",
//   "Fighting",
//   "Flying",
//   "Poison",
//   "Ground",
//   "Rock",
//   "Bug",
//   "Ghost",
//   "Fire",
//   "Water",
//   "Grass",
//   "Electric",
//   "Psychic",
//   "Ice",
//   "Dragon"
// ];

// if (moveType === "Fighting") {
//   if (
//     [
//       "Normal",
//       "Fighting",
//       "Flying",
//       "Poison",
//       "Ground",
//       "Rock",
//       "Bug",
//       "Ghost",
//       "Fire",
//       "Water",
//       "Grass",
//       "Electric",
//       "Psychic",
//       "Ice",
//       "Dragon"
//     ].includes(moveType)
//   ) {
//     return 0.5;
//   } else if (
//     [
//       "Normal",
//       "Fighting",
//       "Flying",
//       "Poison",
//       "Ground",
//       "Rock",
//       "Bug",
//       "Ghost",
//       "Fire",
//       "Water",
//       "Grass",
//       "Electric",
//       "Psychic",
//       "Ice",
//       "Dragon"
//     ].includes(type)
//   ) {
//     return 2;
//   } else if (
//     [
//       "Normal",
//       "Fighting",
//       "Flying",
//       "Poison",
//       "Ground",
//       "Rock",
//       "Bug",
//       "Ghost",
//       "Fire",
//       "Water",
//       "Grass",
//       "Electric",
//       "Psychic",
//       "Ice",
//       "Dragon"
//     ].includes(type)
//   ) {
//     return 0;
//   } else {
//     return 1;
//   }
// }

const typechart = (moveType, type) => {
  console.log(moveType + " against " + type);
  if (moveType === "Normal") {
    if (["Rock"].includes(moveType)) {
      return 0.5;
    } else if (["Ghost"].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Fighting") {
    if (["Flying", "Poison", "Bug", "Psychic"].includes(type)) {
      return 0.5;
    } else if (["Normal", "Rock", "Ice"].includes(type)) {
      return 2;
    } else if (["Ghost"].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Flying") {
    if (["Rock", "Electric"].includes(type)) {
      return 0.5;
    } else if (["Fighting", "Bug", "Grass"].includes(type)) {
      return 2;
    } else if ([].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Poison") {
    if (["Poison", "Ground", "Rock"].includes(type)) {
      return 0.5;
    } else if (["Grass"].includes(type)) {
      return 2;
    } else if ([].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Ground") {
    if (["Poison", "Rock", "Fire", "Electric"].includes(type)) {
      return 0.5;
    } else if (["Bug", "Grass"].includes(type)) {
      return 2;
    } else if (["Flying"].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Rock") {
    if (["Fighting", "Ground"].includes(type)) {
      return 0.5;
    } else if (["Flying", "Bug", "Fire", "Ice"].includes(type)) {
      return 2;
    } else if ([].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Bug") {
    if (["Grass", "Psychic"].includes(type)) {
      return 0.5;
    } else if (
      ["Fighting", "Flying", "Poison", "Ghost", "Fire"].includes(type)
    ) {
      return 2;
    } else if ([].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Ghost") {
    if ([].includes(type)) {
      return 0.5;
    } else if (["Ghost"].includes(type)) {
      return 2;
    } else if (["Normal, Psychic"].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Fire") {
    if (["Rock", "Fire", "Water", "Dragon"].includes(type)) {
      return 0.5;
    } else if (["Bug", "Grass", "Ice"].includes(type)) {
      return 2;
    } else if ([].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Water") {
    if (["Water", "Grass", "Dragon"].includes(type)) {
      return 0.5;
    } else if (["Ground", "Rock", "Fire"].includes(type)) {
      return 2;
    } else if ([].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Grass") {
    if (["Flying", "Poison", "Bug", "Fire", "Grass", "Dragon"].includes(type)) {
      return 0.5;
    } else if (["Ground", "Rock", "Water"].includes(type)) {
      return 2;
    } else if ([].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Electric") {
    if (["Grass", "Electric", "Dragon"].includes(type)) {
      return 0.5;
    } else if (["Flying", "Water"].includes(type)) {
      return 2;
    } else if (["Ground"].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Psychic") {
    if (["Psychic"].includes(type)) {
      return 0.5;
    } else if (["Fighting", "Poison"].includes(type)) {
      return 2;
    } else if ([].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Ice") {
    if (["Fire", "Water", "Ice"].includes(type)) {
      return 0.5;
    } else if (["Flying", "Ground", "Grass", "Dragon"].includes(type)) {
      return 2;
    } else if ([].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (moveType === "Dragon") {
    if ([].includes(type)) {
      return 0.5;
    } else if (["Dragon"].includes(type)) {
      return 2;
    } else if ([].includes(type)) {
      return 0;
    } else {
      return 1;
    }
  }
};

// console.log(typechart("Normal", "Ground"));

const typeModifier = (moveType, type1, type2) => {
  console.log(`${moveType} against a ${type1}, ${type2} type`);
  const a = typechart(moveType, type1);
  const b = typechart(moveType, type2);
  return a * b;
};


console.log(typeModifier("Grass", "Water", "Rock"))