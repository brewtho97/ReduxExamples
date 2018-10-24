const redux = require('redux');
const axios = require('axios');

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

//MOVIE REDUCER AND ACTION GENERATOR
//---------------------------------
let mapReducer = (state = {isFetching: false, url:undefined}, action) => {
  switch(action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      };
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;
  }
};

let startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

let completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

let fetchLocation = () => {
  store.dispatch(startLocationFetch());
  axios.get('http://ipinfo.io').then((response) => {
    let loc = response.data.loc;
    let baseURL = 'http://maps.google.com?q=';

    store.dispatch(completeLocationFetch(baseURL + loc));
  })
}

let reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
});

let store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

let unsubscribe = store.subscribe(() => {
  let state = store.getState();
  console.log('New State: ', store.getState());

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...'
  } 
  else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>'
  }
});
//unsubscribe(); //Stops the subscribe function from running on store changes

fetchLocation();
//Sends off an action, reducer has to handle the action.
store.dispatch(changeName('Thomas')); 

store.dispatch(addHobby('Programming'));
store.dispatch(addHobby('Reading'));
store.dispatch(removeHobby(2));

store.dispatch(changeName('Kim'));

store.dispatch(addMovie('Scott Pilgrim vs the World', 'Comedy'));
store.dispatch(addMovie('Whiplash', 'Drama'));
store.dispatch(removeMovie(1));