# Projeto de Cadastro de Alunos

Este é um projeto de aplicação mobile desenvolvido com **React Native** e **Expo**, que permite o cadastro de alunos, exibição de avisos gerais e anotações de aula. O backend da aplicação é construído com **Node.js**.

## Estrutura do Projeto

- **`/frontend`**: Código do front-end da aplicação (React Native).
- **`/backend`**: Código do back-end da aplicação (Node.js).

## Configuração do Ambiente

Siga as instruções abaixo para configurar e rodar o projeto.

### 1. Configuração do Backend

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências necessárias:
   ```bash
   yarn install
   ```

3. Inicie o servidor:
   ```bash
   node server.js
   ```

   **Nota:** Certifique-se de anotar o endereço IP do computador onde o backend está rodando. Ele será necessário para configurar o frontend.

### 2. Ajuste do IP no Frontend

No código do React Native, localize onde as requisições HTTP estão sendo feitas (normalmente usando fetch ou axios) e ajuste o endereço IP para o IP do computador onde o backend está rodando.

Por exemplo:
```javascript
const API_URL = 'http://<seu_ip>:3000'; // Substitua <seu_ip> pelo IP do seu computador
```

Se o IP do backend for 192.168.0.10, o código ficará assim:
```javascript
const API_URL = 'http://192.168.0.10:3000';
```

### 3. Configuração do Frontend

Navegue até a pasta do frontend:
```bash
cd frontend
```

Instale as dependências:
```bash
yarn install
```

Inicie o projeto:
```bash
npm start
```

O Expo abrirá automaticamente e fornecerá um QR Code. Use o aplicativo Expo Go no seu dispositivo móvel ou emulador para visualizar a aplicação.

## Funcionalidades Principais

- Cadastro de alunos com informações pessoais.
- Exibição de avisos gerais.
- Registro e consulta de anotações de aula.

## Tecnologias Utilizadas

- **Frontend**: React Native, Expo
- **Backend**: Node.js, Express.js (se aplicável)

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias no projeto.

## Licença

Este projeto é licenciado sob a MIT License.
```
