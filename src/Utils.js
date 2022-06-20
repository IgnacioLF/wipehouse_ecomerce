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

export const getProvincias = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

export const getFormatedDate = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    if(month < 10){
        return(`${day}-0${month}-${year}`)
    }else{
        return(`${day}-${month}-${year}`)
    }
} 