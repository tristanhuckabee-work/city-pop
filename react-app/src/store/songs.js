const CREATE   = 'songs/CREATE';
const READ_ALL = 'songs/READ_ALL';
const READ_ONE = 'songs/READ_ONE';
const UPDATE   = 'songs/UPDATE';
const DELETE   = 'songs/DELETE';

const addSong = (payload) => ({type: CREATE, payload})
const getAll  = (payload) => ({type: READ_ALL, payload})
const getOne  = (payload) => ({type: READ_ONE, payload})
const editOne = (payload) => ({type: UPDATE, payload})
const delOne  = (payload) => ({type: DELETE, payload})

export const get_all_songs = () => async dispatch => {
  const res = await fetch('/api/songs');
  const data = await res.json();
  
  if (res.ok) {
    dispatch(getAll(data));
    return data;
  }
  return data;
}

export default function reducer(state = {}, action) {
	let newState = {...state};
  switch (action.type) {
		case CREATE:
      newState[action.payload.id] = action.payload;
			return newState;
		case READ_ALL:
      action.payload.songs.forEach(song => {
        newState[song.id] = song;
      });
      return newState;
    case READ_ONE:

      return newState;
    case UPDATE:

      return newState;
    case DELETE:

      return newState;
		default:
			return state;
	}
}