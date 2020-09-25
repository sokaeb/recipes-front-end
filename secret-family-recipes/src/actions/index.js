import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const FETCH_RECIPES = "FETCH_RECIPES";
export const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";
export const FETCH_A_RECIPE = "FETCH_A_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const PUT_RECIPE = "PUT_RECIPE";

export const userLogin = () => ( { type: USER_LOGIN });
// export const userLogout = () => ( { type: USER_LOGOUT });

export const fetchRecipes = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_RECIPES });
        axios
        .get('http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipes')
        .then(res => {
            // console.log('fetch recipes data', res.data)
            dispatch({
                type: FETCH_RECIPES_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const fetchArecipe = (recipeData) => {
    return(dispatch) => {
        axiosWithAuth()
        .post('/recipes/recipe', recipeData)
        .then(res => {
          dispatch({ 
              type: FETCH_A_RECIPE, 
              payload: res.data
            })
        //   window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    }
}


export const deleteRecipe = (id) => {
    return(dispatch) => {
        axiosWithAuth()
        .delete(`http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipe/${id}`)
        .then(res => {
            // console.log('delete from action', res)
            dispatch({ 
                type: DELETE_RECIPE,
                payload: id
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const putRecipe = (id, newData) => dispatch => {
    // debugger
    axiosWithAuth()
        .put(`/recipes/recipe/${id}`, newData)
        .then(res => {
            console.log('put res', res) // -- do FIRST
            dispatch({ 
                type: PUT_RECIPE, 
                // payload: editData
                // payload: [id, newData]
                payload: res.data 
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const userLogout = () => dispatch => {
    localStorage.removeItem('token')
    axios
    .get('http://hsmm-secretfamilyrecipe.herokuapp.com/logout')
    .then(res => {
        // console.log(res)
        dispatch({ type: USER_LOGOUT })
    })
    .catch(err => {
        console.log(err)
    })
}
