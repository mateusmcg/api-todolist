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
        console.log(req);
        var userEmail = req.query.email;
        Models.Projeto.find({ email: userEmail }, function (err, docs) {
            res.json(docs);
        });
    })
    .post(function (req, res) {
        console.log(req);
        var body = req.body;
        var projeto = new Models.Projeto();
        projeto.nome = body.nome;
        projeto.descricao = body.descricao;
        projeto.dataCriacao = new Date();
        projeto.email = body.email;

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
        Models.Projeto.findById(id, function (err, docs) {
            if (err)
                res.json({ message: 'Erro :(' });
            else
                res.json(docs);
        });
    })
    .put(function (req, res) {
        var newObj = req.body;
        var id = req.params.id;
        Models.Projeto.findById(id, function (err, projeto) {
            if (err)
                res.json({ message: 'Erro :(' });
            else{
                projeto.nome = newObj.nome;
                projeto.descricao = newObj.descricao;
                projeto.save(function(err, projeto){
                    if(err)
                        res.json({message: 'Erro ao atualizar :('});
                    else
                        res.json({message: 'Projeto atualizado com sucesso !'});
                });
            }
        });
    })
    .delete(function (req, res) {
        var id = req.params.id;
        Models.Projeto.findByIdAndRemove(id, function (err, docs) {
            if (err)
                res.json({ message: 'Erro :(' })
            else
                res.json({ message: 'Item removido com sucesso !' });
        });
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
