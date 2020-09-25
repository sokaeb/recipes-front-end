import { ADD_RECIPE } from '../actions/recipeActions';
import { FETCH_RECIPES_SUCCESS, FETCH_RECIPES, FETCH_A_RECIPE, DELETE_RECIPE, PUT_RECIPE, USER_LOGIN, USER_LOGOUT } from '../actions/index';

const ingredientsObj = {
    name: '',
    amount: '',
}

const categoriesObj = {
  categoryname: '',
}

const initialRecipe = {
    title: "",
    source: "",
    preptime: "", 
    ingredients: [ingredientsObj],
    categories: [categoriesObj],
    instruction: "",
}

export const initialState = {
    recipes: [],
    loadingRecipes: false,
    recipe: {},
    loggedIn: false,
};


export const recipeReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_RECIPE:
            return {
                ...state, 
                title: state.title,
                source: state.source,
                ingredients: [...state.ingredients],
                instruction: state.instruction
            }
        case FETCH_RECIPES:
            return {
                ...state,
                loadingRecipes: true
            }
        case FETCH_RECIPES_SUCCESS: 
            return {
                ...state,
                recipes: action.payload,
                loadingRecipes: false
            }
        case FETCH_A_RECIPE:
            return {
                ...state,
                recipe: action.payload,
            }
        case DELETE_RECIPE: 
            return {
                ...state,
                recipes: state.recipes.filter(item => {
                    // debugger
                return item.recipeid != action.payload
                })   
            }
        case PUT_RECIPE: 
            return {
                ...state,
                recipes: state.recipes.map((item) =>{
            if(item.recipeid === action.payload.recipeid){
                    console.log(action.payload)
                    return action.payload
                    } else {
                        return item
                    }
                })
            }
        case USER_LOGIN:
            return {
                ...state,
                loggedIn: true,
            }
        case USER_LOGOUT:
            return {
                ...state,
                loggedIn: false
            }
    default:
        return state;
    }
}

export default recipeReducer;