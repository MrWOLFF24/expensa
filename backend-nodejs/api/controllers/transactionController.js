'use strict'
const Joi = require('@hapi/joi')
const moment = require('moment')
const transactionsModel = require('./../models/transactionsModel')
const inputValidation = require('./../middlewares/input-validation')
moment.locale('fr')

// get all transactions
const getTransactions = (req, res) => {
  transactionsModel.getTransactions(response => {
    response.map(el => {
      el.transaction_date = moment(el.transaction_date).format('L')
    })
    res.status(200).send(response)
  }, req.userData.user.user_id)
}

// create new transaction
const createTransaction = (req, res) => {
  Joi.validate(req.body, inputValidation.transactionsSchema, (err, values) => {
    if (err === null) {
      transactionsModel.createTransaction(response => {
        res.status(201).send(response)
      }, values)
    } else {
      res.boom.conflict(err)
    }
  })
}

// update a transaction
const updateTransaction = (req, res) => {
  Joi.validate(req.body, inputValidation.transactionsSchema, (err, values) => {
    if (err === null) {
      transactionsModel.updateTransaction(response => {
        res.status(201).send(response)
      }, values)
    } else {
      res.boom.conflict(err)
    }
  })
}

// remove a transaction
const removeTransaction = (req, res) => {
  Joi.validate(
    req.params,
    inputValidation.idValidationSchema,
    (err, values) => {
      if (err === null) {
        transactionsModel.removeTransaction(response => {
          res.status(201).send(response)
        }, values.id)
      } else {
        res.boom.conflict(err)
      }
    }
  )
}

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  removeTransaction,
}
