function ucFirst(str) {
  let ucStr;
  if (str.length < 1) {
    ucStr = "";
  } else {
    let arrStr = str.split('');
    let first = arrStr[0].toUpperCase();
    let copyStr = [...arrStr];
    copyStr.splice(0, 1);
    ucStr = [first, ...copyStr].join('');
  }

  return ucStr
}
