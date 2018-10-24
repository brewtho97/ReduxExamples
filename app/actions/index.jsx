const axios = require('axios');

export let changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
}

export let addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
}

export let removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}

export let addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  };
}

export let removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  };
}

export let startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

export let completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

export let fetchLocation = () => {
  return (dispatch, getState) => {
    dispatch(startLocationFetch());
    axios.get('http://ipinfo.io').then((response) => {
      let loc = response.data.loc;
      let baseURL = 'http://maps.google.com?q=';

      dispatch(completeLocationFetch(baseURL + loc));
  });
  };
};