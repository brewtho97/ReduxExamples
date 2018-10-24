const redux = require('redux');

console.log('Starting redux example...');

let stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
}

let nextHobbyID = 1;
let nextMovieID = 1;

let reducer = (state = stateDefault, action) => {
  //existingState = existingState || {name: 'Anonymous'};
  switch(action.type) {
    case 'CHANGE_NAME':
      return {
       ...state,
       name: action.name 
      };
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id: nextHobbyID++,
            hobby: action.hobby
          }
        ]
      };
    case 'REMOVE_HOBBY':
      return {
        ...state,
        hobbies: state.hobbies.filter(hobby => hobby.id !== action.id)
      }
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: nextMovieID++,
            title: action.movie.title,
            genre: action.movie.genre
          }
        ]
      }
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter(movie => movie.id !== action.id)
      }
    default: 
      return state;
  }
};

let store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

let unsubscribe = store.subscribe(() => {
  let state = store.getState();
  console.log('New Name: ', state.name);
  console.log('New State: ', store.getState());
  document.getElementById('app').innerHTML = state.name;
});

//Sends off an action, reducer has to handle the action.
store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Thomas'
}); 

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Programming'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Reading'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});
//unsubscribe(); //Stops the subscribe function from running on store changes

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Amelia'
});

store.dispatch({
  type: 'ADD_MOVIE',
  movie: {title: 'Scott Pilgrim Vs the World', genre: 'Comedy'}
});

store.dispatch({
  type: 'ADD_MOVIE',
  movie: { title: 'Whiplash', genre: 'Thriller' }
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
});