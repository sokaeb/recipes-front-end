
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard';

function RecipeList(props) {
    const { recipes } = props;

    useEffect(() => {
        console.log(recipes)
    }, [recipes])

    return(
        <>
        <div className="recipeList">
            {recipes.map((recipeItem) => {
                return <RecipeCard key={recipeItem.recipeid} recipe={recipeItem} />
            })}
        </div>
        </>
    )
}

function mapStateToProps(state){
    return{
       recipes: state.recipes,
    };
}

export default connect(mapStateToProps, {})(RecipeList);
