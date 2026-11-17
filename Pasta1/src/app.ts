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
        // Tenta ler o arquivo usando o módulo fs
        const data = fs.readFileSync(DATA_FILE, "utf8");
        
        // Converte o conteúdo para objeto/array JavaScript
        const usuarios = JSON.parse(data);

        // Retorna a lista completa com status 200
        res.status(200).json(usuarios);
    } catch (error) {
        // Captura falhas de leitura ou parse e responde com status 500
        res.status(500).json({ erro: "Erro ao ler ou processar o arquivo de usuários." });
    }
});

// Inicializa o servidor utilizando a porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Rotas disponiveis:");
    console.log(`GET http://localhost:${PORT}/usuarios - obter lista de usuários`);
});