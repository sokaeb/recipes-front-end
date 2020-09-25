import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';

import schema from './validation/formSchemaRecipes'

import styled from 'styled-components'
import { fetchArecipe } from '../actions/index'


const StyledRecipe = styled.div `
 border: 5px solid #89B0AE;
 border-radius: 30px;
 width: 40%;
 margin: 0 auto;
 padding-left: 4%;  
 margin-bottom:10%;
 background-color:#FAF9F9;
 /* font-family:'@import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap')'; */
 
h2{
  color:#555B6E;
}

label{
  display:flex;
  color:#555B6E;
 }

h4{
margin: 0 auto;
padding-bottom:1%;
}
.form-group-checkboxes{
  columns:3;
 }  

.submitBtn{
  margin-left:35%;
  padding: 2%;
  margin-top:2%;
  margin-bottom:2%;
  background-color: #BEE3DB;
  border-radius: 10px;
 }

 textarea{
  font-family:'Noto' }

  .errors{
    color:red;
  }


  @media ${pr => pr.theme.mobileBreakpoint} {
    width: initial;
  }
`

const initialRecipeFormValues = {
    ///// TEXT INPUTS /////
    title: '',
    source: '',
    preptime: '',
    ingredients: [],
    categories: [],
    instruction: '',
}

const ingredientsObj = {
    name: '',
    amount: '',
}

const categoriesObj = {
  categoryname: '',
}
    
const initialRecipeFormErrors= {
  title: '',
  source: '',
  preptime: '',
  ingredients:[],
  categories: [],
  instruction: '',
}
    
const initialRecipeDisabled = true

function RecipeForm(props) {
//set state     
      const [formRecipeValues, setFormRecipeValues] = useState(initialRecipeFormValues) 
      const [formRecipeErrors, setFormRecipeErrors] = useState(initialRecipeFormErrors) 
      const [disabledRecipe, setDisabledRecipe] = useState(initialRecipeDisabled)  
      const [ ingredients, setIngredients ] = useState(ingredientsObj)
      const [category, setCategory ] = useState(categoriesObj)
      const { fetchArecipe } = props;

    // VALIDATIONS
    const validateRecipe = (name, value) => {
      yup
        .reach(schema, name)
        .validate(value)
        .then(valid => {
          setFormRecipeErrors({
            ...formRecipeErrors,
            [name]: ""
          })
        })
        .catch(err => {
          setFormRecipeErrors({
            ...formRecipeErrors,
            [name]: err.errors[0]
          });
        });
    }
    
    // INPUT HANDLER
    const inputChange = (name, value) => {
      validateRecipe(name, value)
      setFormRecipeValues({
        ...formRecipeValues,
        [name]: value 
      })
    }

    const onChange = evt => {
      const { name, value, type, checked } = evt.target
      const valueToUse = type === 'checkbox' ? checked : value
      inputChange(name, valueToUse)
    }

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
    
    // SUBMIT HANDLER FOR POSTING NEW RECIPE
    const formSubmit = (event) => {
        event.preventDefault()
        
        const newRecipe = {
          title: formRecipeValues.title.trim(),
          source: formRecipeValues.source.trim(),
          preptime: formRecipeValues.preptime.trim(),
          ingredients: [{ingredient: ingredients}],
          categories: [{category: category}],
          instruction: formRecipeValues.instruction.trim(),
        //   user: {
        //     userid: userInfo.userid,
        //     username: userInfo.username,
        //     email: userInfo.email,
        //     roles: [
        //         {
        //             role: {
        //                 roleid: userInfo.roles[0].role.roleid,
        //                 name: userInfo.roles[0].role.name
        //             }
        //         }
        //     ],
        // }
      }
      fetchArecipe(newRecipe)
    }

    // VALIDATION
    useEffect(() => {
      schema.isValid(formRecipeValues)
          .then(valid => {
            setDisabledRecipe(!valid)
          })
      }, [formRecipeValues])
  
   
      // ADD INGREDIENTS FUNCTION
      // const onClick =evt =>{
      //   //setIngreident(evt.target.value)
      //   const { name, value} = evt.target
      //   setIngredient({
      //     ...ingredient,
      //     [name]: value 
      //   })
      //   setIngredient(initialIngredientList)
      // }

  return (
        <StyledRecipe>
            <form className='form container' onSubmit={formSubmit}>
              <h2>Keep track of your family's favorites!</h2>
              <div className='recipeInput'>
              

                <div className='errors'>
                {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
                <div>{formRecipeErrors.title}</div>
                <div>{formRecipeErrors.source}</div>
                <div>{formRecipeErrors.preptime}</div>
                <div>{formRecipeErrors.ingredients}</div>
                <div>{formRecipeErrors.instruction}</div>
                </div>
                    
                <div className='form-recipe inputs'>       
            
                    <label>Recipe Title&nbsp;
                            <input
                                value={formRecipeValues.title}
                                onChange={onChange}
                                name='title'
                                type='text'
                            />
                            </label>
                            <br/>
                      <label>Source&nbsp;
                            <input
                                value={formRecipeValues.source}
                                onChange={onChange}
                                name='source'
                                type='text'
                            />
                      </label>
                            <br/>
                      <label>Prep + Cook Time&nbsp;
                            <textarea 
                                value={formRecipeValues.preptime}
                                onChange={onChange}
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
                                value={formRecipeValues.instruction}
                                onChange={onChange}
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
                
                      <button className='submitBtn' disabled={disabledRecipe}>submit</button>   
                </div>
              </div>
            </form>
        </StyledRecipe>
  )
}

function mapStateToProps(state) {
  return {
    recipe: state.recipe,
  }
};
      
      
export default connect(mapStateToProps, { fetchArecipe })(RecipeForm);