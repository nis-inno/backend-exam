const { QueryTypes } = require("sequelize");
const db = require('../models/database')
require("dotenv").config();

async function sqlFind(shortDBName, fieldArray=[], queryObj={}){
    if(fieldArray.length && Object.keys(queryObj).length)
        return await db.sequelize.query(`Select ${getFieldList(fieldArray)} from ${getDBName(shortDBName)} where ${getWhereQuery(queryObj)}`, {type: QueryTypes.SELECT})
    else if(fieldArray.length)
        return await db.sequelize.query(`Select ${getFieldList(fieldArray)} from ${getDBName(shortDBName)}`, {type: QueryTypes.SELECT})
    else if(Object.keys(queryObj).length)
        return await db.sequelize.query(`Select * from ${getDBName(shortDBName)} where ${getWhereQuery(queryObj)}`, {type: QueryTypes.SELECT})
    else
        return await db.sequelize.query(`Select * from ${getDBName(shortDBName)}`, {type: QueryTypes.SELECT})
}

async function sqlUpdate(shortDBName, fieldObj={}, queryObj={}){
    if(Object.keys(fieldObj).length && Object.keys(queryObj).length)
        return await db.sequelize.query(`Update ${getDBName(shortDBName)} set ${getUdpatevalues(fieldObj)} where ${getWhereQuery(queryObj)}`, {type: QueryTypes.UPDATE})
    throw error("No values to update / where clause");
}

async function sqlDelete(shortDBName, queryObj={}){
    if(Object.keys(queryObj).length)
        return await db.sequelize.query(`Delete from ${getDBName(shortDBName)} where ${getWhereQuery(queryObj)}`, {type: QueryTypes.DELETE})
    throw error("No values for delete where clause");
}

async function sqlInsert(shortDBName, queryObj={}){
    if(Object.keys(queryObj).length)
        return await db.sequelize.query(`Insert into ${getDBName(shortDBName)} (${getInsertKeys(queryObj)}) values (${getInsertValues(queryObj)})`, {type: QueryTypes.INSERT})
    throw error("No values / fields for insert statement");
}

async function sqlMultipleInsert(queryObj={}){
    if(Object.keys(queryObj).length)
    {
        try{
            return await db.sequelize.transaction(async (t) => {
                const result = {}
                for(const[key, value] of Object.entries(queryObj))
                    result[key] = await db.sequelize.query(`Insert into ${getDBName(key)} (${getInsertKeys(value)}) values (${getInsertValues(value)})`, {type: QueryTypes.INSERT, transaction: t})
                return result
            }) 
        }catch (error){
            throw error(error);
        }
    } else
        throw error("No values / fields for insert statement");
}

async function getTableInfo(shortDBName){
    if(shortDBName)
        return await db.sequelize.query(`SELECT ORDINAL_POSITION,COLUMN_NAME,COLUMN_DEFAULT ,IS_NULLABLE,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,NUMERIC_PRECISION,NUMERIC_SCALE,DATETIME_PRECISION,CHARACTER_SET_NAME,COLLATION_NAME  from INFORMATION_SCHEMA.COLUMNS where  table_name = '${shortDBName}'`)
    throw error(`No such '${shortDBName}'`);
}


function getDBName(dbName){
    const trimmedDBName = dbName.trim()
    return `[${process.env.MSSQL_DATABASE}].[dbo].[${trimmedDBName}]`
}

function getWhereQuery(queryObj){
    let actualQuery 
    var initial = true
    for (const [key, value] of Object.entries(queryObj)) {
        if(initial & typeof value === 'string'){
            actualQuery = `[${key.trim()}]='${value.trim()}'`
            initial = false
        } else if(initial){
            actualQuery = `[${key.trim()}]=${value}`
            initial = false
        }
        else if(typeof value === 'string')
            actualQuery += ` and [${key.trim()}]='${value.trim()}'`
        else
            actualQuery += ` and [${key.trim()}]=${value}`
    }
    return actualQuery
}

function getUdpatevalues(queryObj){
    let actualQuery 
    var initial = true
    for (const [key, value] of Object.entries(queryObj)) {
        if(initial && typeof value === 'string'){
            actualQuery = `[${key.trim()}]='${value.trim()}'`
            initial = false
         } else if(initial){
            actualQuery = `[${key.trim()}]=${value}`
            initial = false
         }
        else if(typeof value === 'string')
            actualQuery += `, [${key.trim()}]='${value.trim()}'`
        else
            actualQuery += `, [${key.trim()}]=${value}`
    }
    return actualQuery
}

function getInsertKeys(insertObj){
    let returnObj 
    var initial = true
    for (const [key, value] of Object.entries(insertObj)) {
         if(initial  && typeof key === 'string'){
            returnObj = `[${key.trim()}]`
            initial = false
        }
        else if(initial){
            returnObj = `[${key}]`
            initial = false
        }
        else if(typeof key === 'string'){
            returnObj += `,[${key.trim()}]`
        }
        else
            returnObj += `,[${key.trim()}]`
    }
    return returnObj
}

function getInsertValues(insertObj){
    let returnObj 
    var initial = true
    for (const [key, value] of Object.entries(insertObj)) {
        if(initial && typeof value === 'string'){
            returnObj = `'${value.trim()}'`
            initial = false
        } 
        else if(initial){
            returnObj = `${value}`
            initial = false
        }
        else if(typeof value === 'string')
            returnObj += `,'${value.trim()}'`
        else
            returnObj += `,${value}`
    }
    return returnObj
}

function getFieldList(fieldArray){
    let actualFieldList
    var initial = true
    for (i=0; i< fieldArray.length; i++) {
        if(initial && typeof fieldArray[i] === 'string'){
            actualFieldList = `[${fieldArray[i].trim()}]`
            initial = false
        }
        else if(initial){
            actualFieldList = `[${fieldArray[i]}]`
            initial = false
        }
        else if(typeof fieldArray[i] === 'string')
            actualFieldList += `,[${fieldArray[i].trim()}]`
        else
            actualFieldList += `,[${fieldArray[i]}]`
    }
    return actualFieldList
}

const sqlCommands = {sqlFind, sqlInsert, sqlUpdate, sqlDelete, sqlMultipleInsert}

module.exports = sqlCommands