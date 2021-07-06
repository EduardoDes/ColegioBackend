const {Schema,model} = require('mongoose');

const CursoSchema = Schema({

    nombre: {
        type : String,
        require: true
    },
    imagen : {
        type : String
    }
}, { collection: 'cursos'});

CursoSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
})

module.exports = model('Curso', CursoSchema);