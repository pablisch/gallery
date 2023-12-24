const getLetterAvatarColourClass = (avatar) => {
  let letterClass;
  if (["A", "G", "M", "S", "Y"].includes(avatar)) letterClass = 'blue';
  else if (["B", "H", "N", "T", "Z"].includes(avatar)) letterClass = 'green';
  else if (["C", "I", "O", "U"].includes(avatar)) letterClass = 'orange';
  else if (["D", "J", "P", "V"].includes(avatar)) letterClass = 'pink';
  else if (["E", "K", "Q", "W"].includes(avatar)) letterClass = 'purple';
  else if (["F", "L", "R", "X"].includes(avatar)) letterClass = 'red';
  else letterClass = 'yellow';

  return letterClass;
}

export default getLetterAvatarColourClass;