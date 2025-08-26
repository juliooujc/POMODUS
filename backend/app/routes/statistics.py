# backend/app/routes/statistics.py
from flask import Blueprint, jsonify
from app.utils.json_db import db
from datetime import datetime, timedelta

statistics_bp = Blueprint('statistics', __name__)

@statistics_bp.route('/', methods=['GET'])
def get_statistics():
    try:
        tasks = db.get_collection('tasks')
        
        # --- Métricas Principais ---
        dias_usados = set()
        for task in tasks:
            if 'created_at' in task:
                dias_usados.add(datetime.fromisoformat(task['created_at']).date())
            if 'updated_at' in task:
                dias_usados.add(datetime.fromisoformat(task['updated_at']).date())
        total_dias_usados = len(dias_usados)

        horas_de_foco = sum(0.42 for task in tasks if task.get('completed'))

        dias_produtivos = set()
        for task in tasks:
            if task.get('completed') and 'updated_at' in task:
                dias_produtivos.add(datetime.fromisoformat(task['updated_at']).date())
        total_dias_produtivos = len(dias_produtivos)

        # --- Dados para Gráficos ---
        hoje = datetime.now()
        inicio_semana = hoje - timedelta(days=hoje.weekday())
        inicio_mes = hoje.replace(day=1)

        # Gráfico de Uso (Horas Focadas)
        dados_uso_semana = [0] * 7 # seg(0)-dom(6)
        dados_uso_mes = [0] * 31 # dia 1(0)-31(30)

        # Gráfico de Categoria (Contagem de tarefas por tag)
        categorias_semana = {}
        categorias_mes = {}

        for task in tasks:
            if task.get('completed') and 'updated_at' in task:
                data_tarefa = datetime.fromisoformat(task['updated_at'])
                tag = task.get('priority', 'Outra')

                # Popula dados de USO (horas focadas)
                if data_tarefa >= inicio_semana:
                    dia_da_semana = data_tarefa.weekday() # Segunda é 0, Domingo é 6
                    dados_uso_semana[dia_da_semana] += 0.42 # Adiciona 25min de foco

                if data_tarefa >= inicio_mes:
                    dia_do_mes = data_tarefa.day - 1 # dia 1 = índice 0
                    if dia_do_mes < 31: # Garante que não estoure o array
                        dados_uso_mes[dia_do_mes] += 0.42
                
                # Popula dados de CATEGORIA
                if data_tarefa >= inicio_semana:
                    categorias_semana[tag] = categorias_semana.get(tag, 0) + 1
                
                if data_tarefa >= inicio_mes:
                    categorias_mes[tag] = categorias_mes.get(tag, 0) + 1

        # Arredondar os valores de horas para duas casas decimais
        dados_uso_semana = [round(h, 2) for h in dados_uso_semana]
        dados_uso_mes = [round(h, 2) for h in dados_uso_mes]

        return jsonify({
            'diasUsados': total_dias_usados,
            'horasDeFoco': round(horas_de_foco, 2),
            'diasProdutivos': total_dias_produtivos,
            'usoSemana': dados_uso_semana,
            'usoMes': dados_uso_mes,
            'categoriasSemana': [{"label": k, "value": v} for k, v in categorias_semana.items()],
            'categoriasMes': [{"label": k, "value": v} for k, v in categorias_mes.items()],
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500