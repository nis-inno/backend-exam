const { tableNames } = require("../../constants/general")
const sqlCommands = require("../../datasource/generic_sql")
// const db = require("../../models/database");

const itemList = (req, res, next)=> {
    console.log(req.params)
    sqlCommands.sqlFind(tableNames.item_master,[], req.params)
    .then(item => { 
        if(item.length)
            return res.status(200).json(item)
        else
            throw Error(`Item with code ${req.params.item_code} not found`)
    })
    .catch(error => next(error))   
}

const itemFind = (req, res, next)=> {
    sqlCommands.sqlFind(tableNames.item_master, req.params)
    .then(item => { 
        if(item.length)
            return res.status(200).json(item[0])
        else
            throw Error(`Item with code ${req.params.item_code} not found`)
    })
    .catch(error => next(error))   
}
const itemCreate = async(req, res, next)=> {
    console.log(req.body)
    
    sqlCommands.sqlInsert(tableNames.item_master, req.body)
    .then(() => res.status(201).json(req.body))
    .catch(error => next(error))   
}

const itemDelete = (req, res, next)=> {
    sqlCommands.sqlFind(tableNames.item_master, req.params)
    .then(item => { 
        if(item.length){
            sqlCommands.sqlDelete(tableNames.item_master, req.params)
                .then(() => res.status(202).send(`Successfully deleted item with code : ${req.params.ac1_code}`))
                .catch(error => next(error)) 
        }
        else
            throw Error(`Item with code ${req.params.item_code} not found`)
    })
    .catch(error => next(error)) 
      
}

const itemUpdate = (req, res, next)=> {
    sqlCommands.sqlFind(tableNames.item_master, req.params)
    .then(item => { 
        if(item.length){
            sqlCommands.sqlUpdate(tableNames.item_master, req.body, req.params)
                .then(() => res.status(204).send(`Successfully updated Item with code : ${req.params.item_code}`))
                .catch(error => next(error)) 
            }
            else
                throw Error(`Item with code ${req.params.item_code} not found`)
    })
    .catch(error => next(error)) 
      
}

const itemControllers = {itemList, itemFind, itemCreate, itemDelete, itemUpdate}


module.exports = itemControllers