import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userLogout } from '../actions/index';

const Logout = (props) => {
    const history = useHistory();

    useEffect(() => {
        localStorage.removeItem('token');
        userLogout();
        history.push('/login')
    }, [])
    
    return null;
};

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
    };
};

export default connect(mapStateToProps, { userLogout })(Logout);