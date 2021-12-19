# 😃Olá, esse é o projeto [QuizQuiz](https://quizquiz-nextjs.herokuapp.com/).

###### link web: https://quizquiz-nextjs.herokuapp.com/

<p align="center">
    <img src="/assets/sample_image.png"/>
</p>

- Este projeto consiste em auxiliar professores e alunos em um ambiente online. Com os desafios causados pela pandemia da COVID-19, as escolas e cursos dos mais diversos seguimentos foram forçados a se adequarem no mundo online.
- A aplicação tem 2 acessos, um para aluno, onde será exibido todas as questões pré-cadastradas, bem como as novas questões criadas pelo professor, sendo assim o aluno deve responder a listagem de questõs. O outro acesso é para o professor, onde ele poderá criar novas questões para serem emitidas a todos os alunos e acompanhar, em tempo real, o desempenho de cada aluno conectado.

### Este projeto necessita de um complemento backend 🤝
##### Link do repositório para o projeto Backend [QuizQuiz-Backend](https://github.com/WandersonLontra/quiz_socketio_backend)

## Tecnologias usadas 🚀

- [ReactJS](https://pt-br.reactjs.org)
- [NextJS](https://nextjs.org)
- [Sass](https://sass-lang.com)
- [Animate.css](https://animate.style)
- [Typescript](https://www.typescriptlang.org)
- [socket.io-client](https://socket.io)

## Arrumando o ambiente 💪

Faça o clone do projeto com o comando abaixo:

```bash
git clone https://github.com/WandersonLontra/quiz_socketio_frontend.git
```
Em seguida instale as dependências:

```bash
npm install
# ou
yarn
```
- *Crie, na raiz do projeto, um arquivo com nome **.env.local** para setar a variável de ambiente abaixo:*
> NEXT_PUBLIC_SOCKET_URL = http://localhost:3333

Url para conexão com o backend, via socket.io. É imprescindível a configuração desta variável, caso contrário, a conexão não irá ocorrer.

## Iniciando a aplicação 😍

Após a instalação das dependências e inicialização do servidor NodeJS do [QuizQuiz-Backend](https://github.com/WandersonLontra/quiz_socketio_backend)

Rode o comando: 


```bash
npm run dev
# ou
yarn dev
```
Em seguida, abra [http://localhost:3000](http://localhost:3000) no navegador.

### Mapa dos componentes

<p align="center">
    <img src="/assets/components_map.png"/>
</p>
