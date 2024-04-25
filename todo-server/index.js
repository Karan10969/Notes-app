import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'



const dbPromise = open({
  filename: 'data.db',
  driver: sqlite3.Database
})

const server = express();

server.use(cors())
server.use(bodyParser.json())

server.get('/', async (req, res) => {

    const db = await dbPromise
    const result = await db.all(
        'SELECT * from tasks'
    )
    res.json(result)
})

server.post('/', async(req, res)=>{

    const task = req.body.todotask
    const db = await dbPromise
    const result = await db.run('INSERT INTO tasks (todotask) VALUES (?);',task)
    res.send(result)

})


server.patch('/:id', async(req, res) => {
    
    const db = await dbPromise
    const updateId = req.params.id
    const data = req.body.upTask

    await db.run(
        'UPDATE tasks SET todotask = ? WHERE id = ?',data, updateId
    )

    res.json(data)
})


server.delete('/:id', async (req, res)=>{

    const delId = req.params.id
    const db = await dbPromise

    await db.run(`DELETE FROM tasks WHERE id=${delId}`)

    res.send("delete successful")
})

async function setup(){

    const db = await dbPromise
    await db.migrate()

    server.listen(8000, ()=>{
        console.log('server is connected')
    })
}
setup();
