const express = require("express")

const router = express.Router()

const Data = require ('../data/helpers/actionModel')




////////////////// GET *********** GET  ******** GET ////////////

router.get('/', (req, res) => {
    Data.get()
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: 'This is embarassing.  We will can do better'
        })
    })
})

//////// GetById ***********  GetById *********** GetById *********** 

router.get('/:id', (req, res) => {
    const id = req.params.id 
    Data.get(id)
    .then(post => {
        console.log(post)
        if(post === null) {
            res.status(404).json({message: "The action with the specified ID does not exist"})
        } else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'This is embarassing.  We will can do better' })
    })
})

//////// Post Post Post  ***********  POST POST  *********** Post Post Post *********** 

router.post('/', (req,res) => {
    if (!req.body.project_id || !req.body.description) {
        res.status(400).json({errorMessage: "Please provide a project_id and description"})
    } else {
        Data.get(req.body.project_id)
        .then(thing => {
            console.log(thing)
            if(thing === null) {
                res.status(404).json({message: "The ..... with the specified ID does not exist"})
            } else {
                Data.insert(req.body)
                .then(post => {
                    res.status(201).json(req.body)
                })
                .catch(err => {
                    res.status(500).json({errorMessage: 'There was an error saving this to the database' })
                })
            }
        })
    }
})


//////// Put Put Put ***********  PUT PUT   *********** Put Put Put  *********** 

router.put('/:id', (req, res) => {
    if (!req.body.project_id || !req.body.description) {
        res.status(400).json({errorMessage: "Please provide a project_id and description"})
    } else {
        Data.update(req.params.id, req.body)
            .then(post => {
                if(post) {
                    res.status(200).json(req.body)
                } else {
                    res.status(404).json({message: "The ..... with the specified ID does not exist"})
                }
            })
            .catch(error => {
                res.status(500).json({errorMessage: 'There was an error saving your changes to the database' })
            })
    }
})

//////// Delete Delete ***********  DELETE DELETE  *********** DELETE DELETE  *********** 

router.delete('/:id', (req, res) => {
    Data.remove(req.params.id)
        .then(post => {
            if(post) {
                res.status(200).json({message: "deleted delted deleted deleted"} )
            } else {
                res.status(404).json({message: "The ..... with the specified ID does not exist"})
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'There was an error saving your changes to the database' })
        })
})

module.exports = router;