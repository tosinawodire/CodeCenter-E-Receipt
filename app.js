const express = require('express'),
		   ejs = require('ejs'),
           app = express();
           

           app.use(express.urlencoded({extended:true}));
           app.use(express.static("public"));
           app.set('view engine', 'ejs');
       
       
           
           //Routes
	app.use('/', require('./routes/index')); 

	

    //
	app.listen(2000, function(){
       
		console.log("Server started on port 2000");
	})