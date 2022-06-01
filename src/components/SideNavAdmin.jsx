import UserProfile from "./UserProfile"
import './SideNavAdmin.scss'

const SideNavAdmin = ({children}) => {

    return(
    <div className="verticalNavAdmin">
        <UserProfile />
        <div className="insideVerticalNav"> 
            {children}
        </div>
    </div>
    )
}

export default SideNavAdmin