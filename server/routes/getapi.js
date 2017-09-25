var express = require('express');
var router = express.Router();
var fs = require('fs');
var pg = require('pg');
var Promise = require('bluebird');
Promise.promisifyAll(require('pg'));


//-----------------Old functional connection -------------------//
const { Pool, Client } = require('pg')
var connectionString = 'postgresql://postgres:123456789@localhost/AmbrogioAcademy';

//Pas the table name to the url to get the table's data as JSON
const pool = new Pool({
    connectionString: connectionString,
  })
 

//--------------------------------------------------------------//  

  /* pool.query('SELECT * FROM user', (err, res) => {
    console.log(err, res)
    pool.end()
  }) */


//-------------------------- response object -----------------------
let response = {
    status: 200,
    data: [],
    message: null
};


//--------------------------------------- Get all users where the role is Student----------------------------------------
// client.query('SELECT * FROM User "' + req.params.tableName + '"', function (err, result) {
router.get('/users', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * FROM "User"  WHERE "RoleID"= 2', function (err, result) {
            if (err) {
                return console.error('error runing query', err);
            }
            //console.log(result.rows);
            done();
            response.data = result.rows;
            res.json(response);

        });
        //pool.end();
    });
});

//-------------------------------------------Create a User without promises-------------------------------
router.post('/adduser', function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('insert into "User"("FirstName", "LastName", "Email", "Password", "Photo", "RegisterDate") values($1, $2, $3, $4, $5, $6)',
      [req.body.FirstName, req.body.LastName, req.body.Email, req.body.Password, req.body.Photo, req.body.RegisterDate]);

      //console.log(result.rows);
      done();      
      res.redirect('/');
    });
  });

//-----------------------------------------Create user with promises---------------------------------------
router.post('/addsingleuser', function(req, res){
  pool.connect().then(client => {
    return client.query('insert into "User"("FirstName", "LastName", "Email", "Password", "Photo", "RegisterDate") values($1, $2, $3, $4, $5, $6)',
    [req.body.FirstName, req.body.LastName, req.body.Email, req.body.Password, req.body.Photo, req.body.RegisterDate] ).then(result => {
      //client.release()
      console.log(result.rows);      
    }).catch(e => {
      client.release()
      console.log(e.stack)
    })    
  })
  //res.redirect('/addsingleuser');
});

//-----------------------------------------Update user with promises---------------------------------------//
router.put('/updateuser/:id', function(req, res){
  pool.connect().then(client => {
    return client.query('UPDATE "User" SET "FirstName"=$1, "LastName"=$2, "Email"=$3, "Password"=$4, "Photo"=$5, "RegisterDate"=$6 where "UserID" = $7',
    [req.body.FirstName, req.body.LastName, req.body.Email, req.body.Password, req.body.Photo, req.body.RegisterDate, req.params.id])
    .then(result => {
      //client.release()
      response.data = result.rows;
      res.json(response.data);
      console.log(result.rows);      
    }).catch(e => {
      client.release()
      console.log(e.stack)
      res.redirect('/');
    })    
  })
});

//------------------------------------Get 1 User based on UserID----------------------------------//
router.get('/getsingleuser/:id', function(req, res){
  //var userID = parseInt(req.params.id);  
  pool.connect().then(client => {
    return client.query('SELECT * FROM "User" where "UserID" = $1', [req.params.id]).then(result => {
      //client.release()
      response.data = result.rows;
      res.json(response.data);
      console.log(result.rows)            
    }).catch(e => {
      client.release()
      console.log(e.stack)
    })   
  })
  //res.redirect('/getsingleuser');
});

/*---------------------------------Get Courses------------------------------------------*/ 
router.get('/getCourses', function(req, res){
  //var userID = parseInt(req.params.id);  
  pool.connect().then(client => {
    return client.query('SELECT * FROM "Course"').then(result => {
      //client.release()
      response.data = result.rows;
      res.json(response.data);
      console.log(result.rows)            
    }).catch(e => {
      client.release()
      console.log(e.stack)
    })   
  })
});

//==============================================GET POST All Categories==========================
router.route('/category').get(function(req, res){
  pool.connect().then(client => {
    return client.query('SELECT * FROM "Category"').then(result => {
      //client.release()
      response.data = result.rows;
      res.json(response.data);
      console.log(result.rows)            
    }).catch(e => {
      client.release()
      console.log(e.stack)      
    })   
  })
  
}).post(function (req, res) {
  pool.connect().then(client => {
    return client.query('INSERT INTO "Category" ("CategoryName", "CategoryDescription") values($1, $2)',
    [req.body.CategoryName, req.body.CategoryDescription]).then(result => {
      //client.release()
      console.log(result.rows);      
    }).catch(e => {
      client.release()
      console.log(e.stack)      
    })
  })
  res.redirect('/');   
})

//----------------------------------------------------------GET POST PUT DELETE Category-------------------------
router.route('/category/:id').get(function(req, res){
  pool.connect().then(client => {
    return client.query('SELECT * FROM "Category" WHERE "CategoryID" = $1', [req.params.id]).then(result => {
      //client.release()
      response.data = result.rows;
      res.json(response.data);
      console.log(result.rows)            
    }).catch(e => {
      client.release()
      console.log(e.stack)
    })   
  })
}).put(function(req, res){
  pool.connect().then(client => {
    return client.query('UPDATE "Category" SET "CategoryName"=$1, "CategoryDescription"=$2 WHERE "CategoryID" = $3',
    [req.body.CategoryName, req.body.CategoryDescription, req.params.id])
    .then(result => {
      //client.release()
      //response.data = result.rows;
      //res.json(response.data);
      //console.log(result.rows);      
    }).catch(e => {
      client.release()
      console.log(e.stack)
      res.redirect('/');
    })    
  })
}).delete(function(req, res) {
  pool.connect().then(client => {
    return client.query('Delete FROM "Category" WHERE "CategoryID" = $1', [req.params.id]).then(result => {
      //client.release()
      response.data = result.rows;
      res.json(response.data);
      console.log(result.rows)            
    }).catch(e => {
      client.release()
      console.log(e.stack)
    })   
  })
})

module.exports = router; 