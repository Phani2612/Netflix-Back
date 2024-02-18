const Express = require('express')

const Mongoose = require('mongoose')

const obj = require('./Database')

const Filesystem = require('fs')

const Data = require('./Action.json')



const App = Express()

const CORS = require('cors')

App.use(Express.json())

App.use(Express.urlencoded())

App.use(CORS())





App.post('/Register', async function(req,res)
{
    const data = req.body.Info

    // console.log(data)
    const DB = await obj.con()

    await DB.collection('Users').insertOne(data)

    res.send('Added successfully')


})





App.get('/Tv',async function(req,res)
{
    const DB = await obj.con()

    const data = await DB.collection('Tvshows').find().toArray()

    res.send(data)
})

App.get('/Action' , async function(req,res)
{

    const DB = await obj.con()

    const data = await DB.collection('Action').find().toArray()

    res.send(data)

    
    
 })


App.post('/add' , async function(req,res)
{
      const detail = req.body

      const indexdata = detail.data.index

      

      const DB = await obj.con()

      const alreadypresentdata = await DB.collection('Mylist').findOne({index : indexdata})

      if(alreadypresentdata){

             await DB.collection('Mylist').deleteOne(alreadypresentdata)

             res.send({...detail.data ,icon : 'faPlus'})

             
      }

      else{

        await DB.collection('Mylist').insertOne(detail.data)

        res.send("Data added successfully")

      }
})

App.delete('/delete/:id',async function(req,res)
{
    const data = req.params.id

    
    console.log(data)
   

    const DB = await obj.con()

    

   const deleted = await DB.collection('Mylist').deleteOne({index : data })

   res.send("deleted successfully")
})



 App.get('/Romance' , async function(req,res)
{

    const DB = await obj.con()

    const data = await DB.collection('Romance').find().toArray()

    res.send(data)

    
    
 })

 App.get('/Comedy' , async function(req,res)
{

    const DB = await obj.con()

    const data = await DB.collection('Comedy').find().toArray()

    res.redirect('/login')

    
    
 })

 App.get('/Horror' , async function(req,res)
{

    const DB = await obj.con()

    const data = await DB.collection('Horror').find().toArray()

    res.send(data)

    
    
 })

 App.get('/Docu' , async function(req,res)
{

    const DB = await obj.con()

    const data = await DB.collection('Docus').find().toArray()

    res.send(data)

    
    
 })



 App.get('/Scifi' , async function(req,res)
 {
 
     const DB = await obj.con()
 
     const data = await DB.collection('Scifi').find().toArray()
 
     res.send(data)
 
     
     
  })

  App.get('/India' , async function(req,res)
  {
  
      const DB = await obj.con()
  
      const data = await DB.collection('India').find().toArray()
  
      res.send(data)
  
      
      
   })

   App.get('/Recent' , async function(req,res)
  {
  
      const DB = await obj.con()
  
      const data = await DB.collection('Recent').find().toArray()

      console.log(data)
  
      res.send(data)
  
      
      
   })



   App.get('/mylist' , async function(req,res)
   {
         const DB = await obj.con()

         const data = await DB.collection('Mylist').find().toArray()

         res.send(data)
   })

   App.get('/upcoming' , async function(req,res)
   {
       const DB = await obj.con()

       const data = await DB.collection('Upcoming').find().toArray()

       console.log(data)

       res.send(data)
   })



App.listen(5000 , function()
{
    console.log("Port is running at 5000")
})



