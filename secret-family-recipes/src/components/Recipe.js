import React from 'react';
import styled from 'styled-components'

const StyledRecipe = styled.div`
 border: 5px solid #89B0AE;
 border-radius: 30px;
 width: 20%;
 margin: 0 auto;
 padding: 4%;  
 margin-top:3%;
 margin-bottom:3%;
 background-color:#FAF9F9;
 font-size:24px;
`

const Recipe = (props) => {
    const { item, source, preptime } = props;

    return(
     
        <StyledRecipe>
           
            Title: {item.title}<br/>
            Source: {item.source}<br/>
            Preptime: {item.preptime}<br/>
            
           
        </StyledRecipe>
    )
}

export default Recipe;