const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Task = require('./models/task')
const mongoUrl = 'mongodb+srv://daysi:valentina@cluster0.mk8vy7b.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoUrl, {useNewUrlParser: true , useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind("error no mongo"))

app.use(express.static('./views'))
app.set('view engine', 'ejs')

app.get('/visualizar', async (req, res) => {
    const task = await Task.find({})

    res.json({ task })
})
app.post('/crear', async (req, res) => {
    const task = await Task.create({name: 'commitar'})

    res.json({task})
})

app.put('/atualizar/:id', async (req, res) => {
    const task = await Task.findById(req.params.id)
 
    task.name= 'actualizado'
    task.status = true

    await task.save()
})

app.delete('/delete/:id', async (req, res) => {
    await Task.deleteOne({ _id: req.params.id}, () => {
        console.log('Deletado do MongoDB!')
    })
})

function UserException(message) {
    this.message = message;
    this.name = "UserException";
 }
 try {
     let numero = document.getElementById("campoNumero").value;
     if(numero < 0) {
         throw new UserException("O número deve ser inteiro e positivo");
     }
 } catch (error) {
     console.log(error.name); //UserException
     console.log(error.message); //O número deve ser inteiro e positivo
 }

 try {
    eval("alert('hello')");
 }  catch (error){
    console.log('name', error.name);
    console.log('message', error.message);
 }

 let = num = 1;
try {
    num.toUpperCase();
} catch (error) {
    console.log('name', error.name);
    console.log('message', error.message); 
}

// app.get('/', (req, res) => {
//      res.render('home')
// })

// app.get('/produtos', (req, res) => {
//     res.send('produtos')
// })


// app.post('/cadastro', (req, res) => {
//     res.send('Cadastro Realizado!')
// })

// app.put('/atualizarperfil', (req, res) => {
//     res.send('Perfil atualizado!')
// })

// app.delete('/deletarperfil', (req, res) => {
//     res.send('Conta deletada!')
// })

app.listen(8080, () => {
    console.log('Servidor funcionando. Acesse: localhost: 8080')
})
