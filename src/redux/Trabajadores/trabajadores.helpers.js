import { firestore } from "../../firebase/utils";

export const handleAddTrabajador = trabajador => {
    return new Promise ((resolve, reject) => {
        firestore.CollectionReference('trabajadores').doc().set(trabajador)
        .then(() => {
            resolve()
        })
        .catch(err => {
            reject(err)
        })
    })
}