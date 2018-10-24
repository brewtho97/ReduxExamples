const redux = require('redux');

console.log('Starting redux example...');

let stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
}

let nextHobbyID = 1;
let nextMovieID = 1;

let nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name  
    default:
      return state;
  }
};

let hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyID++,
          hobby: action.hobby
        }
      ];
    case 'REMOVE_HOBBY':
      return state.filter(hobby => hobby.id !== action.id);
    default:
      return state;
  }
};

let moviesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieID++,
          title: action.movie.title,
          genre: action.movie.genre
        }
      ];
    case 'REMOVE_MOVIE':
      return state.filter(movie => movie.id !== action.id);
    default:
      return state;
  }
};

let reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

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