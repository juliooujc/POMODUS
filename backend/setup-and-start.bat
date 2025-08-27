@echo off

set VENV_FOLDER=venv
echo Verificando ambiente virtual...

rem Checa se o ambiente virtual existe
IF NOT EXIST "%VENV_FOLDER%" (
    echo Ambiente virtual nao encontrado. Criando...
    python -m venv "%VENV_FOLDER%"
)
echo Ativando ambiente virtual...
rem Ativa o ambiente virtual (funciona mesmo se ele ja existia)
call "%VENV_FOLDER%\Scripts\activate"

echo Instalando/atualizando dependencias...
pip install -r requirements.txt

echo Iniciando o servidor Flask...
python run.py