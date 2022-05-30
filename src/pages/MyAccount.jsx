import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const MyAccount = (props) => {
    return(
    <div>
        {!props.currentUser ? (<Navigate to="/login"/>) : null}
        <h1>Myaccount</h1>
    </div>
    )
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

export default connect(mapStateToProps,null)(MyAccount);