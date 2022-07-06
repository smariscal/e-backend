class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros || [];
    this.mascotas = mascotas || [];
  }

  getFullName(){
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota){
    this.mascotas.push(mascota);
  }

  countMascotas(){
    return this.mascotas.length;
  }

  addBook(name, autor){
    this.libros.push({
      name: name,
      autor: autor
    })
  }

  getBookNames(){
    return this.libros.map((libro) => {
      return libro.name;
    });
  }
}

const run = () => {
  // Creo usuario
  const user1 = new Usuario('Pedro', 'Picapiedra');

  // Agrego los nombres de las mascotas de user1
  user1.addMascota('toby');
  user1.addMascota('soso');
  user1.addMascota('michi');

  // Agrego los los libros del user1 con su nombre y autor
  user1.addBook('sarasa', 'don sarason');
  user1.addBook('patata', 'don pataton');
  user1.addBook('un arbol', 'arboleda');

  // Salidas
  console.log(`Nombre completo: ${user1.getFullName()}`);
  console.log(`cantidad de mascotas: ${user1.countMascotas()}`);
  console.log(`Nombres de libros: ${user1.getBookNames()}`);
}

run();