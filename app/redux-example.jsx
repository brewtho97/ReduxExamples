const redux = require('redux');

console.log('Starting redux example...');

//NAME REDUCER AND ACTION GENERATOR
//---------------------------------
let nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name  
    default:
      return state;
  }
};

let changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
}

//HOBBY REDUCER AND ACTION GENERATOR
//---------------------------------
let nextHobbyID = 1;
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

let addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
}

let removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}

//MOVIE REDUCER AND ACTION GENERATOR
//---------------------------------
let nextMovieID = 1;
let moviesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieID++,
          title: action.title,
          genre: action.genre
        }
      ];
    case 'REMOVE_MOVIE':
      return state.filter(movie => movie.id !== action.id);
    default:
      return state;
  }
};

let addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  };
}

let removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  };
}

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
store.dispatch(changeName('Thomas')); 
store.dispatch(addHobby('Programming'));
store.dispatch(addHobby('Reading'));
store.dispatch(removeHobby(2));
//unsubscribe(); //Stops the subscribe function from running on store changes
store.dispatch(changeName('Kim'));
store.dispatch(addMovie('Scott Pilgrim vs the World', 'Comedy'));
store.dispatch(addMovie('Whiplash', 'Drama'));
store.dispatch(removeMovie(1));