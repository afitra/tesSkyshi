 
const {
    Activity,
    
    
  } = require("../models")

class IndexController {
  static findAll(req, res, next) {
     
    Activity.findAll({ })
        .then((data) => {
            let response = {
                status:"Success",
                message:"Success",
                data
            }
          res.status(200).json(response)
        })
        .catch(next)
  }
  static create(req, res, next) {
    if(!JSON.parse(req.rawBody).title ){
      res.status(400).json({
        status:"Bad Request",
        message:"title cannot be null",
        data:{}
      })
    }else if(!JSON.parse(req.rawBody).email ){
      res.status(400).json({
        status:"Bad Request",
        message:"email cannot be null",
        data:{}
      })
    }else{
      Activity.create({ title:JSON.parse(req.rawBody).title,email:JSON.parse(req.rawBody).email,created_at: Date(),updated_at: Date(), })
          .then((data) => {
          
              res.status(201).json({
                status:"Success",
                message:"Success",
                data:{
                    created_at:data.created_at,
                    updated_at:data.updated_at,
                    id:data.id,
                    title:data.title,
                    email:data.email,
                }
            })
          })
          .catch(next)

    }
  }
  static findOne(req, res, next) {
  
    Activity.findByPk(req.params.activityId)
        .then((data) => {
           
          if(!data){
            res.status(404).json({
              status:"Not Found",
              message:`Activity with ID ${req.params.activityId} Not Found`,
              data:{}
          })
          }
            res.status(200).json({
                status:"Success",
                message:"Success",
                data
            })
        })
        .catch(next)
  }
  static async update(req, res, next) {
    try {
       
      let raw = JSON.parse(req.rawBody)
      let newData = await Activity.findByPk(req.params.activityId)
      if(!newData){
        res.status(404).json({
          status:"Bad Request",
          message:`Activity with ID ${req.params.activityId} Not Found`,
          data:{}
      })
      } else  if( !raw.title){
        res.status(400).json({
            status:"Bad Request",
            message:"Title cannot be null",
            data:{}
        })
      }else{
        
        newData.email = raw.email ? raw.email :  newData.email 
        newData.title = raw.title ? raw.title :  newData.title 
        newData.updated_at = Date()
        await newData.save()
            res.status(200).json({
              status:"Success",
              message:"Success",
              data:{
                  id:newData.id,
                  email:newData.email,
                  title:newData.title,
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
  static async destroy(req, res, next) {
  
    try{
        var destroy=await  Activity.destroy({
            where: {
              id: req.params.activityId,
            },
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
            message:`Activity with ID ${req.params.activityId} Not Found`,
            data:{}
        })
        
              
    }catch(error){
        next({
            status: 400,
            message:error.message,
          })
      }
  
  }
}
module.exports = IndexController;
