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

module.exports = seedDatabase()