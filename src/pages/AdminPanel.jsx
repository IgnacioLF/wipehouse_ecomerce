import { useSelector } from "react-redux";
import { checkUserIsAdmin } from "../Utils";
import { Navigate, Link } from 'react-router-dom';
import SideNavAdmin from "../components/SideNavAdmin";
import { auth } from '../firebase/utils';
import AddProductsAdmin from "../components/AddProductsAdmin";
import './AdminPanel.scss'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const AdminPanel = () => {
    const { currentUser } = useSelector(mapState)
    const isAdmin = checkUserIsAdmin(currentUser)

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
                <li onClick={() => { auth.signOut()}}>
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