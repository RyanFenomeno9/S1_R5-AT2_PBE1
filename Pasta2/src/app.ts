// Importa a biblioteca Express e também o tipo Express
import express from "express";
import type { Express, Request, Response } from "express";
// Importa o módulo fs para manipulação de arquivos
import fs from "fs";

const app: Express = express();

// Middleware para permitir que o servidor entenda requisições com corpo em JSON
app.use(express.json());

// Define a porta onde o servidor ficará disponível
const PORT: number = 8081;

// Define o nome do diretório e arquivo onde os dados serão armazenados
const DATA_FILE = "./data/usuarios.json";

/*
Função para garantir que o diretório de dados exista antes de salvar os arquivos.
Se o diretório não existir, ele será criado. 
*/
function ensureDataFolderExists() {
    const dataFolder = "./data";
    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder);
    }
}

// Chamar a função para garantir que o diretório exista
ensureDataFolderExists();

// Rota GET /usuarios conforme os requisitos da atividade
app.get("/usuarios", (req: Request, res: Response) => {
    try {
        // 1. Lê o arquivo e converte para objeto/array
        const data = fs.readFileSync(DATA_FILE, "utf8");
        let usuarios = JSON.parse(data);

        // 2. Pega o parâmetro "nome" enviado na URL (ex: /usuarios?nome=joao)
        const nomeQuery = req.query.nome;

        // 3. Se o usuário digitou algum nome para filtrar
        if (nomeQuery && typeof nomeQuery === "string") {
            usuarios = usuarios.filter((usuario: any) => 
                usuario.nome.toLowerCase().includes(nomeQuery.toLowerCase())
            );
        }

        // 4. Retorna o resultado com status 200
        res.status(200).json(usuarios);
    } catch (error) {
        // 5. Se der erro, retorna status 500
        res.status(500).json({ erro: "Erro ao ler ou processar o arquivo de usuários." });
    }
});

// Inicializa o servidor utilizando a porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Rotas disponiveis:");
    console.log(`GET http://localhost:${PORT}/usuarios - obter lista de usuários`);
});