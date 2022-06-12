import { db } from "../../firebase/utils";
import { doc, setDoc, collection} from "firebase/firestore";

export const handleSaveOrder = order => {
    const newOredersRef = doc(collection(db,'pedidos'))
    return new Promise((resolve,reject) => {
        setDoc(newOredersRef, order)
            .then( () => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}