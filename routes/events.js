const {isDate} = require("../helpers/isDate")
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/event')
const { Router } = require('express');
const { check } = require('express-validator')
const { validateJWt } = require('../middlewares/validateJWT')
const router = Router()
const {validateFields  } = require('../middlewares/validateFields')



//get events
router.get('/',validateJWt, getEvents)

//create new events
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio obligatoria').custom( isDate ),
        check('title','El titulo es obligatorio').not().isEmpty(),
        validateFields
    ],
    validateJWt,
    createEvent
)

//Update event
router.put('/:id',validateJWt, updateEvent)

//Delete event
router.delete('/:id',validateJWt, deleteEvent)


module.exports = router
