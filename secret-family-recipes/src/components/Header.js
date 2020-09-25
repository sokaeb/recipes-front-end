import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
  &:visited,
  &:link,
  /* &:active {
    text-decoration: none; */
  }
  color: black;
`;

function Header(props) {
  const { loggedIn } = props;

  return (
    <header>
        {!loggedIn && ( // if you are logged in
              <div className="navLinks">
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
                {/* <Link to="/login">Log Out</Link> */}
                <Link to="/userprofile">My Recipes</Link>
                <Link to="/allrecipes">All Recipes</Link>
              </div>
        )}
        {loggedIn && ( // if you are logged out
            <>
            <Link to="/logout">Log Out</Link>
            <Link to="/userprofile">My Recipes</Link>
            <Link to="/allrecipes">All Recipes</Link>
            </>
           )}
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, {})(Header);
