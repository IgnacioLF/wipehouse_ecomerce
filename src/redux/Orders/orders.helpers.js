import { db } from "../../firebase/utils";
import { doc, setDoc, collection, query, orderBy, where, getDocs, getDoc} from "firebase/firestore";

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

export const hangleGetUserOrderHistory = uid => {
    const queryFilters = []
    queryFilters.push(orderBy('orderCreatedDate', 'desc'))
    queryFilters.push(where('orderUserID','==',uid))
    const finalQuery = query(collection(db,'pedidos'), ...queryFilters)

    return new Promise ((resolve,reject) => {
        getDocs(finalQuery)
            .then( snapshot => {
                const data = [
                    ...snapshot.docs.map( document => {
                        return ({
                            ...document.data(),
                            documentID: document.id
                        })
                    })
                ]
                resolve({ data })
            })
            .catch( err => {
                reject(err)
            })
    })
}

export const handleGetOrder = orderID => {
    return new Promise((resolve,reject) => {
        getDoc(doc(db,'pedidos',orderID))
            .then(snapshot => {
                if (snapshot.exists) {
                    resolve({
                        ...snapshot.data(),
                        documentID: orderID
                    })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}