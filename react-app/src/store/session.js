const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_OTHER = "users/SET_OTHER";
const EDIT_USER = "users/EDIT_USER";

const setUser = payload => ({ type: SET_USER, payload });
const removeUser = () => ({ type: REMOVE_USER });
const setOther = payload => ({ type: SET_OTHER, payload });
const editUser = payload => ({ type: EDIT_USER, payload });

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(setUser(data));
	}
};
export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};
export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};
export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};
export const getOtherUser = id => async dispatch => {
  if (!id) {
    dispatch(setOther(null));
    return;
  }

  const res = await fetch(`/api/users/${id}`);
  const data = await res.json();
  console.log(data);
  if (res.ok) {
    dispatch(setOther(data));
  }
}
export const updateUser = (id, imageURL, description) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}/edit`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      image_url: imageURL,
      description
    })
  });
  const data = await res.json();

  if (res.ok) dispatch(editUser(data));
  return data;
}

const initialState = { user: null, other: null };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
    case SET_OTHER:
      return {
        user: state.user,
        other: action.payload
      }
    case EDIT_USER:
      const newState = {
        user: action.payload,
        other: state.other
      }
      newState.other.user = action.payload
      
      return newState;
		default:
			return state;
	}
}