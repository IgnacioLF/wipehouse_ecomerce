import cocineroIcon from './assets/CocineroIconColor.png'
import cortacespedIcon from './assets/CortacespedIconColor.png'
import limpiadorIcon from './assets/LimpiadorIconColor.png'
import mantenimientoIcon from './assets/LimpiapiscinasIconColor.png'
import cocineroIconDark from './assets/cocineroicon_darkblue.png'
import cortacespedIconDark from './assets/cortacespedicon_darkblue.png'
import limpiadorIconDark from './assets/limpiadoricon_darkblue.png'
import mantenimientoIconDark from './assets/mantenimientoicon_darkblue.png'


export const ProductTypes = [
    'Cocinero',
    'Limpieza del hogar',
    'Cortacesped',
    'Mantenimiento de piscinas'];

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
            return cortacespedIcon;
        case 'Mantenimiento de piscinas':
            return mantenimientoIcon;
        default :
            return null;
    }
}

export const getIconDark = (tittle) => {
    switch (tittle) {
        case 'Cocinero':
            return cocineroIconDark;
        case 'Limpieza del hogar':
            return limpiadorIconDark;
        case 'Cortacesped':
            return cortacespedIconDark;
        case 'Mantenimiento de piscinas':
            return mantenimientoIconDark;
        default :
            return null;
    }
}