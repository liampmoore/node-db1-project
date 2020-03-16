const express = require('express');

const router = express.Router();

const db = require('../data/dbConfig')

router.get('/', async (req, res) => {
    try {
        const accounts = await db("accounts");
        res.status(200).json(accounts)
    }
    catch(err) {
        console.error(err)
        res.status(500).json({error: "Could not fetch accounts. Server error."})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const account = await db("accounts").first().where({id: req.params.id});
        if (account) {
            res.status(200).json(account);
        }
        else {
            res.status(404).json({error: "No account with that id."})
        }

    }
    catch(err) {
        console.error(err)
        res.status(500).json({error: "Could not fetch account. Server error."})
    }
})

router.post('/', async (req, res) => {
    try {
        const ids = await db("accounts").insert(req.body);
        const post = await db("accounts").first().where({id: ids[0]})
        res.status(201).json(post)
    }
    catch(err) {
        console.error(err)
        res.status(500).json({error: "Could not post. Server error."})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const account = await db("accounts").first().where({id: req.params.id});
        if (account) {
            const updatedAccount = await db("accounts").where({id: req.params.id}).first();
            res.status(200).json(updatedAccount);
        }
        else {
            res.status(404).json({error: "No account with that id."})
        }
    }
    catch(err) {
        console.error(err)
        res.status(500).json({error: "Server error."})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const account = await db("accounts").first().where({id: req.params.id});
        if (account) {
            await db("accounts").first().where({id: req.params.id}).del()
            res.status(200).json(account)
        }
        else {
            res.status(404).json({error: "No account with that id."})
        }
    }
    catch(err) {
        console.error(err)
        res.status(500).json({error: "Could not fetch account. Server error."})
    }
})

module.exports = router;