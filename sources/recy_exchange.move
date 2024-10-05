module recyexchange::recicly {
    
    
    use aptos_std::table::{Self, Table};
    use std::string::{String};
    use std::signer::address_of;
    use std::option::{Option};

    
    const YA_INICIALIZADO: u64 = 1;    
    const NO_INICIALIZADO: u64 = 2;    
    const REGISTRO_NO_EXISTE: u64 = 3;    
    const REGISTRO_YA_EXISTE: u64 = 4;   
    const NADA_A_MODIFICAR: u64 = 5;
    const MANTENIMIENTO: u64 = 6;

    struct User has store, copy, drop {        
        rol: String,
        location: vector<u64>,  
        date: String,
        state: String,        
        recycling: Recycling,        
    }

    struct Chat has store, copy, drop {
        topic: Option<String>,
        response: String,
    }

    struct Recycling has store, copy, drop {
        type: String,
        quantity: u64,
        priceKg: u64,
        chat: Chat,
    }

    struct BdRecy has key { // Dado a que utilizaremos este struct con operaciones del global_storage, necesita tener la habilidad key
        users : Table<u64, User>, 
        chats : Table<u64, Chat>,
        recyclings : Table<u64, Recycling>,        
    }

    public entry fun inicializar(cuenta: &signer) {
        assert!(!exists<BdRecy>(address_of(cuenta)), YA_INICIALIZADO); // En dado caso de que YA exista la Agenda, abortamos el proceso.
        move_to(cuenta, BdRecy {            
            users: table::new<u64, User>(), // Declaramos tipo trenes
            chats: table::new<u64, Chat>(),            
            recyclings: table::new<u64, Recycling>(),  
        })
    }

    public entry fun set_chat(        
        cuenta: &signer, 
        id: u64,
        topic: Option<String>,
        response: String
    ) acquires BdRecy {
        assert!(exists<BdRecy>(address_of(cuenta)), NO_INICIALIZADO); // Necesitamos que se haya corrido la funcion de inicializar primero.

        let registros = borrow_global_mut<BdRecy>(address_of(cuenta));
        assert!(!table::contains(&registros.chats, id), REGISTRO_YA_EXISTE);

        table::add(&mut registros.chats,
        id, 
        Chat{
            topic,
            response,
        });
    }

    public entry fun set_recycling(        
        cuenta: &signer, 
        id: u64,
        type: String,
        quantity: u64,
        priceKg: u64,
        id_chat: u64,
    ) acquires BdRecy {
        assert!(exists<BdRecy>(address_of(cuenta)), NO_INICIALIZADO); // Necesitamos que se haya corrido la funcion de inicializar primero.

        let registros = borrow_global_mut<BdRecy>(address_of(cuenta));
        assert!(!table::contains(&registros.recyclings, id), REGISTRO_YA_EXISTE);

        
        assert!(table::contains(&registros.chats, id_chat), REGISTRO_NO_EXISTE);
        let regi_chat = table::borrow(&registros.chats, id_chat);
           


        table::add(&mut registros.recyclings,
        id, 
        Recycling{
            type,
            quantity,
            priceKg,
            chat: *regi_chat,
        });
    }

    public entry fun set_user(
        
        cuenta: &signer, 
        id: u64,
        rol: String,
        location: vector<u64>,  
        date: String,
        state: String,        
        id_recycling: u64,    
    ) acquires BdRecy {
        assert!(exists<BdRecy>(address_of(cuenta)), NO_INICIALIZADO); // Necesitamos que se haya corrido la funcion de inicializar primero.

        let registros = borrow_global_mut<BdRecy>(address_of(cuenta));
        assert!(!table::contains(&registros.users, id), REGISTRO_YA_EXISTE);       
        
        assert!(table::contains(&registros.recyclings, id_recycling), REGISTRO_NO_EXISTE);
        let regi_recyclings = table::borrow(&registros.recyclings, id_recycling);
           

        table::add(
            &mut registros.users,
            id, 
            User{
                rol,
                location,  
                date,
                state,            
                recycling: *regi_recyclings, 
            }
        );
    }

    #[view]
    public fun get_user_by_id(cuenta: address, id: u64): User acquires BdRecy {
        assert!(exists<BdRecy>(cuenta), NO_INICIALIZADO);

        let registros = borrow_global<BdRecy>(cuenta);
        let resultado = table::borrow(&registros.users, id);
        *resultado
    }

    #[view]
    public fun get_chat(cuenta: address, id: u64): Chat acquires BdRecy {
        assert!(exists<BdRecy>(cuenta), NO_INICIALIZADO);

        let registros = borrow_global<BdRecy>(cuenta);
        let resultado = table::borrow(&registros.chats, id);
        *resultado
    }

    #[view]
    public fun get_recycling(cuenta: address, id: u64): Recycling acquires BdRecy {
        assert!(exists<BdRecy>(cuenta), NO_INICIALIZADO);

        let registros = borrow_global<BdRecy>(cuenta);
        let resultado = table::borrow(&registros.recyclings, id);
        *resultado
    }
}