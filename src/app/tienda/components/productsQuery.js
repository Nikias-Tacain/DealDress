import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
const PRODUCT_COLLECTION = 'products';
const IMAGES_COLLECTION = 'imagesHome';
const GUIACOMPRA_COLLECTION = 'guiaCompra';
const IMAGESPORTADA_COLLECTION = 'imagesPortada';
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
export const getAllPhotos = (db) => {
    const colecctionRefPhotos = collection(db, IMAGES_COLLECTION);
    return getDocs(colecctionRefPhotos)
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
export const getAllGuiaCompra = (db) => {
    const colecctionRefPhotos = collection(db, GUIACOMPRA_COLLECTION);
    return getDocs(colecctionRefPhotos)
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
export const getProductByIdPhotos = (db, id) =>{
    const documentRef = doc(db, IMAGES_COLLECTION, id);
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
export const getAllImagesPortada = (db) => {
    const colecctionRefPhotos = collection(db, IMAGESPORTADA_COLLECTION);
    return getDocs(colecctionRefPhotos)
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
