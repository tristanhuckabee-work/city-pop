const CREATE = 'likes/CREATE';
const READ   = 'likes/READ';
const UPDATE = 'likes/UPDATE';

const like      = payload => ({type: CREATE, payload});
const getLikes  = payload => ({type: READ, payload});
const un_like   = payload => ({type: UPDATE, payload});

export const create_like = payload => async dispatch => {
  const res = await fetch('/api/likes/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();

  if (res.ok) {
    dispatch(like(data));
    return data;
  }
  return data;
}
export const get_my_likes = () => async dispatch => {
  const res = await fetch('/api/likes/');
  const data = await res.json();

  if (res.ok) {
    dispatch(getLikes(data.likes));
    return data;
  }
  return data;
}
export const update_like = payload => async dispatch => {
  const res = await fetch(`/api/likes/${payload.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });;
  const data = await res.json();

  if (res.ok) {
    dispatch(un_like(data));
    return data;
  }
  return data;
}


let initialState = {}

export default function reducer(state = initialState, action) {
	let newState = {...state};
  
  switch (action.type) {
		case CREATE:
      newState[action.payload.song_id] = action.payload;
			return newState;
		case READ:
      action.payload.forEach(like => {
        newState[like.song_id] = like;
      });
      return newState;
    case UPDATE:
      newState[action.payload.song_id] = action.payload;
			return newState;
		default:
			return state;
	}
}