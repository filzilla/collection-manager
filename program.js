const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Music = require('./models/music.js');
const bodyParser = require('body-parser');


const application = express();
mongoose.connect('mongodb://localhost:27017/musicdb');

application.engine('mustache', mustacheExpress());
application.set('view engine', 'mustache');
application.set('views', './views');

application.use(bodyParser.urlencoded());
application.use(bodyParser.json());
application.use(express.static('public'));

application.get('/',  async (request, response) => {
    
    var music = await Music.find();
    var model = {music: music};
    console.log('success');

    response.render('music', model);
});

application.post('/', function(request,response){
  var newArtist = request.body.artist;
  var newAlbum = request.body.album;
  var grammy = request.body.grammy;
console.log(newArtist);
console.log(newAlbum);

var newMusic = new Music({
        artistName: newArtist,
        album: newAlbum,
        grammyWinner: false,
})
console.log(newMusic);
  newMusic.save(function (err) {if (err) console.log ('Error on save!')});
//Music.create(newMusic);
  response.redirect('/' );
});

application.get('/collection', function(request, response){

  response.render('collection');
})










application.listen(5000, function () {
  console.log('Successfully started express application!');
});