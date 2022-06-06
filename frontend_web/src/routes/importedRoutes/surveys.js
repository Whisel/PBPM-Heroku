const express = require('express')
const router = express.Router()
const Survey = require('../models/surveys.js')
const Project = require('../models/projects.js')
const Survey_Collection = require('../models/survey_collections.js')
const Team = require('../models/teams.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { models } = require('mongoose')

const { UnauthorizedError, BadRequestError } = require('../utils/errors')

router.post('', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    project = await Project.findById(req.body.project)

    if(await Team.isAdmin(project.team,user._id)){
        
        if(req.body.timeSlots){
            for(var i = 0; i < req.body.timeSlots.length; i++){
                var slot = req.body.timeSlots[0]

                let newSurvey = new Survey({
                    title: slot.title,
                    researchers: slot.researchers,
                    project: req.body.project,
                    sharedData: req.body.collection,
                    date: slot.date,
                    maxResearchers: slot.maxResearchers,
                })

                const map = await Survey.addSurvey(newSurvey)
                await Survey_Collection.addActivity(req.body.collection, survey._id)
            }
            res.status(201).json(await Survey_Collection.findById(req.body.collection))
        }

        let newSurvey = new Survey({
            title: req.body.title,
            researchers: req.body.researchers,
            project: req.body.project,
            sharedData: req.body.collection,
            date: req.body.date, 
            maxResearchers: req.body.maxResearchers,
        })
        const survey = await Survey.addSurvey(newSurvey)
        await Survey_Collection.addActivity(req.body.collection,survey._id)
        res.status(201).json(survey)

    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }   
})

router.get('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    const survey = await  Survey.findById(req.params.id)
                                .populate('researchers','firstname lastname')
                                .populate([
                                   {
                                   path:'sharedData',
                                   model:'Survey_Collections',
                                   select:'title duration ',
                                   populate: {
                                    path: 'area',
                                    model: 'Areas'
                                   }
                                }])
                           
    res.status(200).json(survey)
})

router.put('/:id/claim', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    survey = await Survey.findById(req.params.id)
    project = await Project.findById(survey.project)
    user = await req.user
    if(survey.researchers.length < survey.maxResearchers)
        if(Team.isUser(project.team,user._id)){
            res.status(200).json(await Survey.addResearcher(survey._id,user._id))
        }
        else
            throw new UnauthorizedError('You do not have permision to perform this operation')
    else 
        throw new BadRequestError('Research team is already full')
})

router.delete('/:id/claim', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    survey  = await Survey.findById(req.params.id)
    project = await Project.findById(survey.project)
    return res.status(200).json(await Survey.removeResearcher(survey._id,user._id))

})

router.put('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    survey  = await Survey.findById(req.params.id)
    
    let newSurvey = new Survey({
        title: (req.body.title ? req.body.title : survey.title),
        date: (req.body.date ? req.body.date : survey.date),
        maxResearchers: (req.body.maxResearchers ? req.body.maxResearchers : survey.maxResearchers),
    })

    project = await Project.findById(survey.project)

    if (await Team.isAdmin(project.team,user._id)){
        res.status(201).json(await Survey.updateSurvey(req.params.id,newSurvey))
    }

    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }
    
})

router.delete('/:id', passport.authenticate('jwt',{session:false}), async (req, res, next) => {
    user = await req.user
    survey  = await Survey.findById(req.params.id)
    project = await Project.findById(survey.project)
    if(await Team.isAdmin(project.team,user._id)){
        res.json(await Survey_Collection.deleteSurvey(survey.sharedData,survey._id))
    }
    else{
        throw new UnauthorizedError('You do not have permision to perform this operation')
    }

})

module.exports = router