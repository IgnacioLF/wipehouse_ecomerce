import { db } from "../../firebase/utils";
import { where, orderBy, query, doc, setDoc, collection, getDocs, deleteDoc, limit, startAfter } from "firebase/firestore";

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

export const handleFetchTrabjadores = ({ payload: { filterType, startAfterDoc, persistTrabajadores=[] } }) => {
    // TODO 3 only for test
    const pageSize = 3;

    const queryFilters = []
    queryFilters.push(limit(pageSize))
    if (filterType) queryFilters.push(where('categoria','==',filterType))
    if (startAfterDoc) queryFilters.push(startAfter(startAfterDoc))
    const finalQuery = query(collection(db,'trabajadores'), orderBy('createdDate', 'desc'), ...queryFilters)

/*  
    let filter = query(collection(db,'trabajadores'), orderBy('createdDate', 'desc'), limit(pageSize))
    if (filterType) filter = query(collection(db,'trabajadores'), orderBy('createdDate', 'desc'), where('categoria','==',filterType), limit(pageSize))
*/
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
                    isLastPage: totalCount < 1  
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