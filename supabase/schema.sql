-- ========================================================
-- PLATAFORMA DE MENTORIA - PSICÓLOGA ELAINE SOUZA
-- SCHEMA COMPLETO DO SUPABASE COM RLS E TRIGGERS
-- ========================================================

-- 1. TABELA DE PERFIS DE USUÁRIOS (profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  status_acesso TEXT NOT NULL DEFAULT 'pendente' CHECK (status_acesso IN ('pendente', 'ativo', 'bloqueado')),
  role TEXT NOT NULL DEFAULT 'aluno' CHECK (role IN ('aluno', 'admin')),
  criado_em TIMESTAMPTZ DEFAULT now()
);

-- 2. TABELA DE QUIZZES
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT DEFAULT 'Relacionamento',
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMPTZ DEFAULT now()
);

-- 3. TABELA DE PERGUNTAS (questions)
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  texto TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('multipla_escolha', 'escala', 'texto')),
  opcoes JSONB DEFAULT '[]'::jsonb, -- Ex: [{"valor": 1, "texto": "Discordo totalmente"}]
  ordem INT DEFAULT 1,
  criado_em TIMESTAMPTZ DEFAULT now()
);

-- 4. TABELA DE RESPOSTAS (answers)
CREATE TABLE IF NOT EXISTS public.answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  resposta JSONB NOT NULL,
  respondido_em TIMESTAMPTZ DEFAULT now()
);

-- 5. TABELA DE REGRAS DE DIAGNÓSTICO (diagnostic_rules)
CREATE TABLE IF NOT EXISTS public.diagnostic_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  min_pontos INT DEFAULT 0,
  max_pontos INT DEFAULT 100,
  titulo_resultado TEXT NOT NULL,
  resultado_texto TEXT NOT NULL,
  condicao JSONB DEFAULT '{}'::jsonb,
  criado_em TIMESTAMPTZ DEFAULT now()
);

-- 6. TABELA DE DIAGNÓSTICOS DO USUÁRIO (user_diagnostics)
CREATE TABLE IF NOT EXISTS public.user_diagnostics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  pontuacao_total INT DEFAULT 0,
  titulo_resultado TEXT NOT NULL,
  resultado_texto TEXT NOT NULL,
  gerado_em TIMESTAMPTZ DEFAULT now()
);

-- 7. TABELA DE MATERIAIS / EBOOKS (resources)
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT NOT NULL DEFAULT 'Ebook',
  arquivo_url TEXT NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT now()
);

-- 8. TABELA DE VISUALIZAÇÕES DE MATERIAIS (resource_views)
CREATE TABLE IF NOT EXISTS public.resource_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
  visualizado_em TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT unique_user_resource UNIQUE (user_id, resource_id)
);

-- INDEXES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_questions_quiz ON public.questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_answers_user ON public.answers(user_id);
CREATE INDEX IF NOT EXISTS idx_answers_quiz ON public.answers(quiz_id);
CREATE INDEX IF NOT EXISTS idx_user_diag_user ON public.user_diagnostics(user_id);
CREATE INDEX IF NOT EXISTS idx_resource_views_user ON public.resource_views(user_id);

-- ========================================================
-- TRIGGER AUTOMÁTICO PARA CRIAR PERFIL AO REGISTRAR NO AUTH
-- ========================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, nome, email, status_acesso, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', split_part(NEW.email, '@', 1)),
    NEW.email,
    'pendente', -- Novos usuários entram com status 'pendente' para aprovação manual do admin
    COALESCE(NEW.raw_user_meta_data->>'role', 'aluno')
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================================
-- SEGURANÇA: ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_views ENABLE ROW LEVEL SECURITY;

-- Helper function para verificar se usuário logado é Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function para verificar se usuário logado tem status Ativo
CREATE OR REPLACE FUNCTION public.is_ativo()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND status_acesso = 'ativo'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- POLÍTICAS: PROFILES
-- Usuário pode ver seu próprio perfil
CREATE POLICY "Leitura de perfil próprio" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

-- Usuário pode atualizar seu próprio nome
CREATE POLICY "Atualização de perfil próprio" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());

-- Admins podem fazer tudo no profiles
CREATE POLICY "Admin controle total de perfis" ON public.profiles
  FOR ALL USING (public.is_admin());

-- POLÍTICAS: QUIZZES
-- Membros ativos e admins podem ler quizzes
CREATE POLICY "Alunos ativos leem quizzes" ON public.quizzes
  FOR SELECT USING (public.is_ativo() OR public.is_admin());

-- Apenas Admin pode criar/alterar quizzes
CREATE POLICY "Admin gerencia quizzes" ON public.quizzes
  FOR ALL USING (public.is_admin());

-- POLÍTICAS: QUESTIONS
-- Membros ativos leem perguntas
CREATE POLICY "Alunos ativos leem perguntas" ON public.questions
  FOR SELECT USING (public.is_ativo() OR public.is_admin());

-- Admin gerencia perguntas
CREATE POLICY "Admin gerencia perguntas" ON public.questions
  FOR ALL USING (public.is_admin());

