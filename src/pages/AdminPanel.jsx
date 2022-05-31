import { useSelector } from "react-redux";
import { checkUserIsAdmin } from "../Utils";
import { Navigate } from 'react-router-dom';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const AdminPanel = () => {
    const { currentUser } = useSelector(mapState)
    const isAdmin = checkUserIsAdmin(currentUser)

    return (
    <div>
        {!isAdmin ? (<Navigate to="/login"/>) : null}
        <h1>Adminpanel</h1>
    </div>
    )
}

export default AdminPanel;