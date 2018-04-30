const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = 'mongodb://useradmin:Vidanta01@ds263619.mlab.com:63619/angular5authdb'

mongoose.connect(db, err => {
    if(err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    
    let token = req.headers.authorization.split(' ')[1]
    
    if(token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = ''
    try {
        payload = jwt.verify(token, 'secretKey')
    } catch (e) {
        return res.status(401).send('Unauthorized request')
    }

    if(!payload) {
        return res.status(401).send('Unauthorized request') 
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)

    User.findOne({email: userData.email}, (error, userInDB) => {
        if(error) {
            res.status(503).send('DB service unavailable')
        } else {
            if(userInDB) {
                res.status(500).send('User already registered')
            } else {
                user.save((error, registeredUser) => {
                    if(error) {
                        res.status(503).send('DB service unavailable')
                    } else {
                        let payload = {subject: registeredUser._id}
                        let token = jwt.sign(payload, 'secretKey')
                        res.status(200).send({token})
                    }
                })
            }
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    
    User.findOne({email: userData.email}, (error, user) => {
        if(error) {
            console.log(error)
        } else {
            if(!user) {
                res.status(401).send('Invalid email')
            } else {
                if(user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    let payload = {subject: user._id}
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-05-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-05-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-05-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-05-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-05-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-05-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-05-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-05-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-05-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-05-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-05-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-05-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

module.exports = router