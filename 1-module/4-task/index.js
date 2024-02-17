function checkSpam(str) {
  let spam = ['1xBet', 'XXX'];
  let arrSpams = [];
  spam.forEach((elem) => {
	if (str.toUpperCase().includes(elem.toUpperCase())) {
      arrSpams.push(elem);
    }
});

  if (arrSpams.length > 0) {
    return true
  } return false
}
