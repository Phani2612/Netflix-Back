const Express = require('express')

const Mongoose = require('mongoose')

const obj = require('./Database')

const Filesystem = require('fs')




const Axios = require('axios')

require('dotenv').config()

const App = Express()

const CORS = require('cors')

App.use(Express.json())

App.use(Express.urlencoded())

App.use(CORS())


const Redis = require('redis')

// const RedisDatabase = Redis.createClient({


//     port: process.env.REDIS_PORT,
//     host: process.env.REDIS_HOST,
//     //In order to turn off queuing commands and get an error if we couldn't connect to the redis server
//     enable_offline_queue: false

// })

// RedisDatabase.connect()


// RedisDatabase.on("connect" , function()
// {
//      console.log("Redis connection is successful")
// })

// Redis cache clear
// const REDISIO = require('ioredis')

// const redis = new REDISIO();


// redis.flushall()
//   .then(() => {
//     console.log('Redis cache cleared successfully');
//   })
//   .catch((err) => {
//     console.error('Error clearing Redis cache:', err);
//   });

// // ////////////////////////////////////////////////

async function GetTVDetails(req,res,next)
{
    const DB = await obj.con()
    const Result = await DB.collection('Tv').find().toArray()

    console.log(Result)

    if(Result.length === 0)
        {
            next()
        }

        else{

            const GetAllthedata = await DB.collection('Tv').find().toArray()

            res.send(GetAllthedata)
        }
}


async function GetActionDetails(req,res,next)
{
    const DB = await obj.con()
    const Result = await DB.collection('Action').find().toArray()
   

    if(Result.length === 0)
        {
            next()
        }

        else{

            const GetAllthedata = await DB.collection('Action').find().toArray()

            res.send(GetAllthedata)
        }
}



async function GetRomanceDetails(req,res,next)
{
    

    const DB = await obj.con()
    const Result = await DB.collection('Romance').find().toArray()
    if(Result.length == 0)
        {
            next()
        }

        else{

            const GetAllthedata = await DB.collection('Romance').find().toArray()

            res.send(GetAllthedata)
        }
}


async function GetComedyDetails(req,res,next)
{

    const DB = await obj.con()
    const Result = await DB.collection('Comedy').find().toArray()

    if(Result.length === 0)
        {
            next()
        }

        else{

            const GetAllthedata = await DB.collection('Comedy').find().toArray()

            res.send(GetAllthedata)
        }
}

async function GetHorrorDetails(req,res,next)
{

    const DB = await obj.con()

    const Result = await DB.collection('Horror').find().toArray()

    if(Result.length === 0)
        {
            next()
        }

        else{

            const GetAllthedata = await DB.collection('Horror').find().toArray()

            res.send(GetAllthedata)
        }
}


async function GetDocuDetails(req,res,next)
{
   

    const DB = await obj.con()

    const Result = await DB.collection('Docu').find().toArray()


    if(Result.length === 0)
        {
            next()
        }

        else{

            const GetAllthedata = await DB.collection('Docu').find().toArray()

            res.send(GetAllthedata)
        }
}


async function GetScifiDetails(req,res,next)
{
   
    const DB = await obj.con()

    const Result = await DB.collection('Scifi').find().toArray()

    console.log(Result)

    if(Result.length === 0)
        {
            next()
        }

        else{

            const GetAllthedata = await DB.collection('Scifi').find().toArray()

            res.send(GetAllthedata)
        }
}




async function GetIndiaDetails(req,res,next)
{

    const DB = await obj.con()

    const Result = await DB.collection('India').find().toArray()

    console.log(Result)

    if(Result.length === 0)
        {
            next()
        }

        else{

            const GetAllthedata = await DB.collection('India').find().toArray()

            res.send(GetAllthedata)
        }
}


async function GetRecentDetails(req,res,next)
{
    

    const DB = await obj.con()

    const Result = await await DB.collection('Recent').find().toArray()


    if(Result.length === 0)
        {
            next()
        }

        else{

            const GetAllthedata = await DB.collection('Recent').find().toArray()

            res.send(GetAllthedata)
        }
}





