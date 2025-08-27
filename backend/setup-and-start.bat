@echo off
set VENV_FOLDER=venv

echo Checando o ambiente virtual...

rem Checa se o ambiente virtual já existe
IF NOT EXIST "%VENV_FOLDER%" (
    echo Ambiente virtual nao encontrado. Criando e instalando dependencias...
    python -m venv "%VENV_FOLDER%"
    call "%VENV_FOLDER%\Scripts\activate"
    pip install -r requirements.txt
) ELSE (
    echo Ambiente virtual encontrado. Ativando...
    call "%VENV_FOLDER%\Scripts\activate"
)

echo Iniciando o servidor Flask...
python run.py