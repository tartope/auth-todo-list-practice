const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

//all todos and name 

router.get('/', authorization, async (req, res) =>{
    try {
        
        //req.user.id has the payload
        //res.json(req.user.id)
        // const user = await pool.query('SELECT user_name FROM users WHERE user_id = $1', [req.user.id]);
        //used WHERE to get the one specific user's data (not everyone's data)
        const user = await pool.query('SELECT users.user_name, todos.todo_id, todos.description FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1', [req.user.id]);  //Can use 'Alias' shortens the query to 'SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1', [req.user.id]'

        res.json(user.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

//create a todo
//it takes time to create/get data, so 'async' lets the function 'await' before it continues.
router.post('/todos', authorization, async(req,res)=>{
    //try/catch is for error handling
    try {
        const { description } = req.body;
        const newTodo = await pool.query('INSERT INTO todos (user_id, description) VALUES($1, $2) RETURNING *', [req.user.id, description]);  //'[description]' inside the query is the value of $1 (allows dynamic data). 'RETURNING *' used to return the data when you insert/update/delete data.
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});

//update a todo
router.put("/todos/:id", authorization, async (req,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query('UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *', [description, id, req.user.id]);

        if(updateTodo.rows.length === 0){
            return res.json('This todo is not yours');
        }
        res.json('Todo was updated!');

    } catch (err) {
        console.error(err.message);
    }
});

//delete a todo
router.delete('/todos/:id/', authorization, async(req,res)=>{
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query('DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *', [id, req.user.id]);

        if(deleteTodo.rows.length === 0){
            return res.json('This todo is not yours');
        }
        
        res.json('Todo was deleted!');

    } catch (err) {
        console.error(err.message);
    }
});



module.exports = router;