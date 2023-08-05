import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
const PRODUCT_COLLECTION = 'products';
export const getAllProducts = (db) => {
    const colecctionRef = collection(db, PRODUCT_COLLECTION);
    return getDocs(colecctionRef)
        .then((snapshot) => {
            const products = [];
            snapshot.docs.forEach((item) => {
                products.push({
                    id: item.id,
                    ...item.data()
                })
            })
            return products;
        })
        .catch((error) => {
            return error;
        })
}

export const getProductById = (db, id) =>{
    const documentRef = doc(db, PRODUCT_COLLECTION, id);
    return getDoc(documentRef)
        .then((snapshot) => {
            if (snapshot.exists) {
                return {
                    id: snapshot.id,
                    ...snapshot.data()
                }
            }
        })
}
