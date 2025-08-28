from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
from collections import Counter

from app.routes.auth import require_auth
from app.utils.json_db import list_user_tasks

statistics_bp = Blueprint('statistics', __name__)

@statistics_bp.route('/', methods=['GET'])
@require_auth
def get_statistics():
    try:
        tasks = list_user_tasks(request.user_id)

        # dias usados considerando created_at / updated_at
        dias_usados = set()
        for t in tasks:
            for key in ('created_at', 'updated_at'):
                if t.get(key):
                    try:
                        d = datetime.fromisoformat(t[key]).date()
                        dias_usados.add(d)
                    except Exception:
                        pass
        total_dias_usados = len(dias_usados)

        # dias produtivos = dias com ao menos 1 tarefa marcada como completed
        dias_produtivos = set()
        for t in tasks:
            if t.get('completed') and t.get('updated_at'):
                try:
                    d = datetime.fromisoformat(t['updated_at']).date()
                    dias_produtivos.add(d)
                except Exception:
                    pass
        total_dias_produtivos = len(dias_produtivos)

        # horas de foco (heurística simples baseada em tarefas concluídas)
        horas_de_foco = sum(0.5 for t in tasks if t.get('completed'))  # 30min por tarefa concluída (ajuste à vontade)

        hoje = datetime.utcnow().date()
        semana_inicio = hoje - timedelta(days=6)
        mes_inicio = hoje - timedelta(days=29)

        # uso semanal/mensal: quantidade de tarefas tocadas por dia
        uso_semana = Counter()
        uso_mes = Counter()

        for t in tasks:
            for key in ('created_at', 'updated_at'):
                if not t.get(key):
                    continue
                try:
                    dt = datetime.fromisoformat(t[key]).date()
                except Exception:
                    continue
                if dt >= semana_inicio:
                    uso_semana[dt] += 1
                if dt >= mes_inicio:
                    uso_mes[dt] += 1

        dados_uso_semana = [float(uso_semana.get(semana_inicio + timedelta(days=i), 0)) for i in range(7)]
        dados_uso_mes = [float(uso_mes.get(mes_inicio + timedelta(days=i), 0)) for i in range(30)]

        # categorias semana/mês (usa campo 'priority' como categoria)
        categorias_semana = Counter()
        categorias_mes = Counter()
        for t in tasks:
            cat = (t.get('priority') or 'Sem categoria')
            ref = None
            if t.get('updated_at'):
                try:
                    ref = datetime.fromisoformat(t['updated_at']).date()
                except Exception:
                    pass
            if not ref and t.get('created_at'):
                try:
                    ref = datetime.fromisoformat(t['created_at']).date()
                except Exception:
                    pass
            if not ref:
                continue
            if ref >= semana_inicio:
                categorias_semana[cat] += 1
            if ref >= mes_inicio:
                categorias_mes[cat] += 1

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