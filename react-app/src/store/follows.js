const FOLLOW   = 'follows/CREATE';
const READ_ING = 'follows/READ_ING';
const READ_ERS = 'follows/READ_ERS';
const READ_REC = 'follows/READ_REC';
const UPDATE   = 'follows/UPDATE';

const follow = (payload) => ({type: FOLLOW, payload})
const getFollowing  = (payload) => ({type: READ_ING, payload})
const getFollowers  = (payload) => ({type: READ_ERS, payload})
const getRecommended= (payload) => ({type: READ_REC, payload})
const un_follow = (payload) => ({type: UPDATE, payload})

export const get_following = () => async dispatch => {
  const res = await fetch('/api/follows/following');
  const data = await res.json();
  
  if (res.ok) {
    dispatch(getFollowing(data.follows));
    return data;
  }
  return data;
}
export const get_followers = () => async dispatch => {
  const res = await fetch('/api/follows/followers');
  const data = await res.json();
  
  if (res.ok) {
    dispatch(getFollowers(data.follows));
    return data;
  }
  return data;
}
export const get_recommended = () => async dispatch => {
  const res = await fetch('/api/follows/recommended');
  const data = await res.json();
  
  if (res.ok) {
    dispatch(getRecommended(data.recs));
    return data;
  }
  return data;
}

let initialState = {
  following:   {},
  followers:   {},
  recommended: {}
}

export default function reducer(state = initialState, action) {
	let newState = {
    following: {...state.following},
    followers: {...state.followers},
    recommended: {...state.recommended}
  };
  
  switch (action.type) {
		case FOLLOW:
      newState.following[action.payload.id] = action.payload;
			return newState;
		case READ_ING:
      action.payload.forEach(follow => {
        newState.following[follow.id] = follow;
      });
      return newState;
    case READ_ERS:
      action.payload.forEach(follow => {
        newState.followers[follow.id] = follow;
      });
      return newState;
    case READ_REC:
      action.payload.forEach(follow => {
        newState.recommended[follow.id] = follow
      });
      return newState;
    case UPDATE:
      newState.following[action.payload.id] = action.payload;
			return newState;
		default:
			return state;
	}
}