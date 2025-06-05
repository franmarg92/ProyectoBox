const{RoleModel} = require('../models')

const createRole = async (name) => {
    try {
        const newRole = {
            name: name
        }
        await RoleModel.create(newRole)
        return newRole
    } catch (error) {
        throw error
    }
}


module.exports = {createRole}