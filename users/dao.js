import model from "./model.js"

export const createUser = (user) => model.create(user)
export const findAllUser = () => model.find();
export const findUserById = (id) => model.findById(id)
export const findUserByUserName  = (name) => model.findOne({username:name})
export const findUserByCredential = (username,password) => model.findOne({username,password})
export const updateUser = (userId, user) => model.updateOne({_id:userId},{$set:user})
export const deleteUser = (id) => model.deleteOne({_id:id})
