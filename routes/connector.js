const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
    res.render('index', { viewTitle: "Add Employee" })
})

// create :
router.post('/', (req, res) => {
    console.log(req.body);
    const user = { fullName: req.body.fullName, email: req.body.email, mobile: req.body.mobile, city: req.body.city };
    const sql = "INSERT INTO `users` SET ?";
    db.query(sql, user, (error, result) => {
        if (error) throw error;
        res.redirect('/employee/all');
    })
});

// read :
router.get('/employee-list', (req, res) => {
    let sql = "SELECT * FROM `users`";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('list', { list: result });
    })
})

// update :
router.get('/all', (req, res) => {
    let sql = "SELECT * FROM `users`";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render('updateordelete', { list: result });
    })
})

router.get('/update/:email', (req, res) => {
    let email = req.params.email;
    const sql = `SELECT * FROM users WHERE email = '${email}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render('update', { data: result, viewTitle: 'Update Employee' });
    })
})

router.post('/employee-update', (req, res) => {
    const { fullName, email, mobile, city } = req.body;
    let sql = `UPDATE users SET fullName = '${fullName}',mobile = '${mobile}',city = '${city}' WHERE email = '${email}'`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/employee/all');
    })
})

// delete :
router.get('/delete/:email', (req, res) => {
    let email = req.params.email;
    let sql = `DELETE from users where email = '${email}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/employee/all');
    })
})

module.exports = router;