var express = require('express');
var router = express.Router();
const ActivityController = require("../controller/ActivityController")
const TodoController = require("../controller/TodoController")

/* GET home page. */
 
router.get('/activity-groups', ActivityController.findAll)
router.get('/activity-groups/:activityId', ActivityController.findOne)
router.post('/activity-groups', ActivityController.create)
router.patch('/activity-groups/:activityId', ActivityController.update)
router.delete('/activity-groups/:activityId', ActivityController.destroy)

// ===============atas belum di verivikasi
router.get('/todo-items',TodoController.findAll)
router.get('/todo-items/:todoId',TodoController.findOne)
router.post('/todo-items',TodoController.create)
router.delete('/todo-items/:todoId',TodoController.destroy)
router.patch('/todo-items/:todoId',TodoController.update)

module.exports = router;