async function GetUpcomingDetails(req,res,next)
{
   

    const DB = await obj.con()

    const Result = await DB.collection('Upcoming').find().toArray()


    if(Result.length === 0)
        {
            next()
        }

        else{

            const GetAllthedata = await DB.collection('Upcoming').find().toArray()

            res.send(GetAllthedata)
        }
}




App.get('/Tv', GetTVDetails ,async function(req,res)
{

    const DB = await obj.con()
    Axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=32f9e877489c276a3376f21bd753a432
    `).then(async function(output)
    {
        //  RedisDatabase.setEx("Tv" , 3600 , JSON.stringify(output.data))

         const AllTvdetails = await DB.collection('Tv').insertMany(output.data.results)

     const GetAlltheTVdata = await DB.collection('Tv').find().toArray()
    


    //  res.send(Allitems)

     res.send(GetAlltheTVdata)


        //  res.send(output.data)
    }).catch(function(error)
    {
        console.error(error)
    })
    
})

App.get('/Action' ,GetActionDetails ,async function(req,res)
{

     const DB = await obj.con()
    

    Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=32f9e877489c276a3376f21bd753a432&with_genres=28&sort_by=popularity.desc`).then(async function(output)
{
    //  RedisDatabase.setEx("Action" , 3600 , JSON.stringify(output.data))

     const Alldetails = await DB.collection('Action').insertMany(output.data.results)

     const GetAllthedata = await DB.collection('Action').find().toArray()
    


    //  res.send(Allitems)

     res.send(GetAllthedata)


}).catch(function(error)
{
    console.error(error)
})

    
    
 })


App.post('/add' , async function(req,res)
{
      const detail = req.body

      console.log(detail)

      

      const DB = await obj.con()

        const isitthere = await DB.collection('Mylist').findOne({id : detail.id})

        if(!isitthere)
            {
                await DB.collection('Mylist').insertOne(detail)

                res.send("Data added successfully")
            }

        else{


            return
        }
      
       




})

