# App Bank

### Requisitos

Para executar o projeto, será necessário ter instalado:

- [Docker](https://www.docker.com/) 
- [Node](https://nodejs.org/en/download/)

### Rodando a aplicação

Para instalar as dependências do projeto será necessário executar:

```
npm install
```

Na parte de banco de dados, utilizando a porta 5432, vamos precisar executar este comando:

```
docker run --name postgres -e POSTGRES_PASSWORD=postgres -d postgres
```

A aplicação está sendo rodada na porta 3000, para começar a executá-la utilizar:

```
npx tsc && node index.js
```




