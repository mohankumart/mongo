const express = require('express')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const engines = require('consolidate')

let app = express()

app.engine('html', engines.nunjucks)
app.set('view engine', 'html')
app.set('views', __dirname+'/views')

app.get('/', (req, res)=>{
    res.render('hello',{'name': 'Templates'})
})

app.use((req, res, next)=>{
    res.sendStatus(404)
})

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    debugger
    assert.equal(null, err)
    console.log("Successfully connected to server")
    let db = client.db('video')
    db.collection('movies').find({}).toArray((err, docs)=>{
        debugger
        docs.forEach(doc => {
            console.log(doc.title)
        });
    })
    client.close()
    console.log('called find()')
})

app.listen(3002,()=>{
    console.log('server started!!!! on 3002')
})