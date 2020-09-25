import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as yup from 'yup';

import formSchema from './validation/formSchema';

import styled from 'styled-components';

//styled-components
const StyledForm = styled.form`
  /* background-color: ${(pr) => pr.theme.main}; */
  padding: ${(pr) => pr.theme.paddingSmall};
  margin: ${(pr) => pr.theme.marginSmall};
  border: ${(pr) => pr.theme.regBorder};
  background-color: rgba(255, 255, 255, 0.5);

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
  background-image: url('https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500&h=500&fit=crop&ixid=eyJhcHBfaWQiOjF9');
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
  background-color: rgba(255, 255, 255, 0.5);
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

const initialFormValues = {
  username: '',
  email: '',
  password: '',
};

const initialFormErrors = {
  username: '',
  email: '',
  password: '',
};

const initialSignup = [];

const Signup = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [savedFormInfo, setSavedFormInfo] = useState(initialSignup);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    axios
      .post(
        'http://hsmm-secretfamilyrecipe.herokuapp.com/createnewuser',
        formValues
      )
      .then((res) => {
        localStorage.setItem('token', res.data.access_token);
        history.push('/userprofile');
      })
      .catch((err) => {
        console.log(err);
      });

    const newSignup = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
      email: formValues.email.trim(),
    };
    setSavedFormInfo(...savedFormInfo, newSignup);
    setFormValues(initialFormValues);
  };

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
    <StyledImg>
      <br />
      <StyledForm className="form-container" onSubmit={submitHandler}>
        <h2>
          Sign Up for <br />
          Secret Family Recipes
        </h2>
        <Errors className="errors">
          <div>{errors.username}</div>
          <div>{errors.password}</div>
          <div>{errors.email}</div>
        </Errors>
        <div className="form-inputs">
          <label>
            <StyledFormInputs
              name="username"
              type="text"
              style={{ width: '350px' }}
              value={formValues.username}
              onChange={(e) => changeHandler(e)}
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

        <label>
          <StyledFormInputs
            name="email"
            type="email"
            style={{ width: '350px' }}
            value={formValues.email}
            onChange={changeHandler}
            placeholder="email"
          ></StyledFormInputs>
        </label>

        <Button disabled={disabled}>Sign Up</Button>
      </StyledForm>
    </StyledImg>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, {})(Signup);
