const ToDoModel = require('../models/ToDoModel');

module.exports.getToDos = async (req, res) => {
    const toDos = await ToDoModel.find();
    res.send(toDos);
}

module.exports.saveToDo =  (req, res) => {
    const {toDo} =  req.body 

    ToDoModel.create({toDo})
    .then(data => {
        console.log("Saved Successfully");
        res.status(201).send(data);
    })
    .catch((err) => {console.log(err)
        res.send("Error Creating")
    });
};

module.exports.updateToDo =  (req, res) => {
    const {id} = req.params
    const {toDo} =  req.body 

    ToDoModel.findByIdAndUpdate(id, {toDo})
    .then(() => {
        res.send("updated");
    })
    .catch((err) => {console.log(err)
        res.send("Error Updating")
    });
};

module.exports.deleteToDo =  (req, res) => {
    const {id} = req.params
    

    ToDoModel.findByIdAndDelete(id)
    .then(() => {
        res.send("Deleted");
    })
    .catch((err) => {console.log(err)
        res.send("Error Deleting")
    });
};