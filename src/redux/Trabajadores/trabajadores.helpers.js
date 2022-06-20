import { db } from "../../firebase/utils";
import { where, query, doc, setDoc, collection, getDocs, deleteDoc, limit, startAfter, getDoc } from "firebase/firestore";

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

export const handleFetchTrabjadores = ({ payload: { filterType, filterName,startAfterDoc, persistTrabajadores=[], pageSize } }) => {
    if (!pageSize) {
        pageSize = 6;
    }
    const queryFilters = []
    queryFilters.push(limit(pageSize))
    if (filterName) {
        queryFilters.push(where('nombre','>=',filterName))
        queryFilters.push(where('nombre','<=',filterName + '\uf8ff'))
    }
    if (filterType) queryFilters.push(where('categoria','==',filterType))
    if (startAfterDoc) queryFilters.push(startAfter(startAfterDoc))
    const finalQuery = query(collection(db,'trabajadores'), ...queryFilters)

    return new Promise ((resolve,reject) => {
        getDocs(finalQuery)
            .then( snapshot => {
                const totalCount = snapshot.size; 
                const data = [
                    ...persistTrabajadores,
                    ...snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ]
                resolve({
                    data, 
                    queryDoc: snapshot.docs[totalCount-1],
                    isLastPage: totalCount < pageSize  
                })
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

export const handleFetchTrabajador = trabjadorID => {
    return new Promise ((resolve,reject) => {
        getDoc(doc(db,'trabajadores',trabjadorID))
            .then( snapshot => {
                if(snapshot.exists) {
                    resolve(snapshot.data())
                }
            })
            .catch( err => {
                reject(err)
            })
    })
}