import DefaultImageColor from '../assets/DefaultImageColor.png'
import { useSelector } from 'react-redux';
import './UserProfile.scss'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const UserProfile = () => {
    const { currentUser } = useSelector(mapState)
    return (
        <div className="userProfile">
            <img loading='lazy' src={DefaultImageColor} />
            <span>{currentUser ? currentUser.displayName : null}</span>
        </div>
    )
}

export default UserProfile;