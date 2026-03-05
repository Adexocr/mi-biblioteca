class Libro {
    constructor(titulo, autor, genero, anio) {
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.anio = anio;
        this.disponible = true;
    }

    info() {
        const estado = this.disponible ? "Disponible" : "Prestado";
        return `${this.titulo} de ${this.autor} (${this.anio}) - ${this.genero} - ${estado}`;
    }

}

class Biblioteca {
    constructor(nombre) {
        this.nombre = nombre;
        this.libros = [];
    }

    agregarLibro(libro) {
        const libroExistente = this.libros.find(
            (l) => l.titulo === libro.titulo
        );

        if (libroExistente) {
            console.error(`El libro "${libro.titulo}" ya existe en la biblioteca.`);
            return;
        }

        this.libros.push(libro);
        console.log(`Libro "${libro.titulo}" agregado a la biblioteca.`);
    }

    prestar(titulo) {
        const libro = this.libros.find((l) => l.titulo === titulo);

        if (!libro) {
            throw new Error(`El libro "${titulo}" no existe en la biblioteca.`);
        }

        if (!libro.disponible) {
            throw new Error(`El libro "${titulo}" ya esta prestado.`); 
        }

        libro.disponible = false;
        console.log(`Libro "${titulo}" prestado.`);
    }

    buscarPorGenero(genero) {
        return this.libros.filter(
            (libro) => libro.genero === genero
        );
    }

    estadisticas() {
        const total = this.libros.length;
        const disponibles = this.libros.filter((l) => l.disponible).length;
        const prestados = total - disponibles;

        console.log(` === Estadísticas === `);
        console.log(`Total de libros: ${total}`);
        console.log(`Libros disponibles: ${disponibles}`);
        console.log(`Libros prestados: ${prestados}`);
        }
}

// == Prueba de la biblioteca ==

const miBiblioteca = new Biblioteca("Mi Biblioteca");

console.log("Agregando libros...\n");
miBiblioteca.agregarLibro(
    new Libro("Cien años de soledad", "García Márquez", "Ficción", 1967)
    );
miBiblioteca.agregarLibro(
    new Libro("El código Da Vinci", "Dan Brown", "Thriller", 2003)
    );
miBiblioteca.agregarLibro(
    new Libro("Breve historia del tiempo", "Stephen Hawking", "Ciencia", 1988)
    );
miBiblioteca.agregarLibro(
    new Libro("Los juegos del hambre", "Suzanne Collins", "Ciencia-Ficcion", 2008)
    );
miBiblioteca.agregarLibro(
    new Libro("Un mundo feliz", "Aldous Huxley", "Novela Distopica", 1932)
    );

console.log("\n--- Intentar Duplicado ---");
miBiblioteca.agregarLibro(
    new Libro("El código Da Vinci", "Dan Brown", "Thriller", 2003)
    );
console.log("\n--- Intentar Duplicado  2 ---");
miBiblioteca.agregarLibro(
    new Libro("Los juegos del hambre", "Suzanne Collins", "Ciencia-Ficcion", 2008)
    );

console.log("\n--- Prestar libro---");
try {
    miBiblioteca.prestar("Cien años de soledad");
    console.log("Intentando prestar el mismo libro otra vez...");
    miBiblioteca.prestar("Cien años de soledad");
} catch (error) {
    console.error("Error:", error.message);
}

console.log("\n--- Buscar por genero---");
const librosDeciencia = miBiblioteca.buscarPorGenero("Ciencia");
console.log("Libros de Ciencia:");
librosDeciencia.forEach((libro) => console.log('  ° ${libro.info()}'));

const librosDeFiccion = miBiblioteca.buscarPorGenero("Ficción");
console.log("Libros de Ficción:");
librosDeFiccion.forEach((libro) => console.log('  ° ${libro.info()}'));

console.log("\n --- Estadisticas --- ");
miBiblioteca.estadisticas();
