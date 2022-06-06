import { db } from "../../firebase/utils";
import { where, orderBy, query, doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";

export const handleAddTrabajador = async trabajador => {
    const newTrabjadorRef = doc(collection(db,'trabajadores'))
    return new Promise ((resolve,reject) => {
        setDoc(newTrabjadorRef, trabajador)
        .then( () => {
            resolve()
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const handleFetchTrabjadores = ({ filterType }) => {
    let filter = query(collection(db,'trabajadores'), orderBy('createdDate', 'desc'))
    if (filterType) filter = query(collection(db,'trabajadores'), orderBy('createdDate', 'desc'), where('categoria','==',filterType))
    return new Promise ((resolve,reject) => {
        getDocs(filter)
        .then( snapshot => {
            const trabajadoresArray = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    documentID: doc.id
                }
            })
            resolve(trabajadoresArray)
        })
        .catch( err => {
            reject(err)
        })
    })
}

export const handleDeleteTrabajador = documentID => {
    return new Promise ((resolve,reject) => {
        deleteDoc(doc(db,'trabajadores',documentID))
        .then(() => {
            resolve()
        })
        .catch(err => {
            reject(err)
        })
    })
}