-- POLÍTICAS: ANSWERS
-- Aluno só pode ver suas próprias respostas; Admin pode ver todas
CREATE POLICY "Leitura de respostas próprias" ON public.answers
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

-- Aluno ativo pode inserir suas próprias respostas
CREATE POLICY "Inserção de respostas próprias" ON public.answers
  FOR INSERT WITH CHECK (auth.uid() = user_id AND public.is_ativo());

-- POLÍTICAS: DIAGNOSTIC RULES
-- Leitura de regras permitida para processamento
CREATE POLICY "Leitura de regras de diagnóstico" ON public.diagnostic_rules
  FOR SELECT USING (public.is_ativo() OR public.is_admin());

-- Admin gerencia regras
CREATE POLICY "Admin gerencia regras de diagnostico" ON public.diagnostic_rules
  FOR ALL USING (public.is_admin());

-- POLÍTICAS: USER DIAGNOSTICS
-- Aluno vê seus diagnósticos; Admin pode ver diagnósticos de todos
CREATE POLICY "Leitura de diagnosticos proprios" ON public.user_diagnostics
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

-- Inserção de diagnóstico próprio
CREATE POLICY "Geracao de diagnostico proprio" ON public.user_diagnostics
  FOR INSERT WITH CHECK (auth.uid() = user_id AND public.is_ativo());

-- POLÍTICAS: RESOURCES
-- Alunos ativos e admins leem materiais
CREATE POLICY "Alunos ativos leem materiais" ON public.resources
  FOR SELECT USING (public.is_ativo() OR public.is_admin());

-- Admin gerencia materiais
CREATE POLICY "Admin gerencia materiais" ON public.resources
  FOR ALL USING (public.is_admin());

-- POLÍTICAS: RESOURCE VIEWS
-- Aluno lê e registra suas visualizações
CREATE POLICY "Leitura de visualizacoes proprias" ON public.resource_views
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Registro de visualizacao propria" ON public.resource_views
  FOR INSERT WITH CHECK (auth.uid() = user_id AND public.is_ativo());

-- ========================================================
-- QUIZ DE TEMPERAMENTO (Tabelas Especializadas)
-- ========================================================

-- 9. TABELA DE RESPOSTAS DO QUIZ DE TEMPERAMENTO (quiz_temperamento_answers)
CREATE TABLE IF NOT EXISTS public.quiz_temperamento_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_number INT NOT NULL,
  resposta TEXT NOT NULL,
  pontos_atribuidos INT NOT NULL,
  temperamento_atribuido TEXT NOT NULL CHECK (temperamento_atribuido IN ('colerico', 'sanguineo', 'melancolico', 'fleumatico')),
  respondido_em TIMESTAMPTZ DEFAULT now()
);

-- 10. TABELA DE RESULTADOS DO QUIZ DE TEMPERAMENTO (quiz_temperamento_results)
CREATE TABLE IF NOT EXISTS public.quiz_temperamento_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  colerico_pontos INT NOT NULL DEFAULT 0,
  sanguineo_pontos INT NOT NULL DEFAULT 0,
  melancolico_pontos INT NOT NULL DEFAULT 0,
  fleumatico_pontos INT NOT NULL DEFAULT 0,
  temperamento_primario TEXT NOT NULL CHECK (temperamento_primario IN ('colerico', 'sanguineo', 'melancolico', 'fleumatico')),
  intensidade_primario TEXT NOT NULL CHECK (intensidade_primario IN ('Forte', 'Moderado', 'Equilibrado')),
  temperamento_secundario TEXT CHECK (temperamento_secundario IN ('colerico', 'sanguineo', 'melancolico', 'fleumatico')),
  intensidade_secundario TEXT CHECK (intensidade_secundario IN ('Forte', 'Moderado', 'Equilibrado')),
  calculado_em TIMESTAMPTZ DEFAULT now()
);

-- INDEXES PARA QUIZ DE TEMPERAMENTO
CREATE INDEX IF NOT EXISTS idx_temp_answers_user ON public.quiz_temperamento_answers(user_id);
CREATE INDEX IF NOT EXISTS idx_temp_results_user ON public.quiz_temperamento_results(user_id);

-- RLS PARA QUIZ DE TEMPERAMENTO
ALTER TABLE public.quiz_temperamento_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_temperamento_results ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS: QUIZ TEMPERAMENTO ANSWERS
CREATE POLICY "Leitura de respostas temperamento proprias" ON public.quiz_temperamento_answers
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Insercao de respostas temperamento proprias" ON public.quiz_temperamento_answers
  FOR INSERT WITH CHECK (auth.uid() = user_id AND public.is_ativo());

-- POLÍTICAS: QUIZ TEMPERAMENTO RESULTS
CREATE POLICY "Leitura de resultados temperamento proprios" ON public.quiz_temperamento_results
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Insercao de resultados temperamento proprios" ON public.quiz_temperamento_results
  FOR INSERT WITH CHECK (auth.uid() = user_id AND public.is_ativo());

-- ========================================================
-- BUCKET DE STORAGE SUPABASE (PDFs e Materiais)
-- ========================================================
-- Executar no painel do Supabase Storage ou via SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('materiais', 'materiais', true);

