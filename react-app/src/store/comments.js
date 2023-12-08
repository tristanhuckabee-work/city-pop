const CREATE = 'comments/CREATE';
const GET_CURR = 'comments/GET_CURR';
const UPDATE = 'comments/UPDATE';
const DELETE = 'comments/DELETE';

const addComm = (payload) => ({ type: CREATE, payload })
const getCurrent = (payload) => ({ type: GET_CURR, payload })
const editOne = (payload) => ({ type: UPDATE, payload })
const delOne = (payload) => ({ type: DELETE, payload })

export const create_new_comment = (comment, id) => async dispatch => {
  const res = await fetch(`/api/songs/${id}/comments`, {
    method: 'POST',
    body: comment
  });
  const data = await res.json();

  if (res.ok) {
    dispatch(addComm(data));
  }
  return data;
}
export const get_for_current = id => async dispatch => {
  const res = await fetch(`/api/songs/${id}/comments`);
  const data = await res.json();

  if (res.ok) {
    dispatch(getCurrent(data));
    return data;
  }
  return data;
}
export const edit_comment = (content, id) => async dispatch => {
  const res = await fetch(`/api/comments/${id}/edit`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(content)
  });
  const data = await res.json();

  if (res.ok) dispatch(editOne(data));
  return data;
}
export const delete_comment = id => async dispatch => {
  const res = await fetch(`/api/comments/${id}`, {
    method: 'DELETE'
  });
  const data = res.json();

  if (res.ok) {
    dispatch(delOne(id));
    return data;
  }
  return data;
}

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState = {...state};
  switch (action.type) {
    case CREATE:
      newState[action.payload.id] = action.payload;
      return newState;
    case GET_CURR:
      newState = {}
      action.payload.forEach(comment => {
        newState[comment.id] = comment;
      });
      return newState;
    case UPDATE:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}