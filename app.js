// importação do modulo express
const express = require("express");
// importação do modulo do cors para fazer a cross-plataform
const cors = require("cors");
// criação de um app para representar o servidor
const app = express();
// ativar o cors para ser utilizado
app.use(cors());
// configuração do cors para aceitar varias origens
const corsConfig = {
  origin: "*",
  optionsSuccessStatus: 200,
};
// vamos importar o modulo do mongoose para realizar as tarefas do banco de dados
const mongoose = requise("mongoose");
// importação do modulo do body-parser para realizar a conversação dos dados
const bodyParser = require("body-parser");
// utilização do bodyPArser na nossa aplicaçao
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://Demarrage:abcd.1234@cluster0.2ijmo.mongodb.net/atividade?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// vamos criar um schema para realizar a estrutura da tabela de cadastro dos alunos
const tabela = new mongoose.Schema({
  titulo: String,
  area: String,
  horario: String,
  duasdasemana: String,
  preco: String,
  datacadastro: { type: Date, default: Date.now },
});
// construção da tabela
const Curso = mongoose.model("Curso", tabela);
// rotas para a aplicação
// GET
app.get("/", cors(corsConfig), (req, res) => {
  Aluno.find((erro, dados) => {
    if (erro) Console.error(`Erro ao tentar listar os alunos ${erro}`);
    res.status(200).send({ saida: dados });
  });
});
// POST
app.post("/cadastro", (req, res) => {
  const dados = new Aluno(req.body);
  dados
    .save()
    .then(() => res.send("Aluno cadastrado com sucesso!"))
    .catch((erro) => console.error(`Erro ao tentar cadastrar ${erro}`));
});
// PUT
app.put("/atualizar/id", (req, res) => {
  Aluno.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (erro, dados) => {
      if (erro) {
        res.status(400).send({ resultado: `erro ao tentar atualizar ${erro}` });
        return;
      }
      res.status(200).send({ resultado: dados });
    }
  );
});
// DELETE
app.delete("/apagar/:id", (req, res) => {
  Aluno.findByIdAndDelete(req.params.id, (erro, dados) => {
    if (erro) console.error(`Erro ao tentar apagar ${erro}`);
    res.status(200).send({ resultado: "Apagado" });
  });
});
// rota para consultar um cliente por id
app.get("/:id", (req, res) => {
  Aluno.findById(req.params.id, (erro, dados) => {
    if (erro) {
      res.status(400).send({ rs: `Erro ao tentar consultar um aluno ${erro}` });
      return;
    }
    res.status(200).send({ re: dados });
  });
});
app.listen(3505);
consile.log("Servidor Onlin ...");
