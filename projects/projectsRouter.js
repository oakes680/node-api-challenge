const express = require("express")

const router = express.Router()

const Data = require ('../data/helpers/projectModel')




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
        if(post.length < 1) {
            res.status(404).json({message: "The Project with the specified ID does not exist"})
        } else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'This is embarassing.  We will do better' })
    })
})


//////// Get All Actions For a Project ***********  Get All Actions For a Project *************** 

router.get('/actions/:id', (req, res) => {
    const id = req.params.id 
    Data.getProjectActions(id)
    .then(post => {
        console.log(post)
        if(post.length < 1) {
            res.status(404).json({message: "The Project with the specified ID does not exist"})
        } else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'This is embarassing.  We will do better' })
    })
})


//////// Post Post Post  ***********  POST POST  *********** Post Post Post *********** 

router.post('/', (req, res) => {
    if (!req.body.name|| !req.body.description) {
        res.status(400).json({errorMessage: "Please provide a project_id and description"})
    } else { 
        Data.insert(req.body)
        .then(post => {
            res.status(201).json({message:"Boom Success", body: req.body})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: 'This is embarassing.  We will do better' })
        })
    }
})

//////// Put Put Put   ***********  PUT PUT   *********** Put Put Put *********** 

router.put('/:id', (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({errorMessage: "Please provide a name and description"})
    } else {
        Data.update(req.params.id, req.body)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The Project with the specified ID does not exist"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'This is embarassing.  We will do better' })
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