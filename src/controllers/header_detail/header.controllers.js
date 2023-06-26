const { tableNames } = require("../../constants/general")
const sqlCommands = require("../../datasource/generic_sql")
// const db = require("../../models/database");

const headerList = (req, res, next)=> {
    console.log(req.params)
    sqlCommands.sqlFind(tableNames.header_table,[], req.params)
    .then(header => { 
        if(header.length)
            return res.status(200).json(header)
        else
            throw Error(`Header with code ${req.params.vr_no} not found`)
    })
    .catch(error => next(error))   
}

const headerFind = (req, res, next)=> {
    sqlCommands.sqlFind(tableNames.header_table, req.params)
    .then(header => { 
        if(header.length)
            return res.status(200).json(header[0])
        else
            throw Error(`Header with code ${req.params.vr_no} not found`)
    })
    .catch(error => next(error))   
}
const headerCreate = async(req, res, next)=> {
    sqlCommands.sqlInsert(tableNames.header_table, req.body)
    .then(() => res.status(201).json(req.body))
    .catch(error => next(error))   
}

const multipleTableCreate = async(req, res, next)=> {
    sqlCommands.sqlMultipleInsert(req.body)
    .then((result) => res.status(201).json(result))
    .catch(error => next(error))   
}

const headerDelete = (req, res, next)=> {
    sqlCommands.sqlFind(tableNames.header_table, req.params)
    .then(header => { 
        if(header.length){
            sqlCommands.sqlDelete(tableNames.header_table, req.params)
                .then(() => res.status(202).send(`Successfully deleted header with code : ${req.params.ac1_code}`))
                .catch(error => next(error)) 
        }
        else
            throw Error(`Header with code ${req.params.vr_no} not found`)
    })
    .catch(error => next(error)) 
      
}

const headerUpdate = (req, res, next)=> {
    sqlCommands.sqlFind(tableNames.header_table, req.params)
    .then(header => { 
        if(header.length){
            sqlCommands.sqlUpdate(tableNames.header_table, req.body, req.params)
                .then(() => res.status(204).send(`Successfully updated Header with code : ${req.params.vr_no}`))
                .catch(error => next(error)) 
            }
            else
                throw Error(`Header with code ${req.params.vr_no} not found`)
    })
    .catch(error => next(error)) 
      
}

const headerControllers = {headerList, headerFind, headerCreate, headerDelete, headerUpdate, multipleTableCreate}


module.exports = headerControllers