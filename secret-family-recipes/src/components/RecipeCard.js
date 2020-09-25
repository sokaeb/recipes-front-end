import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteRecipe } from '../actions/index';
import { connect } from 'react-redux'; 

import styled from 'styled-components';


const StyledRecipe=styled.div`
border: 5px solid #89B0AE;
 border-radius: 30px;
 /* width: 40%; */
 width: auto;
 margin: 0 auto;
 padding-left: 4%;  
 padding-right: 4%;
 margin-bottom:4%;
 background-color:#FAF9F9;


 .editBtn{
  margin-left:35%;
  padding: 2%;
  margin-top:2%;
  margin-bottom:2%;
  background-color: #BEE3DB;
  border-radius: 10px;
 }

 .deleteBtn{
  margin-left:35%;
  padding: 2%;
  margin-top:2%;
  margin-bottom:2%;
  background-color: #BEE3DB;
  border-radius: 10px;
 }
`

const RecipeCard = (props) => {
    const { recipe, deleteRecipe } = props;
    const history = useHistory();
    const [ show, setShow ] = useState(false);

    // DELETE FUNCTION
    const handleDelete = evt => {
        evt.preventDefault();
        deleteRecipe(evt.target.id);
    };

    return (
        <div className="styledRecipeContainer">
            <StyledRecipe className='recipeCard'>
                <h2>{recipe.title}</h2>
                <h3>Source: {recipe.source}</h3>
                <h3>Prep Time: {recipe.preptime}</h3>
                    
                    <div className='showAndHide'>
                    <div onClick={() => setShow(!show)}>
                                { !show ? (
                            <div className='showAndHide'>Show Details</div>
                        ) : (
                            <div>
                                <div className='showAndHide'>Close Details</div>
                            
                                <div>
                                <h3 className= 'ingredients'>Ingredients:</h3>
                                {recipe.ingredients.map((item) => {
                                return (
                                    <ul>
                                    <li key={item.ingredient.ingredientid}>{item.ingredient.amount} {item.ingredient.name} </li>
                                    </ul>
                                )
                                })}
                                </div>
                                <br/>
                                <div className='instruction'>{recipe.instruction}
                                    <h3 >Categories:</h3>
                                        {recipe.categories.map((item)=>{
                                            return(
                                                <div key={item.category.categoryid}>{item.category.categoryname}</div>
                                            )
                                        })}
                                </div>
                        <button className ='editBtn' onClick={() => history.push(`/update-recipe/${recipe.recipeid}`)}>Edit</button>
                        <button className='deleteBtn' id={recipe.recipeid} onClick={handleDelete}>Delete</button>
                    </div>
                    )}
            </div>
            </div>
            </StyledRecipe>
        </div>
    )
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, { deleteRecipe })(RecipeCard);
