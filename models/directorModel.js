const {Schema , model} = require('mongoose');

const DirectorSchema = Schema({

    nombre: {
        type : String,
        require : true
    },
    email : {
        type: String,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    imagen : {
        type : String
    }
},{ collection: 'directores'})

DirectorSchema.method('toJSON', function() {
    const {__v, _id,password, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Director', DirectorSchema);