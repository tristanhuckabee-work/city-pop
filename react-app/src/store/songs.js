const CREATE   = 'songs/CREATE';
const READ_ALL = 'songs/READ_ALL';
const READ_ONE = 'songs/READ_ONE';
const UPDATE   = 'songs/UPDATE';
const DELETE   = 'songs/DELETE';
const PLAY     = 'songs/PLAY'

const addSong = (payload) => ({type: CREATE, payload})
const getAll  = (payload) => ({type: READ_ALL, payload})
const getOne  = (payload) => ({type: READ_ONE, payload})
const editOne = (payload) => ({type: UPDATE, payload})
const delOne  = (payload) => ({type: DELETE, payload})
const setCurr = (payload) => ({type: PLAY, payload})

export const set_current = (song) => async dispatch => {
  dispatch(setCurr(song));
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

      return newState;
    case UPDATE:

      return newState;
    case DELETE:

      return newState;
    case PLAY:
      newState.currentSong = action.payload;
      return newState;
		default:
			return state;
	}
}