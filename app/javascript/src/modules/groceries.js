import { displayAlertMessage } from "./alertMessage"

const initialState = {
  groceryList: [],
  name: '',
  isFetching: false
}

const groceries = (state = initialState, action) => {
  switch(action.type) {
    case CLEAR_FORM:
      return {...state, name: ''}
    case HANDLE_NAME_CHANGE:
      return {...state, name: action.newName}
    case GET_GROCERIES_REQUEST:
      return {...state, isFetching: true}
    case GET_GROCERIES_SUCCESS:
      return {
        ...state,
        groceryList: action.groceries,
        isFetching: false
      }
    case GET_GROCERIES_FAILURE:
      return {...state, isFetching: false}
    case POST_GROCERY_REQUEST:
      return {...state, isFetching: true}
    case POST_GROCERY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        groceryList: [
          ...state.groceryList,
          action.grocery
        ]
      }
    case POST_GROCERY_FAILURE:
      return {...state, isFetching: false}
    default:
      return state
  }
}

const CLEAR_FORM = 'CLEAR_FORM'

const clearForm = () => {
  return {
    type: CLEAR_FORM
  }
}

const HANDLE_NAME_CHANGE = 'HANDLE_NAME_CHANGE'

const handleNameChange = event => {
  const newName = event.target.value
  return {
    type: HANDLE_NAME_CHANGE,
    newName
  }
}

const GET_GROCERIES_REQUEST = 'GET_GROCERIES_REQUEST'
const getGroceriesRequest = () => {
  return { type: GET_GROCERIES_REQUEST }
}

const GET_GROCERIES_SUCCESS = 'GET_GROCERIES_SUCCESS'
const getGroceriesSuccess = (groceries) => {
  return {
    type: GET_GROCERIES_SUCCESS,
    groceries
  }
}

const GET_GROCERIES_FAILURE = 'GET_GROCERIES_FAILURE'
const getGroceriesFailure = () => ({type: GET_GROCERIES_FAILURE})

const POST_GROCERY_REQUEST = 'POST_GROCERY_REQUEST'
const postGroceryRequest = () => ({type: POST_GROCERY_REQUEST})

const POST_GROCERY_SUCCESS = 'POST_GROCERY_SUCCESS'
const postGrocerySuccess = (grocery) => {
  return {
    type: POST_GROCERY_SUCCESS,
    grocery
  }
}

const POST_GROCERY_FAILURE = 'POST_GROCERY_FAILURE'
const postGroceryFailure = () => ({type: POST_GROCERY_FAILURE})

const getGroceries = () => {
  return (dispatch) => {
    dispatch(getGroceriesRequest())
    return fetch('api/v1/groceries')
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(getGroceriesFailure())
        dispatch(displayAlertMessage("Oops!"))
        return { error: "Oops!" }
      }
    })
    .then(response => {
      if(!response.error) {
        dispatch(getGroceriesSuccess(response))
      }
    })
  }
}

const postGrocery = (groceryData) => {
  return (dispatch) => {
    dispatch(postGroceryRequest())
    return fetch('api/v1/groceries.json', {
      method: 'POST',
      body: JSON.stringify(groceryData),
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(postGroceryFailure())
        dispatch(displayAlertMessage('Oops!'))
        return {error: 'Oops!'}
      }
    })
    .then(grocery => {
      if(!grocery.error) {
        dispatch(postGrocerySuccess(grocery))
      }
    })
  }
}

export {
  getGroceries,
  postGrocery,
  clearForm,
  groceries,
  handleNameChange
}
