import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import { putRecipe } from '../actions/index';
import { connect } from 'react-redux';

const initialRecipeFormValues = {
        ///// TEXT INPUTS /////
        // recipeid: '',
        title: '',
        source: '',
        preptime: '',
        ingredients: [],
        categories: [],
        instruction: '',
    }
    
const ingredientsObj = {
        // ingredientid: 42,
        name: '',
        amount: '',
    }
    
const categoriesObj = {
    //   categoryid: 56,
      categoryname: '',
    }

const UpdateRecipe = (props) => {
    const [ recipeDetails, setRecipeDetails ] = useState(initialRecipeFormValues)
    const [ ingredients, setIngredients ] = useState(ingredientsObj)
    const [category, setCategory ] = useState(categoriesObj)
    const { id } = useParams();
    const { putRecipe } = props;
    const history = useHistory();

 // REPOPULATES EDIT FORM WITH THE RECIPE INFO OF THE ID REQUESTED
    useEffect(() => {
        axiosWithAuth()
        .get(`http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipe/${id}`)
        .then(res => {
            console.log(res)
            setRecipeDetails({
                    // recipeid: res.data.recipeid,
                    title: res.data.title,
                    source: res.data.source,
                    preptime: res.data.preptime,
                    ingredients: res.data.ingredients.ingredient,
                    categories: res.data.categories.category,
                    instruction: recipeDetails.instruction.trim(),
            })
            // setPushRecipeDetails({
            //     recipeid: res.data.recipeid,
            //     title: res.data.title,
            //     source: res.data.source,
            //     preptime: res.data.preptime,
            //     ingredients: res.data.ingredients.ingredient,
            //     categories: res.data.categories.category,
            //     instruction: recipeDetails.instruction.trim(),
            // })
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])


    const inputChange = evt => {
        setRecipeDetails({
            ...recipeDetails,
            [evt.target.name]: evt.target.value
        });
    };

     // INPUT HANDLER FOR INGREDIENTS
     const handleIngredientsChange = (evt) => {
        const { name, value } = evt.target
       //  debugger
        setIngredients({
          ...ingredients,
          [name]: value
        })
       }
   
       // INPUT HANDLER FOR CATEGORIES
       const handleCatChange = (evt) => {
         const { name, value } = evt.target
         setCategory({
           ...category,
           [name]: value
         })
       }

    // const updatedRecipe = (e) => {
    //     const { name, value } = e.target;
    //     setRecipeDetails({
    //         ...recipeDetails,
    //         [name]: value
    //     })
    // }

    const handleSubmit = (evt)=> {
        evt.preventDefault();
        // console.log(id)
        // console.log(recipeDetails)
        // debugger
        putRecipe(id, recipeDetails)
        history.push('/userprofile')
    }
    
        // axiosWithAuth()
        // .put(`http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipe/${id}`, recipeDetails)
        // .then(res => {
        //     console.log('put response', res)
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        
    return (
        <div>
      <form className='form container' onSubmit={handleSubmit}>
            <div className='form-recipe inputs'>       
        
                 <label>Recipe Title&nbsp;
                        <input
                            value={recipeDetails.title}
                            onChange={inputChange}
                            name='title'
                            type='text'
                        />
                        </label>
                        <br/>
                <label>Source&nbsp;
                        <input
                            value={recipeDetails.source}
                            onChange={inputChange}
                            name='source'
                            type='text'
                        />
                        </label>
                        <br/>
                <label>Prep + Cook Time&nbsp;
                        <textarea 
                            value={recipeDetails.preptime}
                            onChange={inputChange}
                            name='preptime'
                            type='text'
                            placeholder='prep:30min total time:2hr'
                        />
                        </label>
                        <br/>

                        <label>Ingredient Name&nbsp;
                            <input
                              value={ingredients.name}
                              onChange={handleIngredientsChange}
                              name="name"
                              type="text"
                            />
                      </label>
                            <br/>
                      <label>Ingredient Amount&nbsp;
                            <input
                              value={ingredients.amount}
                              onChange={handleIngredientsChange}
                              name="amount"
                              type="text"
                            />
                      </label>
                        <br/>

                      <label>Instructions&nbsp;
                        <textarea rows = "10" cols ="30"
                            value={recipeDetails.instruction}
                            onChange={inputChange}
                            name='instruction'
                            type='text'
                        />
                        </label>
                        <br/>
              
                        <label>Recipe Category&nbsp;
                        <input
                            value={category.categoryname}
                            onChange={handleCatChange}
                            name='categoryname'
                            type='text'
                        />
                        </label>   
                        <br/>
                <button>Submit</button>   
            </div>
        </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        recipes: state.recipes
    }
}

export default connect(mapStateToProps, { putRecipe })(UpdateRecipe);