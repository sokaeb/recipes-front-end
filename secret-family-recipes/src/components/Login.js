import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';

import * as yup from 'yup';
import formSchema from './validation/formSchema';
import axios from 'axios';
import { userLogin, userLogout } from '../actions';

//styled-components
const StyledForm = styled.form`
  /* background-color: ${(pr) => pr.theme.main}; */
  padding: ${(pr) => pr.theme.paddingSmall};
  margin: ${(pr) => pr.theme.marginSmall};
  border: ${(pr) => pr.theme.regBorder};
  background-color: rgba(255, 255, 255, 0.8);

  border-radius: 10px;
  display: flex;
  width: 38%;
  margin: 0 auto;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5%;
`;

const StyledImg = styled.div`
  background-image: url('https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500&h=500&fit=crop&ixid=eyJhcHBfaWQiOjF9');
  min-height: 300px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 90vh;
`;

const StyledFormInputs = styled.input`
  margin-bottom: ${(pr) => pr.theme.marginSmall};
  margin-left: 10px;

  height: 40px;
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
  border-bottom: 2.5px solid white;
  ::placeholder {
    margin-bottom: 20px;
    position: relative;
    top: -10px;
    padding-left: 10px;
  }
`;

const Button = styled.button`
  height: 50px;
  border-radius: 30px;
  width: 70%;
`;

const Errors = styled.div`
  color: ${(pr) => pr.theme.white};
`;

//initial values
const initialFormValues = {
  username: '',
  password: '',
};

const initialFormErrors = {
  username: '',
  password: '',
};

const initialLogin = [];

const Login = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [savedFormInfo, setSavedFormInfo] = useState(initialLogin);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  // const [post, setPost] = useState([]);

  useEffect(() => {
    userLogin();
    userLogout();
  }, [])

  // INPUT HANDLER
  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  // POST USER WHEN LOGGING IN
  const submitHandler = (evt) => {
    evt.preventDefault();
    axios
      .post(
        'http://hsmm-secretfamilyrecipe.herokuapp.com/login',
        `grant_type=password&username=${formValues.username}&password=${formValues.password}`,
        {
          headers: {
            // btoa is converting our client id/client secret into base64
            Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((res) => {
        localStorage.setItem('token', res.data.access_token);
        history.push('/userprofile');
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .post('http://hsmm-secretfamilyrecipe.herokuapp.com/login', formValues)
    //   .then((res) => {
    //     console.log(res.data);
    //     setPost(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const newLogin = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };
    setSavedFormInfo([...savedFormInfo, newLogin]);
    setFormValues(initialFormValues);
  };

  // VALIDATIONS
  const validate = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({ ...errors, [name]: '' });
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] });
      });
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <StyledImg className="img">
      <br />

      <StyledForm className="form-container" onSubmit={submitHandler}>
        <h2>
          Login to <br />
          Secret Family Recipes
        </h2>
        <Errors className="errors">
          <div>{errors.username}</div>
          <div>{errors.password}</div>
        </Errors>
        <div className="form-inputs">
          <label>
            <StyledFormInputs
              name="username"
              type="text"
              style={{ width: '350px' }}
              value={formValues.username}
              onChange={changeHandler}
              placeholder="username"
            ></StyledFormInputs>
          </label>

          <br />

          <label>
            <StyledFormInputs
              name="password"
              type="password"
              style={{ width: '350px' }}
              value={formValues.password}
              onChange={changeHandler}
              placeholder="password"
            ></StyledFormInputs>
          </label>
        </div>
        <Button disabled={disabled}>Login</Button>
      </StyledForm>
    </StyledImg>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, { userLogin, userLogout })(Login);
