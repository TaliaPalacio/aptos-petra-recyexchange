module recyexchange::recicly {
    
    use std::debug::print;
    use aptos_std::table::{Self, Table};
    use std::string::{String, utf8};
    use std::signer::address_of;
    use std::option::{Self, Option, some, none};

    
    const YA_INICIALIZADO: u64 = 1;    
    const NO_INICIALIZADO: u64 = 2;    
    const REGISTRO_NO_EXISTE: u64 = 3;    
    const REGISTRO_YA_EXISTE: u64 = 4;   
    const NADA_A_MODIFICAR: u64 = 5;
    const MANTENIMIENTO: u64 = 6;

    struct Driver has store, copy, drop {        
        name: String,
        lastName: String,        
    }
    use std::debug::print;

    fun practica() {
        // Tipo no referenciado:
        let a = 1;
        print(&a); // Para imprimir un tipo no referenciado necesitamos agregar la referencia al valor.

        // Tipo referenciado:
        let b = 7;
        let c : &u64 = &b;
        print(c); // Dado a que c ya fue declarado como tipo referenciado, no es necesario especificar la referencia.
    
        // Inmutable
        let original: u64 = 1;
        let copia_de_original = original; // Nota que no estamos pasando la referencia aqui.
        print(&copia_de_original); // Pero aqui si.

        let otra_copia = &original;
        print(otra_copia);

        // Mutable
        let copia_mutable = &mut original; 
        print(copia_mutable); // De nuevo, no es necesario pasar la referencia.

        *copia_mutable = 20;
        print(copia_mutable);
        print(&original); // Porque ahora el original es 20 si lo que modificamos fue la copia mutable? 
    }

    #[test]
    fun prueba() {
        practica();
    }
}