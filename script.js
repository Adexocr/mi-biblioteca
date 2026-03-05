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