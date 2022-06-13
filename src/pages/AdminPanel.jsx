import { useSelector,useDispatch } from "react-redux";
import { checkUserIsAdmin } from "../Utils";
import { Navigate, Link } from 'react-router-dom';
import SideNavAdmin from "../components/SideNavAdmin";
import AddProductsAdmin from "../components/AddProductsAdmin";
import './AdminPanel.scss'
import { signOutUserStart } from "../redux/User/user.actions";

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const AdminPanel = () => {
    const { currentUser } = useSelector(mapState)
    const isAdmin = checkUserIsAdmin(currentUser)
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(signOutUserStart())
    }

    return (
    <div className="adminPannel">
        {!isAdmin ? (<Navigate to="/login"/>) : null}
        <SideNavAdmin>
            <ul>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li onClick={signOut}>
                    Sing out
                </li>
            </ul>
        </SideNavAdmin>
        <div className="content">
            <AddProductsAdmin />
        </div>
    </div>
    )
}

export default AdminPanel;