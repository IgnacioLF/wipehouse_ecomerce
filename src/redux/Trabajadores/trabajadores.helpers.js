import { db } from "../../firebase/utils";
import { orderBy, query, doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";

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

export const handleFetchTrabjadores = () => {
    return new Promise ((resolve,reject) => {
        getDocs(query(collection(db,'trabajadores'), orderBy('createdDate', 'desc')))
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