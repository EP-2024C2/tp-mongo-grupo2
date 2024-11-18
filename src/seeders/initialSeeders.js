const Producto = require('../models/producto')
const Fabricante = require('../models/fabricante')
const Componente = require('../models/componente')

async function seedDatabase() {
    try {
        await Producto.deleteMany({})
        await Fabricante.deleteMany({})
        await Componente.deleteMany({})

        const productos = await Producto.insertMany([
            { nombre: "Laptop X200", descripcion: "Una laptop de alto rendimiento", precio: 1200.99, pathImg: "/images/productos/laptop-x200.jpg", fabricantes: [fabricantes[0]._id, fabricantes[1]._id], componentes: [componentes[0]._id, componentes[1]._id] },
            { nombre: "Smartphone S5", descripcion: "Teléfono inteligente con pantalla OLED", precio: 799.99, pathImg: "/images/productos/smartphone-s5.jpg", fabricantes: [], componentes: [componentes[2]._id, componentes[3]._id] }
        ])

        const fabricantes = await Fabricante.insertMany([
            { nombre: "TechCorp", direccion: "1234 Elm St, Ciudad", numeroContacto: "+123456789", pathImgPerfil: "/images/fabricantes/techcorp.jpg", productos: [productos[0]._id, productos[1]._id] },
            { nombre: "Innovatech", direccion: "4567 Oak Ave, Ciudad", numeroContacto: "+987654321", pathImgPerfil: "/images/fabricantes/innovatech.jpg", productos: [] }
        ])

        const componentes = await Componente.insertMany([
            { nombre: "Procesador Intel i7", descripcion: "Procesador de octava generación", productos: [productos[0]._id] },
            { nombre: "SSD 1TB", descripcion: "Disco sólido de 1TB de capacidad", productos: [productos[0]._id] },
            { nombre: "Pantalla OLED 6.5 pulgadas", descripcion: "Pantalla de alta definición", productos: [productos[1]._id] },
            { nombre: "Batería 4000mAh", descripcion: "Batería de larga duración", productos: [productos[1]._id] }
        ])

        console.log("Base de datos poblada")

    } catch (error) {
        console.error('Error al poblar la base de datos:', error)
    }
}

module.exports = seedDatabase

/**
 *      const autores = await Autor.insertMany([
            { nombre: 'Gabriel García Márquez', nacionalidad: 'Colombiana', fechaNacimiento: new Date('1927-03-06') },
            { nombre: 'Isabel Allende', nacionalidad: 'Chilena', fechaNacimiento: new Date('1942-08-02') },
            { nombre: 'J.K. Rowling', nacionalidad: 'Británica', fechaNacimiento: new Date('1965-07-31') }
        ])

        // Insertamos libros referenciando a los autores
        await Libro.insertMany([
            { titulo: 'Cien años de soledad', genero: 'Realismo mágico', fechaPublicacion: new Date('1967-05-30'), autor: autores[0]._id },
            { titulo: 'El otoño del patriarca', genero: 'Realismo mágico', fechaPublicacion: new Date('1975-01-01'), autor: autores[0]._id },
            { titulo: 'La casa de los espíritus', genero: 'Realismo mágico', fechaPublicacion: new Date('1982-01-01'), autor: autores[1]._id },
            { titulo: 'Harry Potter y la piedra filosofal', genero: 'Fantasía', fechaPublicacion: new Date('1997-06-26'), autor: autores[2]._id },
            { titulo: 'Harry Potter y la cámara secreta', genero: 'Fantasía', fechaPublicacion: new Date('1998-07-02'), autor: autores[2]._id }
        ])

        console.log("Base de datos poblada con autores y libros.")
 * 
 */