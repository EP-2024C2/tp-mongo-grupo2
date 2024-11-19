async function seedDatabase() {
    try {
        await Producto.deleteMany({});
        await Fabricante.deleteMany({});
        await Componente.deleteMany({});

        const fabricantes = await Fabricante.insertMany([
            { nombre: "TechCorp", direccion: "1234 Elm St, Ciudad", numeroContacto: "+123456789", pathImgPerfil: "/images/fabricantes/techcorp.jpg", productos: [] },
            { nombre: "Innovatech", direccion: "4567 Oak Ave, Ciudad", numeroContacto: "+987654321", pathImgPerfil: "/images/fabricantes/innovatech.jpg", productos: [] }
        ]);

        const componentes = await Componente.insertMany([
            { nombre: "Procesador Intel i7", descripcion: "Procesador de octava generación", productos: [] },
            { nombre: "SSD 1TB", descripcion: "Disco sólido de 1TB de capacidad", productos: [] },
            { nombre: "Pantalla OLED 6.5 pulgadas", descripcion: "Pantalla de alta definición", productos: [] },
            { nombre: "Batería 4000mAh", descripcion: "Batería de larga duración", productos: [] }
        ]);

        const productos = await Producto.insertMany([
            { nombre: "Laptop X200", descripcion: "Una laptop de alto rendimiento", precio: 1200.99, pathImg: "/images/productos/laptop-x200.jpg", fabricantes: [fabricantes[0]._id, fabricantes[1]._id], componentes: [componentes[0]._id, componentes[1]._id] },
            { nombre: "Smartphone S5", descripcion: "Teléfono inteligente con pantalla OLED", precio: 799.99, pathImg: "/images/productos/smartphone-s5.jpg", fabricantes: [], componentes: [componentes[2]._id, componentes[3]._id] }
        ]);

        // Actualiza los fabricantes con los productos correspondientes
        fabricantes[0].productos.push(productos[0]._id, productos[1]._id);
        fabricantes[1].productos.push(productos[0]._id);
        await fabricantes[0].save();
        await fabricantes[1].save();

        // Actualiza los componentes con los productos correspondientes
        componentes[0].productos.push(productos[0]._id);
        componentes[1].productos.push(productos[0]._id);
        componentes[2].productos.push(productos[1]._id);
        componentes[3].productos.push(productos[1]._id);
        await componentes[0].save();
        await componentes[1].save();
        await componentes[2].save();
        await componentes[3].save();

        console.log("Base de datos poblada con éxito");

    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    }
}

module.exports = seedDatabase;
