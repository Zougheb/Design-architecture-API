const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const customerCollection = 'customer';

const addCustomer = (customer) => {
    customer['created_on'] = Date.now();
    customer['modified_on'] = Date.now();
    return db.collection(customerCollection).add(customer)
        .then(docRef => {
            return docRef;
        });
};

const getCustomer = (id) => {
    return db.collection(customerCollection).doc(id).get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
                return {};
            }
            else {
                const customer = doc.data();
                return customer;
            }
        });
};

const updateCustomer = (id, customer) => {
    customer['modified_on'] = Date.now();
    return db.collection(customerCollection).doc(id).update(customer);
};

const deleteCustomer = (id) => {
    return db.collection(customerCollection).doc(id).delete();
};

const getCustomers = () => {
    return db.collection(customerCollection).get()
        .then(snapshot => {
            let customers = snapshot.docs.map(doc => {
                const customer = doc.data();
                customer.id = doc.id;
                return customer;
            });
            return customers;
        });
};

const addCustomersBulk = (customers) => {
    const batch = db.batch();
    customers.forEach(customer => {
        const docRef = db.collection(customerCollection).doc();
        batch.set(docRef, customer);
    });
    return batch.commit()
        .then(result => {
            return result;
        });
};

const deleteCustomersBulk = (cust_ids) => {
    const batch = db.batch();
    cust_ids.forEach(id => {
        const docRef = db.collection(customerCollection).doc(id);
        batch.delete(docRef);
    });
    return batch.commit()
        .then(result => {
            return result;
        });
};

const updateCustomersBulk = (customers) => {
    const batch = db.batch();
    customers.forEach(customer => {
        const docRef = db.collection(customerCollection).doc(customer.id);
        batch.update(docRef, customer);
    });
    return batch.commit()
        .then(result => {
            return result;
        });
};

module.exports = {
    addCustomer: addCustomer,
    getCustomer: getCustomer,
    updateCustomer: updateCustomer,
    deleteCustomer: deleteCustomer,
    getCustomers: getCustomers,
    addCustomersBulk: addCustomersBulk,
    deleteCustomersBulk: deleteCustomersBulk,
    updateCustomersBulk: updateCustomersBulk
};