const { tableNames } = require("../../constants/general")
const sqlCommands = require("../../datasource/generic_sql")
// const db = require("../../models/database");

const detailList = (req, res, next)=> {
    console.log(req.params)
    sqlCommands.sqlFind(tableNames.detail_table,[], req.params)
    .then(detail => { 
        if(detail.length)
            return res.status(200).json(detail)
        else
            throw Error(`Detail with code ${req.params.vr_no} not found`)
    })
    .catch(error => next(error))   
}

const detailFind = (req, res, next)=> {
    sqlCommands.sqlFind(tableNames.detail_table, req.params)
    .then(detail => { 
        if(detail.length)
            return res.status(200).json(detail[0])
        else
            throw Error(`Detail with code ${req.params.vr_no} not found`)
    })
    .catch(error => next(error))   
}
const detailCreate = async(req, res, next)=> {
    console.log(req.body)
    
    sqlCommands.sqlInsert(tableNames.detail_table, req.body)
    .then(() => res.status(201).json(req.body))
    .catch(error => next(error))   
}

const detailDelete = (req, res, next)=> {
    sqlCommands.sqlFind(tableNames.detail_table, req.params)
    .then(detail => { 
        if(detail.length){
            sqlCommands.sqlDelete(tableNames.detail_table, req.params)
                .then(() => res.status(202).send(`Successfully deleted detail with code : ${req.params.ac1_code}`))
                .catch(error => next(error)) 
        }
        else
            throw Error(`Detail with code ${req.params.vr_no} not found`)
    })
    .catch(error => next(error)) 
      
}

const detailUpdate = (req, res, next)=> {
    sqlCommands.sqlFind(tableNames.detail_table, req.params)
    .then(detail => { 
        if(detail.length){
            sqlCommands.sqlUpdate(tableNames.detail_table, req.body, req.params)
                .then(() => res.status(204).send(`Successfully updated Detail with code : ${req.params.vr_no}`))
                .catch(error => next(error)) 
            }
            else
                throw Error(`Detail with code ${req.params.vr_no} not found`)
    })
    .catch(error => next(error)) 
      
}

const detailControllers = {detailList, detailFind, detailCreate, detailDelete, detailUpdate}


module.exports = detailControllers