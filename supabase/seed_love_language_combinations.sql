-- SEED SCRIPT: 25 COMBINAÇÕES DO QUIZ SEU IDIOMA DO AMOR (GRID 5x5)
-- Tabela: public.love_language_couple_content

INSERT INTO public.love_language_couple_content (
  idioma_pessoa,
  idioma_conjuge,
  nivel_compatibilidade,
  mapa_compatibilidade,
  ponto_forte,
  desafio_principal,
  reflexao_relacional,
  acoes_concretas,
  resumo
) VALUES
(
  'palavras_afirmacao',
  'palavras_afirmacao',
  '✅ MUITO ALTA (Linguagem Idêntica)',
  'MAPA DE COMPATIBILIDADE**\n\n**Nível:** ✅ MUITO ALTA (Linguagem Idêntica)\n\nVocês falam a mesma linguagem de amor! Quando um reconhece o outro verbalmente, ambos se sentem profundamente amados. Esta é uma das combinações mais harmoniosas.',
  'PONTO FORTE DO CASAL**\n\n✓ Vocês já entendem o que faz um ao outro se sentir amado\n✓ Elogios e reconhecimento alimentam naturalmente a conexão\n✓ Conversas positivas são nutrição emocional diária\n✓ Fácil identificar quando um precisa de validação\n✓ Relacionamento construído sobre reconhecimento mútuo',
  'DESAFIO PRINCIPAL**\n\nQuando ambos têm a mesma linguagem, enfrentam riscos únicos:\n\n✗ Se um tem dia ruim ou está emocionalmente vazio, AMBOS sofrem falta de validação\n✗ Risco de criar **dependência de validação constante** (um fica ansiando por elogios)\n✗ Se começarem críticas verbais, pode **escalar rapidamente** (ambos são sensíveis a palavras)\n✗ Dias de silêncio podem ser interpretados como rejeição\n✗ Perfeccionismo: expectativa de que o outro SEMPRE diga as palavras "certas"',
  'REFLEXÃO RELACIONAL**\n\nReflitam juntos sobre estas perguntas:\n\n- **"Como vocês lidam quando estão emocionalmente vazios e não conseguem elogiar um ao outro?"**\n\n- O que vocês fazem quando ambos estão cansados/estressados?\n\n- Vocês conseguem apoiar um ao outro mesmo sem elogios?\n\n- **"Vocês conseguem RECEBER elogio sem ''negá-lo''?"**\n\n- Exemplo: Quando o outro elogia, você responde com "Ah, não foi nada..."?\n\n- Ou você consegue dizer "Obrigado, eu me sinto amado(a) ouvindo isso"?\n\n- **"Qual é o elogio que mais toca o coração de cada um?"**\n\n- Qual tipo de reconhecimento é mais poderoso para você?\n\n- É sobre aparência? Capacidade? Caráter?\n\n- **"Como vocês expressam amor quando estão em conflito?"**\n\n- Vocês conseguem elogiar mesmo durante uma briga?\n\n- Ou as palavras positivas desaparecem completamente?',
  'AÇÕES CONCRETAS PARA O CASAL**\n\n**AÇÃO 1: Ritual de Afirmações Noturnas** (Faça todos os dias)\n\n- Todos os dias, antes de dormir, vocês se deitam lado a lado\n\n- Um fala um elogio ou reconhecimento específico: "Eu amo em você..."\n\n- O outro RECEBE sem negar: "Obrigado, isso me fez se sentir amado(a)"\n\n- Depois trocam de papéis\n\n- **Tempo:** 5 minutos\n\n- **Benefício:** Cria segurança antes do sono e reconhecimento mútuo\n\n**AÇÃO 2: Desafio do Dia Sem Críticas** (Faça 1x por semana)\n\n- Escolham um dia da semana (sexta à noite, por exemplo)\n\n- TODO o dia: ZERO críticas, apenas elogios e reconhecimentos\n\n- Se sentirem vontade de criticar, transformem em algo positivo\n\n- Exemplo: Em vez de "Você não ajuda em casa", fale "Eu amaria se você..."\n\n- Anotem quantas vezes resistiram à vontade de criticar\n\n- **Objetivo:** Começar a ver padrões de crítica no relacionamento\n\n**AÇÃO 3: Carta de Qualidades** (Faça 1x ao mês)\n\n- Escrevam uma carta um para o outro (pode ser simples!)\n\n- Título: "10 Qualidades Que Eu Amo em Você"\n\n- Listar 10 características, capacidades ou comportamentos que vocês admiram\n\n- Ler a carta em voz alta para o outro\n\n- **Benefício:** Reconhecimento profundo e documentado\n\n**AÇÃO 4: Pesquisa de Pares** (Faça 1x ao mês)\n\n- Vocês combinam com 2-3 amigos próximos\n\n- Cada amigo recebe a pergunta: "Qual qualidade vocês admiram em {{Nome}} e {{Nome_Conjugue}}?"\n\n- Os amigos respondem\n\n- Vocês compartilham as respostas um com o outro\n\n- **Benefício:** Validação externa que fortalece o casal\n\n**AÇÃO 5: Inversão de Papéis** (Faça 1x por mês)\n\n- Um dia, um toma papel de "validador profissional"\n\n- Esse faz perguntas deliberadas ao outro: "O que você fez hoje que merecia reconhecimento?"\n\n- O outro responde e o validador reconhece com elogio específico\n\n- Na semana seguinte, trocam de papéis\n\n- **AÇÃO 6: Mapa de Palavras Mágicas** (Faça 1x no início)\n\n- Cada um responde: "Quais são as 5 palavras que mais me tocam?"\n\n- Escrevam essas palavras em um cartão e colem na geladeira\n\n- **AÇÃO 7: Desafio de Especificidade** (Faça 2x por semana)\n\n- Quando elogiam, obrigam-se a ser ESPECÍFICOS',
  'RESUMO DESTA COMBINAÇÃO**\n\n| **Aspecto** | **Descrição** |\n| --- | --- |\n| **Compatibilidade** | Muito Alta |\n| **Ponto Forte** | Fácil comunicação, validação mútua |\n| **Desafio** | Dependência de validação, crítica escala |\n| **Foco Principal** | Manter positividade, receber sem negar |\n| **Meta** | Criar segurança através de palavras |\n\n**🌹'
)
ON CONFLICT (idioma_pessoa, idioma_conjuge) 
DO UPDATE SET 
  nivel_compatibilidade = EXCLUDED.nivel_compatibilidade,
  mapa_compatibilidade = EXCLUDED.mapa_compatibilidade,
  ponto_forte = EXCLUDED.ponto_forte,
  desafio_principal = EXCLUDED.desafio_principal,
  reflexao_relacional = EXCLUDED.reflexao_relacional,
  acoes_concretas = EXCLUDED.acoes_concretas,
  resumo = EXCLUDED.resumo;
