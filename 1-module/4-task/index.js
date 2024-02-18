function checkSpam(str) {
  let spam = ['1xBet', 'XXX'];
  let arrSpams = [];
  spam.forEach((elem) => {
    if (str.toUpperCase().includes(elem.toUpperCase())) {
      arrSpams.push(elem);
    }
  });

  return arrSpams.length > 0;
}
