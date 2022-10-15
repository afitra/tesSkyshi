 
const {

    Todo
    
  } = require("../models")
 
  
  module.exports = {
    findAll: async (req, res) => {
        try {
            let todos=''
            if(req.query.activity_group_id){
                 todos= await Todo.findAll({
                 where:{
                     activity_group_id:req.query.activity_group_id
                 }
                })
            }else{
                todos= await Todo.findAll({})
            }



           res.status(200).json({
            status:"Success",
            message:"Success",
            data:todos
           })
        } catch (error) {
          res.status(500).send(`${error.message}`)
        }
      },
    findOne: async (req, res) => {
        try {
            let todos=''
          
            todos= await Todo.findByPk(req.params.todoId)
            

            if(!todos){
                res.status(404).json({
                    status:"Not FOund",
                    message:`Todo with ID ${req.params.todoId} Not Found`,
                    data:{}
                   })
            }
 
           res.status(200).json({
            status:"Success",
            message:"Success",
            data:todos
           })
        } catch (error) {
          res.status(500).send(`${error.message}`)
        }
      },
    create: async (req, res) => {
        try {

            if(!JSON.parse(req.rawBody).activity_group_id){
                res.status(400).json({
                    status:"Bad Request",
                    message:"activity_group_id cannot be null",
                    data:{}
                })
            }else if(!JSON.parse(req.rawBody).title){
                res.status(400).json({
                    status:"Bad Request",
                    message:"title cannot be null",
                    data:{}
                })
            }else{
                let newData = await Todo.create({
                    activity_group_id:JSON.parse(req.rawBody).activity_group_id,
                    title : JSON.parse(req.rawBody).title,
                    activity_group_id : JSON.parse(req.rawBody).activity_group_id ? JSON.parse(req.rawBody).activity_group_id : 3,
                    is_active : JSON.parse(req.rawBody).is_active ? JSON.parse(req.rawBody).is_active : true,
                    priority : JSON.parse(req.rawBody).priority ? JSON.parse(req.rawBody).priority : 'very-high',
                    created_at : Date(),
                    updated_at : Date()
                   })
                res.status(201).json({
                status:"Success",
                message:"Success",
                data:{
                    created_at : newData.created_at,
                    updated_at : newData.updated_at,
                    id : newData.id,
                    title : newData.title,
                    activity_group_id : newData.activity_group_id,
                    is_active : newData.is_active,
                    priority : newData.priority,
    
                }
                })
            }
            
        } catch (error) {
          res.status(500).send(`${error.message}`)
        }
      },
      destroy: async (req, res) => {
        try{
            var destroy=await  Todo.destroy({
                where: {
                  id: req.params.todoId,
                }
              })
            
            if(destroy){
                res.status(200).json({
                    status:"Success",
                    message:`Success`,
                    data:{}
                })
            }
            res.status(404).json({
                status:"Not Found",
                message:`Todo with ID ${req.params.todoId} Not Found`,
                data:{}
            })
            
                  
        }catch(error){
            res.status(500).send(`${error.message}`)
        }
      },
      update: async (req, res) => {
        try {
            
                let raw = JSON.parse(req.rawBody)
                let newData= await Todo.findByPk(req.params.todoId)
                if(!newData){
                     res.status(404).json({
                        status:"Not Found",
                        message:`Todo with ID ${req.params.todoId} Not Found`,
                        data:{}
                    })
                }else{

                    newData.activity_group_id = raw.activity_group_id ? raw.activity_group_id :  newData.activity_group_id 
                   
                    newData.title = raw.title ? raw.title :  newData.title 
                    newData.is_active = raw.is_active ? raw.is_active :  newData.is_active 
                    newData.priority = raw.priority ? raw.priority :  newData.priority 
                    newData.updated_at = Date()
              
                    await newData.save()
    
                    res.status(200).json({
                        status:"Success",
                        message:"Success",
                        data:{
                            id:newData.id,
                            activity_group_id:newData.activity_group_id,
                            title:newData.title,
                            is_active:newData.is_active,
                            priority:newData.priority,
                            created_at:newData.created_at,
                            updated_at:newData.updated_at,
                            deleted_at:newData.deleted_at,
                        }
                     })
                }

            
        }  catch (error) {
             
            res.status(500).send(`${error.message}`)
        }
      }
  }
  