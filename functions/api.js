/* eslint-disable promise/always-return */
const express = require('express');
const db = require('./db');

const api = express();
const router = express.Router();

router.get('/', (req, res) => {
    console.log('##########');
    res.send("Hello from Express on Firebase! by Mahmoud");
});

/**
 * Single customer operations
 */
router.post('/customer', (req, res) => {
    /**
     * create a new customer with details added in request body. id is auto generated
     */
    const options = req.body;
    db.addCustomer(options)
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: 'customer saved',
                    id: result.id
                });
            } else {
                res.status(500).json({
                    message: error.message,
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: error.message,
            });
        });
});

/**
 * Single customer operations
 */
router.route('/customer/:id')
    .get((req, res) => {
        /**
         * Get a single customer by id
         */
        const id = req.params.id;
        db.getCustomer(id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: error.message,
                });
            });
    })
    .put((req, res) => {
        /**
         * Update a single customer by id
         */
        const id = req.params.id;
        const options = req.body;
        db.updateCustomer(id, options)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: error.message,
                });
            });

    })
    .delete((req, res) => {
        /**
         * Delete a single customer by id
         */
        const id = req.params.id;
        db.deleteCustomer(id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: error.message,
                });
            });
    });

/**
 * group operations on customers data
 */
router.route('/customers')
    .get((req, res) => {
        /**
        * get list of all customers in firestore.
        */
        db.getCustomers()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: error.message,
                });
            });
    })
    .post((req, res) => {
        /**
         * bulk import a list of customers. customer property contains the data
         */
        const options = req.body.customers;
        db.addCustomersBulk(options)
            .then(result => {
                if (result) {
                    res.status(200).json({
                        message: 'customer data imported'
                    });
                } else {
                    res.status(500).json({
                        message: error.message,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: error.message,
                });
            });
    })
    .put((req, res) => {
        /**
         * bulk update a list of customers. customer property contains the data
         */
        const options = req.body.customers;
        db.updateCustomersBulk(options)
            .then(result => {
                if (result) {
                    res.status(200).json({
                        message: 'customer data updated'
                    });
                } else {
                    res.status(500).json({
                        message: error.message,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: error.message,
                });
            });
    })
    .delete((req, res) => {
        /**
         * delete list of customer ids
         */
        const options = req.body.customerids;
        db.deleteCustomersBulk(options)
            .then(result => {
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json({
                        message: error.message,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: error.message,
                });
            });
    });

module.exports = router;