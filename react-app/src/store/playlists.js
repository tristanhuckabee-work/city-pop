const CREATE   = 'playlists/CREATE';
const READ_ALL = 'playlists/READ_ALL';
const READ_ONE = 'playlists/READ_ONE';
const UPDATE   = 'playlists/UPDATE';
const DELETE   = 'playlists/DELETE';

const addPlaylist = (payload) => ({type: CREATE, payload})
const getAll  = (payload) => ({type: READ_ALL, payload})
const getOne  = (payload) => ({type: READ_ONE, payload})
const editOne = (payload) => ({type: UPDATE, payload})
const delOne  = (payload) => ({type: DELETE, payload})

export const add_playlist = playlist => async dispatch => {}
export const get_all_playlists = () => async dispatch => {}
export const get_one_playlist = id => async dispatch => {
  const res = await fetch(`/api/playlists/${id}`);
  const data = await res.json();

  if (res.ok) dispatch(getOne(data));
  return data;
}
export const update_playlist = playlist => async dispatch => {}
export const delete_playlist = id => async dispatch => {}

const initialState = {};

export default function reducer(state = initialState, action) {
	let newState = {...state};
  switch (action.type) {
		case CREATE:
      return newState;
		case READ_ALL:
      return newState;
    case READ_ONE:
      return action.payload;
    case UPDATE:
      return newState;
    case DELETE:
      return newState;
		default:
			return newState;
	}
}