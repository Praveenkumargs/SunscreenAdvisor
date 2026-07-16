import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    try {
        res.render('index.ejs',);
    } catch (error) {
        res.render('index.ejs', {
            content : error.message,
        });
    }
});

app.post('/', async (req,res) => {
    try {
        const result = await axios.get(`https://currentuvindex.com/api/v1/uvi?latitude=${req.body.latitude}&longitude=${req.body.longitude}`);
        console.log(result.data.now.uvi);
        if(result.data.now.uvi >= 3 ){
            var text = 'UV Index is High. Apply sunscreen! ☀️';
        } else {
            var text = 'UV Index is Low. You can safely stay outdoors without sunscreen. 😊';
        }
        res.render('index.ejs', { content: text,});
    } catch (error) {
        res.render('index.ejs', { content: error.message});        
    }
});

app.listen(port, () =>{
    console.log(`Server is running in port ${port}`);
});