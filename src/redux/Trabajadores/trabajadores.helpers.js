import { db } from "../../firebase/utils";
import { doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";

export const handleAddTrabajador = async trabajador => {
    console.log('test')
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
        getDocs(collection(db,'trabajadores'))
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