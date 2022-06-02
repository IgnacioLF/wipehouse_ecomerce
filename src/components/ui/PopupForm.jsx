/* eslint-disable react/jsx-key */
import './PopupForm.scss'

const PopupForm = ({hidePopupForm,children,togglePopupForm}) => {
    if (hidePopupForm) return null;
    return [
        <div className="popupOverlay" onClick={() => togglePopupForm()} />,
        <div className="popWrap">
            <div className="popupform">
                {children}
            </div>
        </div>
    ]
}

export default PopupForm;