function makeFriendsList(friends) {
  let ul = document.createElement('UL');
  for (let friend of friends) {
    ul.insertAdjacentHTML('beforeEnd', `<li>${friend.firstName} ${friend.lastName}</li>`);
  }
  return ul
}
