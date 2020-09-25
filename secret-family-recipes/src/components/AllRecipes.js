import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const AllRecipes = (props) => {
    const [ userRecipes, setUserRecipes ] = useState([]);
    const [ show, setShow ] = useState(false);  

    const getRecipes = () => {
        axios.get('http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipes')
        .then(res => {
          setUserRecipes(res.data)
        })
        .catch(err => {
          // debugger
          console.log(err)
        })
    }
        useEffect(() => {
      getRecipes()
    }, [])

    return (
      <div className="styledRecipeContainer">
        <StyledRecipe className='recipeCard'>
          {userRecipes.map((item) => {
            return (
              <div key={item.recipeid}>
                    <h2>{item.title}</h2>
                    <h3>Source: {item.source}</h3>
                    <h3>Prep Time: {item.preptime}</h3>
                    
                    <div className='showAndHide'>
                    <div onClick={() => setShow(!show)}>
                                { !show ? (
                            <div className='showAndHide'>Show Details</div>
                        ) : (
                            <div>
                                <div className='showAndHide'>Close Details</div>
                            
                                <div>
                                <h3 className= 'ingredients'>Ingredients:</h3>
                                {item.ingredients.map((ing) => {
                                return (
                                    <ul>
                                    <li key={ing.ingredient.ingredientid}>{ing.ingredient.amount} {ing.ingredient.name} </li>
                                    </ul>
                                )
                                })}
                                </div>
                                <br/>
                                <div className='instruction'>{item.instruction}
                                    <h3 >Categories:</h3>
                                        {item.categories.map((cat)=>{
                                            return(
                                                <div key={cat.category.categoryid}>{cat.category.categoryname}</div>
                                            )
                                        })}
                                </div>
                    </div>
                    )}
            </div>
            </div>
              </div>
            )
          })}
        </StyledRecipe>
      </div>
    )

    // return (
    //   <>
    //     <div>
    //       {userRecipes.map((item) => {
    //       return (
            
    //         <div key={item.recipeid}>
    //         <div>{item.title}</div>
    //         <p>{item.source}</p>
    //         <p>{item.preptime}</p> 
    //         </div>
    //         // <Recipe 
    //         //   key={item.recipeid}
    //         //   item={item}
    //         // />
    //       )
    //     })}
    //     </div>
    //   </>
    // )

}

export default AllRecipes;


// YOUR PREVIOUS CODE BELOW

// export default function Recipe({ details }) {
//   if (!details) {
//     return <h3>Working fetching your recipe&apos;s details...</h3>
//   }

////edit and delete recipe 

    //   const editRecipe = (id) => {
    //     axios.delete(`${quotesURL}/${id}`)
    //       .then(res => { // eslint-disable-line
    //         setQuotes(quotes.filter(quote => quote.id !== id))
    //       })
    //       .catch(handleError)
    //       .finally(resetForm)
    //   }
    
    
    //   const editRecipe = (id) => {
    //     const recipe = recipes.find(q => q.id === id)
    //     setFormRecipeValues({ ...recipe })

//   return (
//     <div className='recipes'>
//       <h2>{details.name}</h2>
//       <p>source: {details.source}</p>
//       <p>completion time: {details.time}</p>
//       <p>ingredients: {details.ingredients}</p>
//       <p>instructions: {details.instructions}</p>

//       {
//         !!details.category && !!details.category.length &&
//         <div>
//           Category:
//           <ul>
//             {details.category.map((like, idx) => <li key={idx}>{like}</li>)}
//           </ul>
//         </div>
//       }


// <button>Edit</button>
//     <button data-cy={`editBtn${i}`} onClick={() => editRecipe(q.id)}>Edit</button>
//     <button data-cy={`deleteBtn${i}`} onClick={() => deleteRecipe(q.id)}>Delete</button>
//     </div>
//   )
// }
