const express = require('express'),
      router = express.Router();
      let conn = require('../database');

     let student_id = '';


//home page  get route
router.get('/', (req, res) => {

    res.render('index');

})



//post route to register students
router.post('/studentreg', (req, res) =>{

    // store all data in a variable
    const studentDetails= req.body;
    username = studentDetails.email;

        //here we check if the email exist in the database
    conn.query('SELECT * FROM student WHERE email = ?', [username], function(err, rows){
        if(err){
            console.log(err + 'user does not exist')

            res.redirect('/')
            return

        }
        
        else{
            if(!rows.length){
                //if email doesn't exist then insert student details into the database
                let studentInsert ='INSERT INTO student SET ?';
    conn.query(studentInsert, studentDetails, (err, data) => {
        if (err) throw err;
        console.log('Student Sucessfully inserted')
        });
    res.redirect('/')

            }
        }
    })
  });

  //Get route for registration page
router.get('/register', (req, res) => {

    // here we select from courses table
    conn.query('SELECT * FROM courses_setup', (err, courses, fields) => {
        if (!err)
          res.render('register', { course:courses });
        else
          console.log(err);
      })

})

//post route for register page
router.post('/find_student', (req, res)=>{
    let fid = req.body.student_id;
   // check for student if student exist and brings the record
    conn.query('SELECT * FROM student WHERE student_id = ?', [fid], (err, foundStudent, fields) =>{
        if(!err){
            
            // we select from the courses table to enable us have access to the course name and price
            conn.query('SELECT * FROM courses_setup', (err, courseStudent, fields) =>{
                if(!err){
                    student_id = fid;
                    res.render('register', {foundStudents:foundStudent, course:courseStudent})
                }
                else{
                    console.log(err)
                }
            })
        }
        else{
            console.log(err + 'Student does not exist')
        }
    })

})

router.get('/course_setup', (req, res) => {

    res.render('course_setup');

})

// route to select course and proceed to payment
router.post('/coursesetup', (req, res) =>{

    // store all data in a variable
    const courseDetails= req.body;
    courseName = courseDetails.course_name;

    //query to select from courses
    conn.query('SELECT * FROM courses_setup WHERE course_name = ?', [courseName], function(err, courseresult){
        if(err){
            console.log(err)

            res.redirect('course_setup')
            return
       }
        else{
            if(!courseresult.length){

                let courseInsert ='INSERT INTO courses_setup SET ?';
    conn.query(courseInsert, courseDetails, (err, data) => {
        if (err) throw err;
        console.log('Course Sucessfully inserted')
        });
    res.redirect('course_setup')

            }
        }
    })
  });


//get route to show list of registered students
router.get('/reg_students', (req, res)=>{
    conn.query('SELECT * FROM student', (err, rows, fields)=>{
        if(!err){
            res.render('registered_students', {results:rows})

        }else{
            console.log(err);
        }
    })
})



//get route to show list of registered courses
router.get('/reg_courses', (req, res) => {

    conn.query('SELECT * FROM courses_setup', (err, rows, fields)=>{
        if(!err){
            res.render('registered_courses', {results:rows})

        }else{
            console.log(err);
        }
    })

})

module.exports=router;