const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Area = require('../models/areas.js')
const Standing_Point = require('../models/standing_points.js')
const Stationary_Map = require('../models/stationary_maps.js')
const Moving_Map = require('../models/moving_maps.js')
const Survey = require('../models/surveys.js')
const Stationary_Collection = require('../models/stationary_collections.js')
const Moving_Collection = require('../models/moving_collections.js')
const Survey_Collection = require('../models/survey_collections.js')
const Sound_Collection = require('../models/sound_collections.js')
const Nature_Collection = require('../models/nature_collections.js')
const Light_Collection = require('../models/light_collections.js')
const Boundaries_Collection = require('../models/boundaries_collections.js')
const Order_Collection = require('../models/order_collections.js')


const ObjectId = mongoose.Schema.Types.ObjectId

const project_schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    team: {
        type: ObjectId,
        required: true
    },
    area: {
        type: ObjectId,
        required: true,
        ref: 'Areas'
    },
    subareas: [{
        type: ObjectId,
        required: true,
        ref: 'Areas'
    }],
    standingPoints:[{
        type: ObjectId,
        required: true,
        ref: 'Standing_Points'
    }],
    stationaryCollections:[{
        type: ObjectId,
        ref: 'Stationary_Collections'
    }],
    movingCollections:[{
        type: ObjectId,
        ref: 'Moving_Collections'
    }],
    soundCollections:[{
        type: ObjectId,
        ref: 'Sound_Collections'
    }],
    // natureCollections:[{
    //     type: ObjectId,
    //     required: true,
    //     ref: 'Nature_Collections'
    // }],
    // lightCollections:[{
    //     type: ObjectId,
    //     ref: 'Light_Collections'
    // }],
    // boundariesCollections:[{
    //     type: ObjectId,
    //     ref: 'Boundaries_Collections'
    // }],
    // orderCollections:[{
    //     type: ObjectId,
    //     ref: 'Order_Collections'
    // }],
    surveyCollections:[{
        type: ObjectId,
        ref: 'Survey_Collections'
    }],
})

project_schema.plugin(uniqueValidator)

const Projects = mongoose.model('Projects', project_schema)

module.exports = Projects

module.exports.addProject = async function(newProject) {
    return (await newProject.save())
}

module.exports.updateProject = async function (projectId, newProject) {
    return await Projects.updateOne(
        { _id: projectId },
        { $set: {
            title: newProject.title,
            description: newProject.description,
            area: newProject.area
        }}
    )
}

module.exports.deleteProject = async function(projectId) {

    project = await Projects.findById(projectId)

    await Stationary_Map.projectCleanup(project._id)

    for(var i = 0; i < project.subareas.length; i++)   
        await Area.findByIdAndDelete(project.subareas[i])
    
    for(var i = 0; i < project.standingPoints.length; i++)   
        await Standing_Point.removeRefrence(project.standingPoints[i])

    for(var i = 0; i < project.stationaryCollections.length; i++)   
        await Stationary_Collections.deleteCollection(project.stationaryCollections[i])

    return await Projects.findByIdAndDelete(projectId)
}

module.exports.teamCleanup = async function(teamId) {
    const doc =  await Projects.find({ team: teamId })

    for(var i = 0; i < doc.length; i++){
        await Projects.deleteProject(doc[i]._id)
    }
}

module.exports.addStationaryCollection = async function (projectId, collectionId) {
     return await Projects.updateOne(
        { _id: projectId },
        { $push: { stationaryCollections:  collectionId}}
    )
}

module.exports.deleteStationaryCollection = async function(projectId, collectionId) {
    await Projects.updateOne(
        { _id: projectId },
        { $pull: { stationaryCollections: collectionId}}
    )
    return await Stationary_Collection.deleteCollection(collectionId)
}

module.exports.addMovingCollection = async function (projectId, collectionId) {
    return await Projects.updateOne(
       { _id: projectId },
       { $push: { movingCollections:  collectionId}}
   )
}

module.exports.deleteMovingCollection = async function(projectId, collectionId) {
   
   await Projects.updateOne(
       { _id: projectId },
       { $pull: { movingCollections: collectionId}}
   )
   return await Moving_Collection.deleteCollection(collectionId)
}

module.exports.addSoundCollection = async function (projectId, collectionId) {
    return await Projects.updateOne(
       { _id: projectId },
       { $push: { soundCollections:  collectionId}}
   )
}

module.exports.deleteSoundCollection = async function(projectId, collectionId) {
   
   await Projects.updateOne(
       { _id: projectId },
       { $pull: { soundCollections: collectionId}}
   )
   return await Sound_Collection.deleteCollection(collectionId)
}   

module.exports.addSurveyCollection = async function (projectId, collectionId) {
    return await Projects.updateOne(
       { _id: projectId },
       { $push: { surveyCollections:  collectionId}}
   )
}

module.exports.deleteSurveyCollection = async function(projectId, collectionId) {
   
   await Projects.updateOne(
       { _id: projectId },
       { $pull: { surveyCollections: collectionId}}
   )
   return await Survey_Collection.deleteCollection(collectionId)
}    

module.exports.addNatureCollection = async function (projectId, collectionId) {
    return await Projects.updateOne(
       { _id: projectId },
       { $push: { natureCollections:  collectionId}}
   )
}

module.exports.deleteNatureCollection = async function(projectId, collectionId) {
   
   await Projects.updateOne(
       { _id: projectId },
       { $pull: { natureCollections: collectionId}}
   )
   return await Nature_Collection.deleteCollection(collectionId)
}   

module.exports.addLightCollection = async function (projectId, collectionId) {
    return await Projects.updateOne(
       { _id: projectId },
       { $push: { lightCollections:  collectionId}}
   )
}

module.exports.deleteLightCollection = async function(projectId, collectionId) {
   
   await Projects.updateOne(
       { _id: projectId },
       { $pull: { lightCollections: collectionId}}
   )
   return await Light_Collection.deleteCollection(collectionId)
}  

module.exports.addBoundariesCollection = async function (projectId, collectionId) {
    return await Projects.updateOne(
       { _id: projectId },
       { $push: { boundariesCollections:  collectionId}}
   )
}

module.exports.deleteBoundariesCollection = async function(projectId, collectionId) {
   
   await Projects.updateOne(
       { _id: projectId },
       { $pull: { boundariesCollections: collectionId}}
   )
   return await Boundaries_Collection.deleteCollection(collectionId)
}   

module.exports.addOrderCollection = async function (projectId, collectionId) {
    return await Projects.updateOne(
       { _id: projectId },
       { $push: { orderCollections:  collectionId}}
   )
}

module.exports.deleteOrderCollection = async function(projectId, collectionId) {
   
   await Projects.updateOne(
       { _id: projectId },
       { $pull: { orderCollections: collectionId}}
   )
   return await Order_Collection.deleteCollection(collectionId)
}   


module.exports.addArea = async function(projectId, areaId) {
    return await Projects.updateOne(
        { _id: projectId },
        { $push: { subareas:  areaId}}
    )
}

module.exports.deleteArea = async function(projectId, areaId) {
    await Area.removeRefrence(areaId)
    return await Projects.updateOne(
      { _id: projectId },
      { $pull: { subareas: areaId}}
  )
}

module.exports.addPoint = async function(projectId, pointId) {
    return await Projects.updateOne(
        { _id: projectId },
        { $push: { standingPoints:  pointId}}
    )
}

module.exports.deletePoint = async function(projectId, pointId) {
    await Standing_Point.removeRefrence(pointId)
    return await Projects.updateOne(
      { _id: projectId },
      { $pull: { standingPoints: pointId}}
  )
}