App.delete('/delete/:id',async function(req,res)
{
    const data = parseInt(req.params.id)


    const DB = await obj.con()



   const Info =  await DB.collection('Mylist').deleteOne({id : data})

   console.log(Info)

   res.send("deleted successfully")
})










 App.get('/Romance' ,GetRomanceDetails ,async function(req,res)
{

    const DB = await obj.con()
  
    
    Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=32f9e877489c276a3376f21bd753a432&with_genres=10749&sort_by=popularity.desc
    `).then(async function(output)
{
    //  RedisDatabase.setEx("Romance" , 3600 , JSON.stringify(output.data))
     const Alldetails = await DB.collection('Romance').insertMany(output.data.results)

     const GetAlltheRomancedata = await DB.collection('Romance').find().toArray()
    


    //  res.send(Allitems)

     res.send(GetAlltheRomancedata)

    //  res.send(output.data)
}).catch(function(error)
{
    console.error(error)
})

    
    
 })

 App.get('/Comedy' , GetComedyDetails ,async function(req,res)
{
    const DB = await obj.con()
    Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=32f9e877489c276a3376f21bd753a432&with_genres=35&sort_by=popularity.desc`).then(async function(output)
{
    //  RedisDatabase.setEx("Comedy" , 3600 , JSON.stringify(output.data))
    //  res.send(output.data)

    const Alldetails = await DB.collection('Comedy').insertMany(output.data.results)

     const GetAllthedata = await DB.collection('Comedy').find().toArray()
    


    //  res.send(Allitems)

     res.send(GetAllthedata)

}).catch(function(error)
{
    console.error(error)
})

    
    
 })

 App.get('/Horror' , GetHorrorDetails ,async function(req,res)
{

    const DB = await obj.con()
    Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=32f9e877489c276a3376f21bd753a432&with_genres=27&sort_by=popularity.desc
    `).then(async function(output)
    {
        //  RedisDatabase.setEx("Horror" , 3600 , JSON.stringify(output.data))



         const Alldetails = await DB.collection('Horror').insertMany(output.data.results)

         const GetAllthedata = await DB.collection('Horror').find().toArray()
        
    
    
        //  res.send(Allitems)
    
         res.send(GetAllthedata)
        //  res.send(output.data)
    }).catch(function(error)
    {
        console.error(error)
    })
    
    
 })

 App.get('/Docu' , GetDocuDetails , async function(req,res)
{
    const DB = await obj.con()
    Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=32f9e877489c276a3376f21bd753a432&with_genres=99&sort_by=popularity.desc

    `).then(async function(output)
    {
        //  RedisDatabase.setEx("Docu" , 3600 , JSON.stringify(output.data))
        //  res.send(output.data)

        const Alldetails = await DB.collection('Docu').insertMany(output.data.results)

        const GetAllthedata = await DB.collection('Docu').find().toArray()
       
   
   
       //  res.send(Allitems)
   
        res.send(GetAllthedata)

    }).catch(function(error)
    {
        console.error(error)
    })

    
    
 })



 App.get('/Scifi' , GetScifiDetails ,async function(req,res)
 {
    const DB = await obj.con()
 
    Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=32f9e877489c276a3376f21bd753a432&with_genres=878&sort_by=popularity.desc


    `).then(async function(output)
    {
        //  RedisDatabase.setEx("Scifi" , 3600 , JSON.stringify(output.data))
        //  res.send(output.data)

        const Alldetails = await DB.collection('Scifi').insertMany(output.data.results)

        const GetAllthedata = await DB.collection('Scifi').find().toArray()
       
   
   
       //  res.send(Allitems)
   
        res.send(GetAllthedata)
    }).catch(function(error)
    {
        console.error(error)
    })
     
     
  })

  App.get('/India' , GetIndiaDetails ,async function(req,res)
  {
  
    const DB = await obj.con()
  
    Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=32f9e877489c276a3376f21bd753a432&with_original_language=te&sort_by=popularity.desc



    `).then(async function(output)
    {
        //  RedisDatabase.setEx("India" , 3600 , JSON.stringify(output.data))
        //  res.send(output.data)
        const Alldetails = await DB.collection('India').insertMany(output.data.results)

        const GetAllthedata = await DB.collection('India').find().toArray()
       
   
   
       //  res.send(Allitems)
   
        res.send(GetAllthedata)
    }).catch(function(error)
    {
        console.error(error)
    })
      
      
   })

   

   App.get('/Recent' , GetRecentDetails ,async function(req,res)
  {
  
    const DB = await obj.con()
    Axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=32f9e877489c276a3376f21bd753a432




    `).then(async function(output)
    {
        //  RedisDatabase.setEx("Recent" , 3600 , JSON.stringify(output.data))
        //  res.send(output.data)

        const Alldetails = await DB.collection('Recent').insertMany(output.data.results)

        const GetAllthedata = await DB.collection('Recent').find().toArray()
       
   
   
       //  res.send(Allitems)
   
        res.send(GetAllthedata)
    }).catch(function(error)
    {
        console.error(error)
    })
      
      
   })






   App.get('/mylist' , async function(req,res)
   {  

       const DB = await obj.con()

       const findall = await DB.collection('Mylist').find().toArray()

       res.send(findall)
          
   })






   App.get('/upcoming' ,GetUpcomingDetails ,async function(req,res)
   {

    const DB = await obj.con()
    Axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=32f9e877489c276a3376f21bd753a432`).then(async function(output)
    {
        //  RedisDatabase.setEx("Upcoming" , 3600 , JSON.stringify(output.data))
        //  res.send(output.data)
        const Alldetails = await DB.collection('Upcoming').insertMany(output.data.results)

        const GetAllthedata = await DB.collection('Upcoming').find().toArray()
       
   
   
       //  res.send(Allitems)
   
        res.send(GetAllthedata)
    }).catch(function(error)
    {
        console.error(error)
    })
   })



App.listen(5000 , function()
{
    console.log("Port is running at 5000")
})



