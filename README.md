# Pomodus: Seu Assistente de Tarefas 🍅

**Transforme minutos em conquistas: gerencie suas tarefas com foco total usando a técnica Pomodoro.**

Pomodus é uma aplicação full-stack projetada para ajudar você a organizar seu dia com leveza e foco. Crie tarefas, categorize-as e utilize o timer Pomodoro integrado para dividir seu trabalho em blocos de tempo focados, intercalados com pausas curtas e longas para maximizar sua produtividade.

-----

## ✨ Funcionalidades Principais

  * **🍅 Timer Pomodoro Integrado:** Ciclos de foco, pausas curtas e longas totalmente configuráveis para se adaptar ao seu ritmo.
  * **📋 Gerenciamento de Tarefas:** Adicione, edite, conclua e exclua tarefas de forma simples e intuitiva.
  * **📊 Painel de Estatísticas:** Visualize seu progresso com gráficos sobre horas focadas, dias produtivos e distribuição de tarefas por categoria.
  * **📜 Histórico de Atividades:** Revise todas as tarefas que você já concluiu.
  * **🔐 Autenticação de Usuários:** Crie sua conta e mantenha suas tarefas e estatísticas salvas e seguras.
  * **🎨 Interface Moderna:** Construído com Material-UI para uma experiência de usuário limpa e agradável.

-----

## 🛠️ Tecnologias Utilizadas

O projeto é dividido em duas partes principais: o frontend e o backend.

### **Frontend**

  * **React** (com Vite)
  * **Material-UI (MUI)** para componentes de UI
  * **React Router** para navegação
  * **Context API** para gerenciamento de estado
  * **@mui/x-charts** para visualização de dados

### **Backend**

  * **Python**
  * **Flask** como framework da API
  * **Flask-CORS** para habilitar requisições de origens diferentes
  * **PyJWT** para autenticação baseada em token
  * **Banco de Dados JSON** para persistência de dados de forma simples

-----

## 🚀 Como Executar o Projeto

Para rodar o Pomodus em sua máquina local, siga os passos abaixo.

### **Pré-requisitos**

  * Node.js e npm (presentes no PATH do sistema)
  * Python e pip (presentes no PATH do sistema)

### **Instalação e Execução**

A maneira mais fácil de iniciar o projeto é usando o script `start` do frontend, que cuida de tudo para você.

1.  **Navegue até a pasta do frontend:**

    ```bash
    cd frontend/pomodus
    ```

2.  **Instale as dependências do frontend:**

    ```bash
    npm install
    ```

3.  **Inicie a aplicação (Frontend + Backend):**

    ```bash
    npm run start
    ```

    Este comando irá:

      * Iniciar o servidor de desenvolvimento do frontend (Vite).
      * Executar o script `setup-and-start.bat` que cria um ambiente virtual para o backend, instala as dependências do `requirements.txt` e inicia o servidor Flask.

Após a execução, o frontend estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal) e o backend em `http://127.0.0.1:5000`.

## ATENÇÃO!!!!!!
#### FUNCIONA APENAS EM >>>WINDOWS<<<

-----

## 📁 Estrutura de Pastas

O projeto está organizado da seguinte forma:

```
/
├── backend/
│   ├── app/                # Contém a lógica principal da aplicação Flask
│   │   ├── routes/         # Definição das rotas da API (auth, tasks, etc.)
│   │   └── utils/          # Módulo do banco de dados JSON
│   ├── data/
│   │   └── database.json   # Arquivo que funciona como banco de dados
│   ├── venv/               # Pasta do ambiente virtual (criada automaticamente)
│   ├── requirements.txt    # Dependências do Python
│   └── run.py              # Ponto de entrada para iniciar o servidor Flask
│
└── frontend/
    └── pomodus/
        ├── public/         # Arquivos estáticos (imagens, etc.)
        └── src/
            ├── components/ # Componentes React reutilizáveis
            ├── contexts/   # Gerenciamento de estado com Context API
            ├── guards/     # Rotas protegidas
            ├── pages/      # Componentes de página (Home, Login, etc.)
            ├── services/   # Funções para comunicação com a API
            └── App.jsx     # Componente principal da aplicação
```

-----

## 🖼️ Telas da Aplicação

**LandingPage**
<img width="2557" height="1399" alt="image" src="https://github.com/user-attachments/assets/84646d6d-44f7-4fb4-aa96-c9ff1ea7ef61" />

**Página Inicial**
<img width="2559" height="1405" alt="image" src="https://github.com/user-attachments/assets/1aa1fa2d-c3c8-4ad9-905e-bac4e4f03a2e" />

**Painel de Estatísticas**
<img width="2559" height="1392" alt="image" src="https://github.com/user-attachments/assets/0c1981f6-b3f0-4c17-b185-76bf7e797a25" />

-----

Feito com ❤️ por Ana Klissia, Thais Carolina, Julio Cleiton, Gabriel Ribeiro, Erick Roberto
