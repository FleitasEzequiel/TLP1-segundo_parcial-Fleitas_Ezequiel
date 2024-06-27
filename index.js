const baseDatos = [
    {
        id: 1,
        name: "Manzanas",
        quantity:1,
        price: "$20"
    },
    {
        id: 2,
        name: "Bananas",
        quantity:1,
        price: "$45"
    },
    {
        id: 3,
        name: "Peras",
        quantity:1,
        price: "$60"
    },
    {
        id: 4,
        name: "Naranjas",
        quantity:1,
        price: "$25"
    },
    {
        id: 5,
        name: "Pomelo",
        quantity:1,
        price: "$60"
    }
]

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express();

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
//Server
app.listen(3000,()=>{
    console.log('Server está ejecutandose en el puerto 3000')
})
//Rutas
app.get('/products',(req,res)=>{
    res.send(baseDatos)
})
app.get('/products/:id',(req,res)=>{
    const id = req.params.id
    const indice = baseDatos.findIndex((fruta)=>fruta.id==id) 
    if (indice==-1){
        res.status(404).send('No se encontró el producto')
    }else{
        res.send(baseDatos[indice])
    }
})
app.post('/products',(req,res)=>{
    const id = baseDatos.length + 1
    const {name, quantity, price} = req.body
    const datos = {
        Id: id,
        name: name,
        quantity: quantity,
        price: price
    }
    baseDatos.push(datos)
    res.send(baseDatos)
})
app.delete('/products/:id',(req,res)=>{
    const id = req.params.id
    const indice = baseDatos.findIndex((fruta)=>fruta.id==id)
    console.log(indice)
    if (indice == -1){
        res.status(404).send('No sé encontró el producto')
    }else{
    baseDatos.splice(indice,1)
    res.send(baseDatos)
    }
})