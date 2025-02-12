const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const dataPath = path.join(__dirname, './konyv.json');

const dataRead = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
}

const writeData = (content) => {
    fs.writeFileSync(dataPath, JSON.stringify(content), 'utf8');
}


app.get('/konyvek', (req, res) => {
    const data = dataRead();
    
    res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})