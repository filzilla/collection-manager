const mongoose = require ('mongoose');

const musicCollectionSchema = new mongoose.Schema({

    artistName: { type: String, required: true},
    album: [{ 
            type: String , required: true,
            
             tracks:[{
                    type: String,
                    title: { type: String}
            }],
            releaseYear: [{type: String 
            }],
        }],
 
    grammyWinner: { type: Boolean},
    
});

const Music = mongoose.model('Music', musicCollectionSchema);

module.exports = Music;