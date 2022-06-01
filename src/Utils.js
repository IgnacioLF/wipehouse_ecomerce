import cocineroIcon from './assets/CocineroIconColor.png'
import CortacespedIcon from './assets/CortacespedIconColor.png'
import limpiadorIcon from './assets/LimpiadorIconColor.png'
import mantenimientoIcon from './assets/LimpiapiscinasIconColor.png'


export const checkUserIsAdmin = (currentUser) => {
    if ( !currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const { userRoles } = currentUser;
    if ( userRoles.includes('admin') )  return true;
    return false; 
}

export const getIcon = (tittle) => {
    switch (tittle) {
        case 'Cocinero':
            return cocineroIcon;
        case 'Limpieza del hogar':
            return limpiadorIcon;
        case 'Cortacesped':
            return CortacespedIcon;
        case 'Mantenimiento de piscinas':
            return mantenimientoIcon;
        default :
            return null;
    }
}