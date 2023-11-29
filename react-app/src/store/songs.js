const CREATE   = 'songs/CREATE';
const READ_ALL = 'songs/READ_ALL';
const READ_ONE = 'songs/READ_ONE';
const READ_USR = 'songs/READ_BY_USER';
const UPDATE   = 'songs/UPDATE';
const DELETE   = 'songs/DELETE';
const PLAY     = 'songs/PLAY'

const addSong = (payload) => ({type: CREATE, payload})
const getAll  = (payload) => ({type: READ_ALL, payload})
const getOne  = (payload) => ({type: READ_ONE, payload})
const getUser = (payload) => ({type: READ_USR, payload})
const editOne = (payload) => ({type: UPDATE, payload})
const delOne  = (payload) => ({type: DELETE, payload})
const setCurr = (payload) => ({type: PLAY, payload})

export const add_song = song => async dispatch => {
  const res = await fetch('/api/songs/new', {
    method: 'POST',
    body: song
  });
  const data = await res.json();

  if (res.ok) {
    dispatch(addSong(data))
  }
  return data;
}
export const get_all_songs = () => async dispatch => {
  const res = await fetch('/api/songs');
  const data = await res.json();
  
  if (res.ok) {
    dispatch(getAll(data));
    return data;
  }
  return data;
}
export const get_one_song = id => async dispatch => {
  const res = await fetch(`/api/songs/${id}`);
  const data = await res.json();

  if (res.ok) {
    dispatch(getOne(data));
    return data;
  }
  return data;
}
export const get_user_songs = id => async dispatch => {
  const res = await fetch(`/api/users/${id}/songs`);
  const data = await res.json();

  if (res.ok) {
    dispatch(getUser(data));
  }
  return data;
}
export const update_song = song => async dispatch => {
  const { name, image_url } = song;
  const res = await fetch(`/api/songs/${song.id}`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({name, image_url})
  })
  const data = await res.json();

  if (res.ok) {
    dispatch(editOne(data));
  }
  return data;
}
export const delete_song = id => async dispatch => {
  const res = await fetch(`/api/songs/${id}`, {
    method: 'DELETE'
  });
  const data = res.json();

  if (res.ok) {
    dispatch(delOne(id));
  }
  return data;
}
export const set_current = song => async dispatch => {
  dispatch(setCurr(song));
}

const initialState = {songs: {}, currentSong: null};

export default function reducer(state = initialState, action) {
	let newState = {
    songs: {...state.songs},
    currentSong: state.currentSong
  };
  switch (action.type) {
		case CREATE:
      newState.songs[action.payload.id] = action.payload;
			return newState;
		case READ_ALL:
      action.payload.songs.forEach(song => {
        newState.songs[song.id] = song;
      });
      return newState;
    case READ_ONE:
      newState.currentSong = action.payload;
      return newState;
    case READ_USR:
      newState.songs = {};
      action.payload.songs.forEach(song => {
        newState.songs[song.id] = song;
      })
    case UPDATE:
      newState.songs[action.payload.id] = action.payload;
      newState.currentSong = action.payload;
      return newState;
    case DELETE:
      delete newState.songs[action.payload];
      return newState;
    case PLAY:
      newState.currentSong = action.payload;
      return newState;
		default:
			return state;
	}
}