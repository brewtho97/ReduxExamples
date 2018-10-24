console.log('Starting redux example...');

let actions = require('./actions/index');
let store = require('./store/configureStore').configure();

let unsubscribe = store.subscribe(() => {
  let state = store.getState();
  console.log('New State: ', state);

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...'
  } 
  else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>'
  }
});
//unsubscribe(); //Stops the subscribe function from running on store changes

store.dispatch(actions.fetchLocation());
//Sends off an action, reducer has to handle the action.
store.dispatch(actions.changeName('Thomas')); 

store.dispatch(actions.addHobby('Programming'));
store.dispatch(actions.addHobby('Reading'));
store.dispatch(actions.removeHobby(2));

store.dispatch(actions.changeName('Kim'));

store.dispatch(actions.addMovie('Scott Pilgrim vs the World', 'Comedy'));
store.dispatch(actions.addMovie('Whiplash', 'Drama'));
store.dispatch(actions.removeMovie(1));