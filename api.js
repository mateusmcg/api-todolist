//Packages
var express = require('express'),
    bodyParser = require('body-parser'),
    Models = require('./app/database/models'),
    dataBase = require('./app/database/db');

//Init express
var app = express();

//Configure app to user BodyParser
//This will let us get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set the port
var port = process.env.PORT || 5000;

// ############### INÍCIO ROTAS ####################
var router = express.Router();

// Página inicial
router.use(function (req, res, next) {
    console.log('Startando API.');
    next();
});

//Default router (/api)
router.get('/', function (req, res) {
    res.json({
        message: 'ToDo List API functioning normally !',
        status: 200
    });
});

// PROJETOS
router.route('/projetos')

    .get(function (req, res) {
        Models.Projeto.find({}, function(err, docs){
            res.json(docs);
        });
    })
    .post(function (req, res) {
        var projeto = new Models.Projeto();
        projeto.nome = 'Projeto teste';
        projeto.descricao = 'Descricao teste';
        projeto.dataCriacao = new Date();
        projeto.email = 'teste@gmail.com';
        projeto.tarefas.push({
            completed: false,
            note: 'Sou uma tarefa'
        });

        projeto.tarefas.push({
            completed: true,
            note: 'Sou uma tarefa 2'
        });

        projeto.save(function (err) {
            if (err) {
                res.json({ message: 'Erro :(', erro: err });
            } else {
                res.json({ message: 'Projeto criado com sucesso !' });
            }
        })
    });

router.route('/projetos/:id')

    .get(function (req, res) {
        var id = req.params.id;
        res.json({ message: 'Projeto com id = ' + id + ' recuperado' });
    })
    .put(function (req, res) {
        var id = req.params.id;
        res.json({ message: 'Projeto com id = ' + id + ' alterado', obj: req.body });
    })
    .delete(function (req, res) {
        var id = req.params.id;
        res.json({ message: 'Projeto com id = ' + id + ' removido', obj: req.body });
    });

// TAREFAS

router.route('/tarefas')

    .get(function (req, res) {
        res.json({ message: 'Todos os tarefas recuperados !' });
    })
    .post(function (req, res) {
        res.json({ message: 'Tarefa adicionado', requestObj: req.body });
    });

router.route('/tarefas/:id')

    .get(function (req, res) {
        var id = req.params.id;
        res.json({ message: 'Tarefa com id = ' + id + ' recuperado' });
    })
    .put(function (req, res) {
        var id = req.params.id;
        res.json({ message: 'Tarefa com id = ' + id + ' alterado', obj: req.body });
    })
    .delete(function (req, res) {
        var id = req.params.id;
        res.json({ message: 'Tarefa com id = ' + id + ' removido', obj: req.body });
    });

// ############### FIM ROTAS ####################

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Web server started at http://%s:%s', host, port);
});