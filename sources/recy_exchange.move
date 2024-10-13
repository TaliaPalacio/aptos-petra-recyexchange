module recyexchange::recicly {
    
    
    use aptos_std::table::{Self, Table};   
    use std::string::{String};
    use std::signer::address_of;
    use std::option::{Option, some};
    use std::vector;



    
    const YA_INICIALIZADO: u64 = 1;    
    const NO_INICIALIZADO: u64 = 2;    
    const REGISTRO_NO_EXISTE: u64 = 3;    
    const REGISTRO_YA_EXISTE: u64 = 4;   
    const NADA_A_MODIFICAR: u64 = 5;
    const MANTENIMIENTO: u64 = 6;
    const BDNOINICIALICER: u64 = 7;


    struct Chat has store, copy, drop {
        topic: String,
        response: String,
    }

    struct Recycling has store, copy, drop {
        owner: address,
        type: String,
        ubication: String,
        weight: u64,
        pricePound: u64,
        observations: String,        
        chats: vector<Option<Chat>>, // Cambiar de chat a un vector de Option<Chat>
        available: bool,
    }

    struct BdRecy has key {       
        recyclings: Table<u64, Recycling>,    
        recyclings_ids: vector<u64>,  
        count: u64,  
        
    }


    public entry fun inicializar(count: &signer) {
        
        assert!(!exists<BdRecy>(address_of(count)), YA_INICIALIZADO);
        move_to(count, BdRecy {          
                 
            recyclings: table::new<u64, Recycling>(),  
            recyclings_ids: vector::empty<u64>(),    
            count: 0,  

        })
    }


    public entry fun set_recycling(        
        count: &signer,        
        type: String,
        ubication: String,
        weight: u64,
        pricePound: u64,
        observations: String,
        chats: vector<Option<Chat>>, // Cambiar a un vector de IDs de chats
        available: bool,
    ) acquires BdRecy {
        assert!(exists<BdRecy>(address_of(count)), NO_INICIALIZADO);

        let registros = borrow_global_mut<BdRecy>(address_of(count));
        

        let id: u64 = 1;
        registros.count = registros.count + id;
        let id_generate = registros.count;
        
        vector::push_back(&mut registros.recyclings_ids, id_generate);

        table::add(&mut registros.recyclings,
        id_generate,
        Recycling {
            owner: address_of(count),
            type,
            ubication,
            weight,
            pricePound,
            observations,            
            chats, // Asignar el vector de chats
            available,
        });       
    }

    // function to set chat in a recycling
    public entry fun set_chat(
        count: &signer,
        id: u64,
        topic: String,
        response: String,
    ) acquires BdRecy {
        assert!(exists<BdRecy>(address_of(count)), NO_INICIALIZADO);
        let registros = borrow_global_mut<BdRecy>(address_of(count));
        let recycling = table::borrow_mut(&mut registros.recyclings, id);
        let chat = Chat {
            topic,
            response,
        };
        vector::push_back(&mut recycling.chats, some(chat));
    }

    // function to get chat in a recycling by id
    public fun get_chat(
        count: &signer,
        id: u64,        
    ): vector<Option<Chat>> acquires BdRecy {
        assert!(exists<BdRecy>(address_of(count)), NO_INICIALIZADO);
        let registros = borrow_global<BdRecy>(address_of(count));
        let recycling = table::borrow(&registros.recyclings, id);
        let chats = recycling.chats;  // Eliminar la referencia '&'
        chats  // Devolver el vector directamente
    }


    
    #[view]
    public fun get_recycling_ids(cuenta: address): vector<u64> acquires BdRecy {
        assert!(exists<BdRecy>(cuenta), NO_INICIALIZADO);
        let registros = borrow_global<BdRecy>(cuenta);
        registros.recyclings_ids
    }

    #[view]
    public fun get_all_recyclings(cuenta: address): vector<Recycling> acquires BdRecy {

        assert!(exists<BdRecy>(cuenta), NO_INICIALIZADO);
        
        let registros = borrow_global<BdRecy>(cuenta);
        
        let all_recyclings = vector::empty<Recycling>();
        
        let recyclings_ids = &registros.recyclings_ids;
        
        let num_recyclings = vector::length(recyclings_ids);
        let i = 0;
        
        while (i < num_recyclings) {
            let id = vector::borrow(recyclings_ids, i);
            let recycling = table::borrow(&registros.recyclings, *id);
            
            vector::push_back(&mut all_recyclings, *recycling);
            i = i + 1;
        };
        
        all_recyclings
    }
    
    #[view]
    public fun get_recycling_count_id(count: address, id: u64): Recycling acquires BdRecy {
        assert!(exists<BdRecy>(count), NO_INICIALIZADO);

        let registros = borrow_global<BdRecy>(count);
        let resultado = table::borrow(&registros.recyclings, id);
        *resultado
    }

    #[view]
    public fun get_chat_count_id(count: address, id: u64): vector<Option<Chat>> acquires BdRecy {
        assert!(exists<BdRecy>(count), NO_INICIALIZADO);
        let registros = borrow_global<BdRecy>(count);
        let recycling = table::borrow(&registros.recyclings, id);
        recycling.chats
    }   

    #[view]
    public fun get_recycling_id(count: address, id: u64): Recycling acquires BdRecy {
        assert!(exists<BdRecy>(count), NO_INICIALIZADO);

        let registros = borrow_global<BdRecy>(count);
        let resultado = table::borrow(&registros.recyclings, id);
        *resultado
    }

    #[test(a = @0x1)]
    fun test_inicializar(a: &signer) {
        // Llamamos a la funcion inicializar
        inicializar(a);
        
        // Verificamos que el recurso BdRecy ha sido movido a la cuenta
        assert!(exists<BdRecy>(address_of(a)), BDNOINICIALICER);
    }  
}