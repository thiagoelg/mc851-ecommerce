import ProductClient from '../service/produtos_client'

const groupId = ProductClient.GROUP_ID;

const insertProducts = async product => {
    console.log("Inserting ", product.name);
    let response = await ProductClient.persistProduct(product)
    console.log("Inserted with id ", response.data);
};

export const createEletrodomesticos = async () => {

    let eletrodomesticos = {
        name: "Eletrodomésticos",
        description: "Eletrodomésticos indispensáveis para sua casa.",
        status: "ACTIVE",
        groupId: groupId
    };
    let response = await ProductClient.persistCategory(eletrodomesticos);
    eletrodomesticos.id = response.data;
    console.log(eletrodomesticos.id);

    const produtos = [
        // ELETRODOMESTICOS
        {
            name: "Geladeira em blocos electrolux",
            description: "Sua cozinha ficará muito mais bonita! Contar com o que há de melhor na cozinha é o seu desejo? Então esse é o refrigerador certo pra você. Visual bonito deixará sua cozinha ainda mais elegante.",
            price: 2455.99,
            stock: 50,
            brand: "electrolux",
            categoryId: eletrodomesticos.id,
            tags: [
                "electrolux",
                "geladeira",
                "blocos"
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/geladeira_blocos.jpg",
            weight: 44000,
            length: 6130,
            width: 5400,
            height: 16190,
            groupId: groupId
        },
        {
            name: "Geladeira Coca Cola",
            description: "Sua cozinha ficará muito mais bonita! Contar com o que há de melhor na cozinha é o seu desejo? Então esse é o refrigerador certo pra você. Visual bonito deixará sua cozinha ainda mais elegante.",
            price: 3549.99,
            stock: 50,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "geladeira",
                "coca-cola"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/geladeira_coca_cola.jpg",
            weight: 44000,
            length: 6130,
            width: 6000,
            height: 16190,
            groupId: groupId
        },
        {
            name: "Geladeira Oval Google",
            description: "Sua cozinha ficará muito mais bonita! Contar com o que há de melhor na cozinha é o seu desejo? Então esse é o refrigerador certo pra você. Visual bonito deixará sua cozinha ainda mais elegante.",
            price: 4500.47,
            stock: 50,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "geladeira",
                "google"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/geladeira_google.jpg",
            weight: 44000,
            length: 6130,
            width: 6000,
            height: 16190,
            groupId: groupId
        },
        {
            name: "Geladeira Kombi",
            description: "Sua cozinha ficará muito mais bonita! Contar com o que há de melhor na cozinha é o seu desejo? Então esse é o refrigerador certo pra você. Visual bonito deixará sua cozinha ainda mais elegante.",
            price: 5000.00,
            stock: 50,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "geladeira",
                "kombi"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/geladeira_kombi.jpg",
            weight: 44000,
            length: 6130,
            width: 6000,
            height: 16190,
            groupId: groupId
        },
        {
            name: "Geladeira com torneiras externas philco",
            description: "Sua cozinha ficará muito mais bonita! Contar com o que há de melhor na cozinha é o seu desejo? Então esse é o refrigerador certo pra você. Visual bonito deixará sua cozinha ainda mais elegante.",
            price: 3800.41,
            stock: 50,
            brand: "philco",
            categoryId: eletrodomesticos.id,
            tags: [
                "philco",
                "geladeira",
                "google"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/geladeira_torneiras.jpg",
            weight: 44000,
            length: 6130,
            width: 6000,
            height: 16190,
            groupId: groupId
        },
        {
            name: "Mini geladeira USB prateada com capacidade para 800ml",
            description: "Mini Geladeira / aquecedor de bebidas para conectar no PC, Notebook ou Laptop. Possui Dupla Função de Aquecimento e Refrigeração, com Temperatura de 8°C a 10°C e Aquecimento 60°C a 80°C.",
            price: 150.99,
            stock: 30,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "geladeira",
                "google"
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/geladeira_mini_usb_moderna.jpg",
            weight: 630,
            length: 10,
            width: 15,
            height: 30,
            groupId: groupId
        },
        {
            name: "Mini geladeira USB vermelha com capacidade para 400ml",
            description: "Mini Geladeira / aquecedor de bebidas para conectar no PC, Notebook ou Laptop. Possui Dupla Função de Aquecimento e Refrigeração, com Temperatura de 8°C a 10°C e Aquecimento 60°C a 80°C.",
            price: 95.00,
            stock: 30,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "geladeira",
                "google"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/geladeira_mini__usb_antiga.jpg",
            weight: 538,
            length: 10,
            width: 15,
            height: 20,
            groupId: groupId
        },
        {
            name: "Máquina de lavar para banheiro",
            description: "Essa lavadora tem tudo o que você precisa pra não ter mais trabalho na hora de lavar suas roupas. Com a lavagem econômica, você reaproveita a água da máquina pra outros usos na sua casa.",
            price: 1800.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "maquina de lavar",
                "lavar"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/maquina_de_lavar_banheiro.jpg",
            weight: 34000,
            length: 67,
            width: 62,
            height: 103,
            groupId: groupId
        },
        {
            name: "Máquina de lavar fliperama",
            description: "Essa lavadora tem tudo o que você precisa pra não ter mais trabalho na hora de lavar suas roupas. Com a lavagem econômica, você reaproveita a água da máquina pra outros usos na sua casa.",
            price: 3500.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "maquina de lavar",
                "lavar"
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/maquina_de_lavar_fliperama.png",
            weight: 34000,
            length: 67,
            width: 62,
            height: 103,
            groupId: groupId
        },
        {
            name: "Máquina de lavar orbital",
            description: "Essa lavadora tem tudo o que você precisa pra não ter mais trabalho na hora de lavar suas roupas. Com a lavagem econômica, você reaproveita a água da máquina pra outros usos na sua casa.",
            price: 4000.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "maquina de lavar",
                "lavar"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/maquina_de_lavar_orbital.jpg",
            weight: 20000,
            length: 50,
            width: 62,
            height: 80,
            groupId: groupId
        },
        {
            name: "Máquina de lavar orbital mini",
            description: "Essa lavadora tem tudo o que você precisa pra não ter mais trabalho na hora de lavar suas roupas. Com a lavagem econômica, você reaproveita a água da máquina pra outros usos na sua casa.",
            price: 4000.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "maquina de lavar",
                "lavar"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/maquina_de_lavar_orbital_mini.jpg",
            weight: 10000,
            length: 25,
            width: 31,
            height: 40,
            groupId: groupId
        },
        {
            name: "Microondas para levar no carro",
            description: "Esse microondas vai ajudar a fazer pratos deliciosos e comidas sempre fresquinha. E tudo com apenas um toque, com painel digital ele tem receitas pré programadas, que vão te auxiliar no dia a dia.",
            price: 450.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "microondas"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/microondas_carro.jpg",
            weight: 10000,
            length: 54,
            width: 54,
            height: 50,
            groupId: groupId
        },
        {
            name: "Microondas com bandeija de pizza embutida",
            description: "Esse microondas vai ajudar a fazer pratos deliciosos e comidas sempre fresquinha. E tudo com apenas um toque, com painel digital ele tem receitas pré programadas, que vão te auxiliar no dia a dia.",
            price: 800.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "microondas",
                "pizza"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/microondas_pizza.jpg",
            weight: 20000,
            length: 54,
            width: 74,
            height: 50,
            groupId: groupId
        },
        {
            name: "Microondas com torradeira embutida",
            description: "Esse microondas vai ajudar a fazer pratos deliciosos e comidas sempre fresquinha. E tudo com apenas um toque, com painel digital ele tem receitas pré programadas, que vão te auxiliar no dia a dia.",
            price: 700.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "microondas",
                "torradeira",
                "torrada"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/microondas_torradeira.jpeg",
            weight: 20000,
            length: 54,
            width: 74,
            height: 50,
            groupId: groupId
        },
        {
            name: "Microondas USB Heinz",
            description: "Esse microondas vai ajudar a fazer pratos deliciosos e comidas sempre fresquinha. E tudo com apenas um toque, com painel digital ele tem receitas pré programadas, que vão te auxiliar no dia a dia.",
            price: 300.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "microondas",
                "usb",
                "heinz"
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/microondas_usb.jpg",
            weight: 3000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
        {
            name: "Ventilador de Alce",
            description: "Design exclusivo e tecnologia patenteada tornam esse ventilador o modelo mais forte e silencioso do mercado brasileiro. O único com Power Zone, uma área concentrada de vento máximo!",
            price: 87.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "ventilador",
                "animal",
                "alce"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/ventilador_alce.jpeg",
            weight: 1000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
        {
            name: "Ventilador de Cachorro",
            description: "Design exclusivo e tecnologia patenteada tornam esse ventilador o modelo mais forte e silencioso do mercado brasileiro. O único com Power Zone, uma área concentrada de vento máximo!",
            price: 85.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "ventilador",
                "animal",
                "cachorro"
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/ventilador_cachorro.jpg",
            weight: 1000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
        {
            name: "Ventilador de Caranguejo",
            description: "Design exclusivo e tecnologia patenteada tornam esse ventilador o modelo mais forte e silencioso do mercado brasileiro. O único com Power Zone, uma área concentrada de vento máximo!",
            price: 79.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "ventilador",
                "animal",
                "caranguejo"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/ventilador_caranguejo.jpg",
            weight: 1000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
        {
            name: "Ventilador de Cavalo",
            description: "Design exclusivo e tecnologia patenteada tornam esse ventilador o modelo mais forte e silencioso do mercado brasileiro. O único com Power Zone, uma área concentrada de vento máximo!",
            price: 85.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "ventilador",
                "animal",
                "cavalo"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/ventilador_cavalo.jpg",
            weight: 1000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
        {
            name: "Ventilador de Guaxinim",
            description: "Design exclusivo e tecnologia patenteada tornam esse ventilador o modelo mais forte e silencioso do mercado brasileiro. O único com Power Zone, uma área concentrada de vento máximo!",
            price: 95.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "ventilador",
                "animal",
                "guaxinim"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/ventilador_guaxinim.jpg",
            weight: 1000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
        {
            name: "Ventilador de Passaro",
            description: "Design exclusivo e tecnologia patenteada tornam esse ventilador o modelo mais forte e silencioso do mercado brasileiro. O único com Power Zone, uma área concentrada de vento máximo!",
            price: 95.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "ventilador",
                "animal",
                "passaro"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/ventilador_passaro.jpg",
            weight: 1000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
        {
            name: "Ventilador de Pavão",
            description: "Design exclusivo e tecnologia patenteada tornam esse ventilador o modelo mais forte e silencioso do mercado brasileiro. O único com Power Zone, uma área concentrada de vento máximo!",
            price: 95.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "ventilador",
                "animal",
                "pavao"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/ventilador_pavao.jpg",
            weight: 1000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
        {
            name: "Ventilador de Peixe",
            description: "Design exclusivo e tecnologia patenteada tornam esse ventilador o modelo mais forte e silencioso do mercado brasileiro. O único com Power Zone, uma área concentrada de vento máximo!",
            price: 95.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "ventilador",
                "animal",
                "peixe"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/ventilador_peixe.jpg",
            weight: 1000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
        {
            name: "Ventilador de Tigre",
            description: "Design exclusivo e tecnologia patenteada tornam esse ventilador o modelo mais forte e silencioso do mercado brasileiro. O único com Power Zone, uma área concentrada de vento máximo!",
            price: 95.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "ventilador",
                "animal",
                "tigre"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/ventilador_tigre.jpg",
            weight: 1000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
        {
            name: "Ventilador de Urso",
            description: "Design exclusivo e tecnologia patenteada tornam esse ventilador o modelo mais forte e silencioso do mercado brasileiro. O único com Power Zone, uma área concentrada de vento máximo!",
            price: 95.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "ventilador",
                "animal",
                "urso"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/ventilador_urso.jpg",
            weight: 1000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
        {
            name: "Ventilador de Urso",
            description: "Design exclusivo e tecnologia patenteada tornam esse ventilador o modelo mais forte e silencioso do mercado brasileiro. O único com Power Zone, uma área concentrada de vento máximo!",
            price: 95.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "ventilador",
                "animal",
                "urso"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/ventilador_urso.jpg",
            weight: 1000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
        {
            name: "Ventilador de Veado",
            description: "Design exclusivo e tecnologia patenteada tornam esse ventilador o modelo mais forte e silencioso do mercado brasileiro. O único com Power Zone, uma área concentrada de vento máximo!",
            price: 95.00,
            stock: 100,
            brand: "geladeireira",
            categoryId: eletrodomesticos.id,
            tags: [
                "geladeireira",
                "ventilador",
                "animal",
                "veado"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletrodomesticos/ventilador_veado.jpg",
            weight: 1000,
            length: 30,
            width: 30,
            height: 50,
            groupId: groupId
        },
    ];
    produtos.map(insertProducts);

};

export const createMobilia = async () => {

    let mobilia = {
        name: "Mobília",
        description: "Mobília indispensável para sua casa.",
        status: "ACTIVE",
        groupId: groupId
    };
    let response = await ProductClient.persistCategory(mobilia);
    mobilia.id = await response.data;
    console.log(mobilia.id);

    const produtos = [
        // MOBILIA
        {
            name: "Sofá com estampa abstrata",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 599.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_abstrato.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },
        {
            name: "Sofá Cacto",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 499.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_cactos.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },
        {
            name: "Sofá Carro Rosa",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 699.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_carro_rosa.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },
        {
            name: "Sofá Carro Vermelho",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 699.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_carro_vermelho.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },
        {
            name: "Sofá Coliseum de Roma",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 799.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_coliseum.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },
        {
            name: "Sofá Hipopótamo",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 899.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá",
                "animal",
                "hipopotamo"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_hipopotamo.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },
        {
            name: "Sofá Leão Marinho",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 899.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá",
                "animal",
                "leao",
                "marinho"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_leao_marinho.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },
        {
            name: "Sofá com Estampa do Nicolas Kage",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 599.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá",
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_nicolas_kage.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },
        {
            name: "Sofá Peixe",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 399.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá",
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_peixe.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },
        {
            name: "Sofá de Garrafa Pete Curvo",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 499.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá",
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_pet.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },
        {
            name: "Sofá Polvo",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 799.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá",
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_polvo.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },
        {
            name: "Sofá Tapete",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 599.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá",
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_tapete.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },
        {
            name: "Sofá Vacas",
            description: "O estofado possui os assentos retráteis (que se estendem) e o encosto reclinável. Conta com assento em espuma ortopédica D45 e encosto misto Flocos de Espuma, além de braços em espuma D-23.",
            price: 599.90,
            stock: 100,
            brand: "mobiliazeira",
            categoryId: mobilia.id,
            tags: [
                "sofá",
                "animal",
                "vaca"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/mobilia/sofa_vacas.jpg",
            weight: 60000,
            length: 155,
            width: 190,
            height: 96,
            groupId: groupId
        },

    ];
    produtos.map(insertProducts);

};

export const createEletronicos = async () => {

    let eletronicos = {
        name: "Eletrônicos",
        description: "Eletrônicos para facilitar seu dia-a-dia.",
        status: "ACTIVE",
        groupId: groupId
    };
    let response = await ProductClient.persistCategory(eletronicos);
    eletronicos.id = response.data;
    console.log(eletronicos.id);

    const produtos = [
        //ELETRONICOS
        {
            name: "Notebook Dell Dual Screen",
            description: "Fique o tempo todo conectado com esse notebook. Perfeito para usuários que passam o dia em movimento, o Stilo Colors oferece conectividade e desempenho aonde estiver.",
            price: 4800.00,
            stock: 100,
            brand: "dell",
            categoryId: eletronicos.id,
            tags: [
                "dell",
                "notebook",
                "dual"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletronicos/notebook_dual_screen.jpg",
            weight: 1540,
            length: 24,
            width: 34,
            height: 2,
            groupId: groupId
        },
        {
            name: "Notebook Dell com Botão para Emergências",
            description: "Fique o tempo todo conectado com esse notebook. Perfeito para usuários que passam o dia em movimento, o Stilo Colors oferece conectividade e desempenho aonde estiver.",
            price: 4500.00,
            stock: 100,
            brand: "dell",
            categoryId: eletronicos.id,
            tags: [
                "dell",
                "notebook",
                "emergencia"
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/eletronicos/notebook_emergencia.jpg",
            weight: 1540,
            length: 24,
            width: 34,
            height: 2,
            groupId: groupId
        },
        {
            name: "Notebook Dell que Enrola",
            description: "Fique o tempo todo conectado com esse notebook. Perfeito para usuários que passam o dia em movimento, o Stilo Colors oferece conectividade e desempenho aonde estiver.",
            price: 5000.00,
            stock: 100,
            brand: "dell",
            categoryId: eletronicos.id,
            tags: [
                "dell",
                "notebook",
                "enrola"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletronicos/notebook_enrola.jpg",
            weight: 1540,
            length: 24,
            width: 34,
            height: 2,
            groupId: groupId
        },
        {
            name: "Notebook Dell Ergonômico Dual Screen",
            description: "Fique o tempo todo conectado com esse notebook. Perfeito para usuários que passam o dia em movimento, o Stilo Colors oferece conectividade e desempenho aonde estiver.",
            price: 4750.00,
            stock: 100,
            brand: "dell",
            categoryId: eletronicos.id,
            tags: [
                "dell",
                "notebook",
                "ergonomico",
                "dual"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletronicos/notebook_ergonomico_dual_screen.jpg",
            weight: 1540,
            length: 24,
            width: 34,
            height: 2,
            groupId: groupId
        },
        {
            name: "Notebook Dell com Máquina de Escrever",
            description: "Fique o tempo todo conectado com esse notebook. Perfeito para usuários que passam o dia em movimento, o Stilo Colors oferece conectividade e desempenho aonde estiver.",
            price: 3750.00,
            stock: 100,
            brand: "dell",
            categoryId: eletronicos.id,
            tags: [
                "dell",
                "notebook",
                "escrever"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/eletronicos/notebook_ergonomico_maquina_de_escrever.jpg",
            weight: 1540,
            length: 24,
            width: 34,
            height: 2,
            groupId: groupId
        },
    ];
    produtos.map(insertProducts);
};

export const createJardim = async () => {

    let jardim = {
        name: "Jardim",
        description: "Acessórios magníficos para seu jardim.",
        status: "ACTIVE",
        groupId: groupId
    };
    let response = await ProductClient.persistCategory(jardim);
    jardim.id = response.data;
    console.log(jardim.id);

    const produtos = [
        //JARDIM
        {
            name: "Cadeira de Jardim Cubo",
            description: "Essa cadeira é bonita, confortável e anatômica. Você vai se surpreender com ela quando for curtir todos os prazeres do sol. Seu design é feito para não pressionar as costas nem as articulações.",
            price: 50.00,
            stock: 100,
            brand: "jardineira fiel",
            categoryId: jardim.id,
            tags: [
                "cadeira",
                "jardim",
                "cubo"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/jardim/cadeira_bloco.jpg",
            weight: 2000,
            length: 53,
            width: 53,
            height: 73,
            groupId: groupId
        },
        {
            name: "Cadeira de Jardim Caveira",
            description: "Essa cadeira é bonita, confortável e anatômica. Você vai se surpreender com ela quando for curtir todos os prazeres do sol. Seu design é feito para não pressionar as costas nem as articulações.",
            price: 70.00,
            stock: 100,
            brand: "jardineira fiel",
            categoryId: jardim.id,
            tags: [
                "cadeira",
                "jardim",
                "caveira"
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/jardim/cadeira_caveira.jpeg",
            weight: 2000,
            length: 53,
            width: 53,
            height: 73,
            groupId: groupId
        },
        {
            name: "Cadeira de Jardim Caveira Feminina",
            description: "Essa cadeira é bonita, confortável e anatômica. Você vai se surpreender com ela quando for curtir todos os prazeres do sol. Seu design é feito para não pressionar as costas nem as articulações.",
            price: 70.00,
            stock: 100,
            brand: "jardineira fiel",
            categoryId: jardim.id,
            tags: [
                "cadeira",
                "jardim",
                "caveira",
                "feminina"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/jardim/cadeira_caveira_feminina.jpg",
            weight: 2000,
            length: 53,
            width: 53,
            height: 73,
            groupId: groupId
        },
        {
            name: "Cadeira de Jardim de Tronco de Árvore",
            description: "Essa cadeira é bonita, confortável e anatômica. Você vai se surpreender com ela quando for curtir todos os prazeres do sol. Seu design é feito para não pressionar as costas nem as articulações.",
            price: 70.00,
            stock: 100,
            brand: "jardineira fiel",
            categoryId: jardim.id,
            tags: [
                "cadeira",
                "jardim",
                "tronco",
                "arvore"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/jardim/cadeira_madeira.jpg",
            weight: 2000,
            length: 53,
            width: 53,
            height: 73,
            groupId: groupId
        },
        {
            name: "Cadeira de Jardim Punisher",
            description: "Essa cadeira é bonita, confortável e anatômica. Você vai se surpreender com ela quando for curtir todos os prazeres do sol. Seu design é feito para não pressionar as costas nem as articulações.",
            price: 80.00,
            stock: 100,
            brand: "jardineira fiel",
            categoryId: jardim.id,
            tags: [
                "cadeira",
                "jardim",
                "caveira",
                "punisher"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/jardim/cadeira_punisher.jpg",
            weight: 2000,
            length: 53,
            width: 53,
            height: 73,
            groupId: groupId
        },
        {
            name: "Cadeira de Jardim Verde",
            description: "Essa cadeira é bonita, confortável e anatômica. Você vai se surpreender com ela quando for curtir todos os prazeres do sol. Seu design é feito para não pressionar as costas nem as articulações.",
            price: 75.00,
            stock: 100,
            brand: "jardineira fiel",
            categoryId: jardim.id,
            tags: [
                "cadeira",
                "jardim"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/jardim/cadeira_verde.jpg",
            weight: 2000,
            length: 53,
            width: 53,
            height: 73,
            groupId: groupId
        },
        {
            name: "Sofá de Jardim 3 Lugares Cinza",
            description: "Esse sofá de jardim é bastante versátil e elegante, o produto proporciona conforto de sobra. Possui braços reclináveis, permitindo que ele seja ajustado em três diferentes posições.",
            price: 999.90,
            stock: 100,
            brand: "jardineira fiel",
            categoryId: jardim.id,
            tags: [
                "sofa",
                "jardim"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/jardim/sofa_cinza.jpg",
            weight: 30000,
            length: 83,
            width: 190,
            height: 80,
            groupId: groupId
        },
        {
            name: "Sofá de Jardim de Madeira",
            description: "Esse sofá de jardim é bastante versátil e elegante, o produto proporciona conforto de sobra. Possui braços reclináveis, permitindo que ele seja ajustado em três diferentes posições.",
            price: 1499.90,
            stock: 100,
            brand: "jardineira fiel",
            categoryId: jardim.id,
            tags: [
                "sofa",
                "jardim"
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/jardim/sofa_madeira.jpg",
            weight: 30000,
            length: 83,
            width: 190,
            height: 80,
            groupId: groupId
        },
    ];
    produtos.map(insertProducts);
};

export const createLivros = async () => {

    let livros = {
        name: "Livros",
        description: "Livros ideais para os amantes da literatura.",
        status: "ACTIVE",
        groupId: groupId
    };
    let response = await ProductClient.persistCategory(livros);
    livros.id = response.data;
    console.log(livros.id);

    const produtos = [
        // LIVROS
        {
            name: "A Sutil Arte de Ligar o Foda-Se",
            description: "Chega de tentar buscar um sucesso que só existe na sua cabeça. Chega de se torturar para pensar positivo enquanto sua vida vai ladeira abaixo.",
            price: 23.90,
            stock: 100,
            brand: "intrinseca",
            categoryId: livros.id,
            tags: [
                "livro",
                "arte"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/livros/arte_fodase.jpeg",
            weight: 200,
            length: 2,
            width: 10,
            height: 20,
            groupId: groupId
        },
        {
            name: "Culpando o Usuário",
            description: "Está na hora de começar a tirar a culpa de cima de você e jogá-la no usuário! Usuários não sabem o que fazem, certamente qualquer problema no sistema é culpa deles.",
            price: 20.90,
            stock: 100,
            brand: "intrinseca",
            categoryId: livros.id,
            tags: [
                "livro",
                "software",
                "produto"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/livros/blaming_the_user.jpeg",
            weight: 200,
            length: 2,
            width: 10,
            height: 20,
            groupId: groupId
        },
        {
            name: "Como se tornar um esquizofrênico",
            description: "Este trabalho bem pesquisado, mas legível, ultiliza as idéias de Harry Stack Sullivan, Theodore Lidz, Gregory Bateson e outras teorias que explicam como e por que as pessoas se tornam esquizofrênicas.",
            price: 44.90,
            stock: 100,
            brand: "intrinseca",
            categoryId: livros.id,
            tags: [
                "livro",
                "psicologia"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/livros/esquizofrenico.jpg",
            weight: 200,
            length: 2,
            width: 10,
            height: 20,
            groupId: groupId
        },
        {
            name: "E se?",
            description: "Um guia dos curiosos para os tempos de internet, feito por uma das maiores personalidades da era digital Garoto prodígio da NASA, Randall Munroe tornou-se conhecido com a série em quadrinhos XKCD.",
            price: 39.50,
            stock: 100,
            brand: "intrinseca",
            categoryId: livros.id,
            tags: [
                "livro",
                "ciencia"
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/livros/ese.jpeg",
            weight: 200,
            length: 2,
            width: 10,
            height: 20,
            groupId: groupId
        },
        {
            name: "O Guia do Mochileiro das Galáxias Vol. 1",
            description: "Considerado um dos maiores clássicos da literatura de ficção científica, O guia do mochileiro das galáxias vem encantando gerações de leitores ao redor do mundo com seu humor afiado.",
            price: 17.90,
            stock: 100,
            brand: "intrinseca",
            categoryId: livros.id,
            tags: [
                "livro",
                "mochileiro",
                "douglas",
                "adams"
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/livros/guia_do_mochileiro_1.jpg",
            weight: 200,
            length: 2,
            width: 10,
            height: 20,
            groupId: groupId
        },
        {
            name: "O Guia do Mochileiro das Galáxias Vol. 2: O Restaurante no Fim do Universo",
            description: "O que você pretende fazer quando chegar ao Restaurante do Fim do Universo? Devorar o suculento bife de um boi que se oferece como jantar ou apenas se embriagar com a poderosa Dinamite Pangaláctica?",
            price: 17.90,
            stock: 100,
            brand: "intrinseca",
            categoryId: livros.id,
            tags: [
                "livro",
                "mochileiro",
                "douglas",
                "adams"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/livros/guia_do_mochileiro_2.jpg",
            weight: 200,
            length: 2,
            width: 10,
            height: 20,
            groupId: groupId
        },
        {
            name: "O Guia do Mochileiro das Galáxias Vol. 3: A vida o universo e tudo mais",
            description: "Após as loucas aventuras vividas com seus estranhos amigos em O guia do mochileiro das galáxias e O restaurante no fim do universo, Arthur Dent ficou cinco anos abandonado na Terra pré-histórica.",
            price: 17.90,
            stock: 100,
            brand: "intrinseca",
            categoryId: livros.id,
            tags: [
                "livro",
                "mochileiro",
                "douglas",
                "adams"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/livros/guia_do_mochileiro_3.jpg",
            weight: 200,
            length: 2,
            width: 10,
            height: 20,
            groupId: groupId
        },
        {
            name: "O Guia do Mochileiro das Galáxias Vol. 4: Até mais e obrigado pelos peixes",
            description: "Depois de viajar pelo Universo, ver o aniquilamento da Terra, participar de guerras interestelares e conhecer as mais extraordinárias criaturas, Arthur está de volta ao seu planeta.",
            price: 17.90,
            stock: 100,
            brand: "intrinseca",
            categoryId: livros.id,
            tags: [
                "livro",
                "mochileiro",
                "douglas",
                "adams"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/livros/guia_do_mochileiro_4.jpg",
            weight: 200,
            length: 2,
            width: 10,
            height: 20,
            groupId: groupId
        },
        {
            name: "O Guia do Mochileiro das Galáxias Vol. 5: Praticamente inofensiva",
            description: "As inúmeras mudanças políticas, culturais e, principalmente, tecnológicas que aconteceram nesse período influenciaram os rumos da narrativa e tornaram Praticamente inofensiva uma obra singular.",
            price: 18.90,
            stock: 100,
            brand: "intrinseca",
            categoryId: livros.id,
            tags: [
                "livro",
                "mochileiro",
                "douglas",
                "adams"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/livros/guia_do_mochileiro_5.jpg",
            weight: 200,
            length: 2,
            width: 10,
            height: 20,
            groupId: groupId
        },
        {
            name: "O Guia do Mochileiro das Galáxias Vol. 6: E tem outra coisa",
            description: "Fãs de todo o mundo estavam órfãos de novas aventuras dos personagens mais loucos da ficção científica desde que o último livro da série O Mochileiro das Galáxias foi escrito, em 1992.",
            price: 18.90,
            stock: 100,
            brand: "intrinseca",
            categoryId: livros.id,
            tags: [
                "livro",
                "mochileiro"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/livros/guia_do_mochileiro_6.jpg",
            weight: 200,
            length: 2,
            width: 10,
            height: 20,
            groupId: groupId
        },
        {
            name: "Ignorando Avisos de Descontinuação",
            description: "Dar atençap a avisos de descontinuação pra quê? Só da trabalho.",
            price: 18.90,
            stock: 100,
            brand: "intrinseca",
            categoryId: livros.id,
            tags: [
                "livro",
                "software"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/livros/ignoring_deprecation_warnings.jpg",
            weight: 200,
            length: 2,
            width: 10,
            height: 20,
            groupId: groupId
        },
    ];
    produtos.map(insertProducts);
};

export const createIluminacao = async () => {
    let iluminacao = {
        name: "Iluminação",
        description: "Abajures e lâmpadas com iluminação perfeita para sua casa.",
        status: "ACTIVE",
        groupId: groupId
    };
    let response = await ProductClient.persistCategory(iluminacao);
    iluminacao.id = response.data;
    console.log("Created category with id: ", iluminacao.id);

    const produtos = [
        // ILUMINACAO
        {
            name: "Abajur com base de lhama",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 108.35,
            stock: 100,
            brand: "skylux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "lhama"
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_lhama.jpg",
            weight: 1100,
            length: 8,
            width: 18,
            height: 33,
            groupId: groupId
        },
        {
            name: "Abajur com base de baleia",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 104.61,
            stock: 100,
            brand: "skylux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "baleia"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_baleia.jpg",
            weight: 1100,
            length: 9,
            width: 23,
            height: 30,
            groupId: groupId
        },
        {
            name: "Abajur com base de basset",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 100.88,
            stock: 100,
            brand: "skylux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "cachorro",
                "basset",
                "dachshund"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_cachorro_basset.jpg",
            weight: 1100,
            length: 9,
            width: 17,
            height: 29,
            groupId: groupId
        },
        {
            name: "Abajur com base de bulldog",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 50.38,
            stock: 100,
            brand: "skylux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "cachorro",
                "bulldog"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_cachorro_bulldog.jpg",
            weight: 680,
            length: 9,
            width: 17,
            height: 32,
            groupId: groupId
        },
        {
            name: "Abajur com base de cavalo",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 100.88,
            stock: 100,
            brand: "skylux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "cavalo"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_cavalo.jpg",
            weight: 1500,
            length: 35,
            width: 30,
            height: 35,
            groupId: groupId
        },
        {
            name: "Abajur com base de coelho",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 50.99,
            stock: 100,
            brand: "skylux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "coelho"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_coelho.jpg",
            weight: 500,
            length: 10,
            width: 20,
            height: 30,
            groupId: groupId
        },
        {
            name: "Abajur com base de elefante de circo",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 50.99,
            stock: 100,
            brand: "skylux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "circo",
                "elefante"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_elefante_circo.jpg",
            weight: 1200,
            length: 12,
            width: 25,
            height: 40,
            groupId: groupId
        },
        {
            name: "Abajur com base de elefante indiano",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 104.61,
            stock: 100,
            brand: "skylux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "elefante",
                "indiano"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_elefante_indiano.jpg",
            weight: 1000,
            length: 11,
            width: 19,
            height: 34,
            groupId: groupId
        },
        {
            name: "Abajur com base de esquilo",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 150.70,
            stock: 100,
            brand: "skylux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "esquilo"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_esquilo.jpg",
            weight: 1500,
            length: 25,
            width: 25,
            height: 33,
            groupId: groupId
        },
        {
            name: "Abajur com base de gatos",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 95.52,
            stock: 100,
            brand: "lux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "gato"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_gatos.jpg",
            weight: 1350,
            length: 25,
            width: 20,
            height: 33,
            groupId: groupId
        },
        {
            name: "Abajur com base de girafa",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 80.00,
            stock: 100,
            brand: "lux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "girafa"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_gatos.jpg",
            weight: 1350,
            length: 25,
            width: 20,
            height: 33,
            groupId: groupId
        },
        {
            name: "Abajur com base de passaro",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 186.84,
            stock: 100,
            brand: "skylux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "passaro"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_passaro.jpg",
            weight: 1350,
            length: 25,
            width: 20,
            height: 52,
            groupId: groupId
        },
        {
            name: "Abajur com base de rinoceronte",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 186.84,
            stock: 100,
            brand: "skylux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "rinoceronte"
            ],
            highlight: false,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_rinoceronte.jpg",
            weight: 1350,
            length: 10,
            width: 20,
            height: 32,
            groupId: groupId
        },
        {
            name: "Abajur de abdução de vaca",
            description: "Tenha uma iluminação que valorize a decoração do seu lar! Conte com esse abajur para criar um ambiente ainda mais moderno e elegante. Confeccionado com materiais de ótima qualidade.",
            price: 186.84,
            stock: 100,
            brand: "lux",
            categoryId: iluminacao.id,
            tags: [
                "abajur",
                "animais",
                "vaca",
                "abdução",
                "alienígena"
            ],
            highlight: true,
            imageUrl: "http://front.localhost/imgs/iluminacao/abajur_vaca.jpg",
            weight: 1050,
            length: 15,
            width: 15,
            height: 35,
            groupId: groupId
        },
    ];
    produtos.map(insertProducts);

};

export default {
    createEletrodomesticos,
    createMobilia,
    createEletronicos,
    createJardim,
    createLivros,
    createIluminacao
}

