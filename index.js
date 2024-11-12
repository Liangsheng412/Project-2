//DB - 0 - install and load lowdb module
import express from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const app = express();

//DB - 1 - connect to the DB
const defaultData = { comicTrackerData: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

//to parse JSON
app.use(express.json());

//add a route on server, that is listening for a post request
app.post('/nacomic', (req, res) => {
    console.log(req.body);
    let obj = {
        comic: req.body.name,
        likes: 0
    }

    //DB - 2 - add value to the DB
    db.data.comicTrackerData.push(obj);
    db.write()
        .then(() => {
            res.json({ task: "success" });
        })
})

// DB3 add likes
app.post('/likecomic', (req, res) => {
    const { comicName } = req.body;
    db.read().then(() => {
        const comic = db.data.comicTrackerData.find(item => item.comic === comicName);
        if (comic) {
            comic.likes += 1;
            db.write().then(() => {
                res.json({ task: "like added", newLikes: comic.likes });
            });
        } else {
            res.status(404).json({ task: "comic not found" });
        }
    });
});

app.use('/', express.static('public'));
app.listen(5000, () => {
    console.log('listening at localhost:5000');
})

//add route to get all comic track information
app.get('/getcomic', (req, res) => {
    //DB - 3 - fetch from the DB
    db.read()
    .then(() =>{
        let obj = {data: db.data.comicTrackerData}
        res.json(obj);
    })
})