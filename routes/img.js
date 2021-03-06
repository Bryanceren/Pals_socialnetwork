var express = require('express');
var router = express.Router();
var Imagen = require('../models/imagenes');
var multer = require('multer');
var path = require('path');
var crypto = require('crypto');
//funcion guardar imagen
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      cb(null, Date.now() + ext);
    }
    
  })
var upload = multer({storage:storage}).single('archivo');


router.get('/', function (req, res) {
    Imagen.find({}, function (err, img) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                err
            });
        } else {
            console.log('este es el res json¡¡¡¡',img);
            res.json(img);
        }
    });
    
});

router.post('/',upload,function(req,res){
    datos = JSON.parse(req.session.user);

    var data = new Imagen({
        post: req.body.post,
        title: req.body.title,
        path: req.file.filename.toString(),
        owner: datos.username
    });
    
    console.log(data);
    data.save(function(err){
            res.send(data);
    });
});

module.exports = router;