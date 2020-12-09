const { response } = require('express')
const Event = require('../models/Event')


//TODO GetEvents
const getEvents = async (req, res = response) => {

     try {

        const events = await Event.find()
            .populate('user','name')

        if( !events ){
            return res.status(400).json({
                ok: false,
                msg: 'No events'
            })
        }

        await res.json({
            ok: true,
            msg: events
        })

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: 'please talk to the administrator'
        })
    }

}

//TODO Create Event
const createEvent = async (req, res = express.response) => {

    const event = new Event(req.body)

    try {

        event.user = req.uid
        await event. save()

        res.json({
            ok: true,
            msg: event
        })

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: 'please talk to the administrator'
        })
    }

}

//TODO Update Event
const updateEvent = async (req, res = express.response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {

        const event = await Event.findById(eventId)


        if(!event){
           return res.status(404).json({
                ok: true,
                msg: 'event does not exist'
            })

        }

        if(event.user.toString() !==uid){
            return res.status(401).json({
                ok: true,
                msg: 'you dont have the permissions'
            })
        }

        const newEvent = {
            ...req.body,
            user : uid,
        }

        const eventupdate = await Event.findByIdAndUpdate( eventId, newEvent)

        res.status(200).json({
            ok: true,
            msg: eventupdate
        })

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: 'please talk to the administrator'
        })
    }

}

//TODO Delete Event
const deleteEvent = async (req, res = express.response) => {

    const eventId = req.params.id
    const uid = req.uid
    try {

        const event = await Event.findById(eventId)

        if(!event){
            return res.status(404).json({
                ok: true,
                msg: 'event does not exist'
            })

        }

        if(event.user.toString() !==uid){
            return res.status(401).json({
                ok: true,
                msg: 'you dont have the permissions'
            })
        }

        await Event.findByIdAndDelete( eventId)

        res.status(200).json({
            ok: true,
            msg: 'Event deleted'
        })

    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: 'please talk to the administrator'
        })
    }

}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent

}
