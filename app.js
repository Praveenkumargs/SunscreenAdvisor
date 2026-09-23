import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs";



const app = express();
const port = process.env.PORT ||3000;

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    try {
        res.render('index',);
    } catch (error) {
        res.render('index', {
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
        res.render('index', { content: text,});
    } catch (error) {
        res.render('index', { content: error.message});        
    }
});

if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;