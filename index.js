import express from "express";
import Joi from "joi";

const app = express();

app.use(express.json());

const PORT=2000;

const courses = [
{id:1, name: "course1"},
{id:2, name: "course2"},
{id:3, name: "course3"},
];

//all courses
app.get('/api/courses', (req,res)=> {
    console.log("welcome to homepage");
    res.send(courses);
});

//create new course, please use postman to allow POST method
app.post('/api/courses/create', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required()
    });

    return res.send(req.body);

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(404).send(result.error.details[0].message);
        console.log('add attempt failed');
        return;
    };
 

    //get the new course
    const course = {
        id: courses.length+1,
        name: req.body.name,      
    };

    courses.push(course);
    res.send(course);
    console.log('new course added '  + req.body.name);
    });



//find
app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`Requested id ${req.params.id} not found.`);
    res.send(course);
});


//delete
app.delete('/api/courses/:id',(req,res)=> {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    console.log('Deleting id..finding the id to be deleted..');
    if (!course) {
        res.status(400).send(`Requested id ${req.params.id} not found.`);
        return;
    }
    
    //delete the index
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send('ID was deleted');
    res.send(course);

});

//put / update
app.put('/api/courses/:id', (req, res)=> {
    const course = courses.find(c=> c.id===parseInt(req.params.id));
    if (!course) {
        console.log(res.status(400).send('ID for update not found'));
        return;
    }

    //const course = courses.indexOf(course);
    course.name = req.body.name;
    const result = courses.push(course);
    res.send(courses);
    console.log('course name was udpated!');

});

app.listen(PORT, ()=> console.log(`Listening on port ${PORT} ...`));