# App Bank

### Requisitos

Para executar o projeto, será necessário ter instalado:

- [Docker](https://www.docker.com/) 
- [Node](https://nodejs.org/en/download/)

### Rodando a aplicação

- É necessário que todos os comandos sejam executados dentro da pasta 'backend'.

Para instalar as dependências do projeto, será necessário executar:

```
npm install
```

Na parte de banco de dados, utilizando a porta 5432, vamos precisar executar este comando:

```
docker run --name postgres -e POSTGRES_PASSWORD=postgres -d postgres
```

Para executar a aplicação utilizar este comando:

```
npx tsc && node index.js
```

A aplicação estará disponível em [localhost:3000/](localhost:3000/) 


