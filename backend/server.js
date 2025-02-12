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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; 
    const startIndex = (page - 1) * limit; 
    const endIndex = startIndex + limit; 
   
    
    const sortBy = req.query.sortBy || 'id'; 
    
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; 
    
    const sortedData = data.sort((a, b) => { 
    if (a[sortBy] < b[sortBy]) { 
        
            return -sortOrder; 
        } 
        if (a[sortBy] > b[sortBy]) { 
        
            return sortOrder; 
        } 
        
        return 0; 
    }); 
   
    const paginatedData = sortedData.slice(startIndex, endIndex); 

    res.json({
        totalItems: data.length, 
        totalPages: Math.ceil(data.length / limit), 
        currentPage: page, 
        itemsPerPage: limit, 
        items: paginatedData,
        totalItems: sortedData.length, 
        totalPages: Math.ceil(sortedData.length / limit), 

    });

});


app.post('/konyvek', (req, res) => {
    const data = dataRead();
    const newBook = req.body;
    newBook.id = data.length + 1;
    if(newBook.available === true){
        newBook.available = "true"
    }
    else{
        newBook.available = "false"
    }
    data.push(newBook);
    writeData(data);
    res.json(newBook);
});

app.put('/konyvek/:id', (req, res) => {
    const data = dataRead();
    const id = parseInt(req.params.id);
    const newBook = req.body;
    newBook.id = id;
    if(newBook.available === true){
        newBook.available = "true"
    }
    else{
        newBook.available = "false"
    }
    const index = data.findIndex(item => item.id === id);
    data[index] = newBook;
    writeData(data);
    res.json(newBook);
});

app.get('/konyvek/:id', (req, res) => {
    const data = dataRead();
    const id = parseInt(req.params.id);
    const book = data.find(item => item.id === id);
    res.json(book);
});

app.delete('/konyvek/:id', (req, res) => {
    const data = dataRead();
    const id = parseInt(req.params.id);
    const book = data.find(item => item.id === id);
    const index = data.indexOf(book);
    data.splice(index, 1);
    writeData(data);
    res.json(book);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})