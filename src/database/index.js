import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import User from '../app/models/User'
import Product from '../app/models/Product'
import Category from '../app/models/Category'

//import configDatabase from '../config/database' CONFIGDATABASE NO LUGAR DO LINK ABAIXO

const models = [User, Product, Category]

class Database {
    constructor() {
        this.init()
        this.mongo()
    }

    init(){
        this.connection = new Sequelize('postgresql://postgres:*62Db5aDAGe1a13*EgEc3F5F5bcc-E15@roundhouse.proxy.rlwy.net:56469/railway')
        models.map(model => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models))
    }

    mongo(){
        this.mongoConnection = mongoose.connect('mongodb://mongo:2FFhbD-eGADhBeH4FacA21HbgHBhDADA@roundhouse.proxy.rlwy.net:22766') 
                                                  ///mongodb://localhost:27017/codeburger
    }
}

export default new Database()