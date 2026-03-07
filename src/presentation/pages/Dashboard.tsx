import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/presentation/components/layout/Layout';
import { LoadingScreen } from '@/presentation/components/LoadingScreen';
import { useUserSettings } from '@/presentation/contexts/UserSettingsContext';
import { useProfile } from '@/presentation/hooks/useProfile';
import { taskRepository } from '@/data/repositories/taskRepository';
import {
  Brain,
  CheckSquare,
  User,
  Settings,
  Sparkles,
  ArrowRight,
  Focus,
  Eye,
  Timer,
  ListChecks,
  TrendingUp,
  Clock,
} from 'lucide-react';

interface TaskSummary {
  total: number;
  todo: number;
  progress: number;
  done: number;
}

const complexityLabels: Record<string, string> = {
  simple: 'Simples',
  medium: 'Médio',
  detailed: 'Detalhado',
};

export default function Dashboard() {
  const { settings, isLoading: settingsLoading } = useUserSettings();
  const { profile, isLoading: profileLoading } = useProfile();
  const [taskSummary, setTaskSummary] = useState<TaskSummary>({
    total: 0,
    todo: 0,
    progress: 0,
    done: 0,
  });
  const [tasksLoading, setTasksLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const tasks = await taskRepository.getTasks();
        const summary: TaskSummary = {
          total: tasks.length,
          todo: tasks.filter((t: { status: string }) => t.status === 'todo')
            .length,
          progress: tasks.filter(
            (t: { status: string }) =>
              t.status === 'in_progress',
          ).length,
          done: tasks.filter((t: { status: string }) => t.status === 'done')
            .length,
        };
        setTaskSummary(summary);
      } catch {
        console.error('Erro ao carregar tarefas para o dashboard');
      } finally {
        setTasksLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const isLoading = settingsLoading || profileLoading || tasksLoading;

  if (isLoading) {
    return <LoadingScreen />;
  }

  const userName = profile?.name?.split(' ')[0] || 'Usuário';
  const completionRate =
    taskSummary.total > 0
      ? Math.round((taskSummary.done / taskSummary.total) * 100)
      : 0;

  return (
    <Layout>
      <div className='max-w-5xl mx-auto stagger-children'>
        {/* Header */}
        <header className='mb-10'>
          <div className='flex items-center gap-4 mb-3'>
            <div className='w-12 h-12 rounded-2xl bg-primary flex items-center justify-center'>
              <Sparkles className='w-6 h-6 text-primary-foreground' />
            </div>
            <div>
              <h1 className='text-2xl lg:text-3xl font-bold text-foreground font-display'>
                Olá, {userName}!
              </h1>
              <p className='text-muted-foreground'>
                Aqui está um resumo do seu dia
              </p>
            </div>
          </div>
        </header>

        {/* Quick stats */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <div className='control-card text-center'>
            <ListChecks className='w-6 h-6 text-primary mx-auto mb-2' />
            <p className='text-2xl font-bold text-foreground'>
              {taskSummary.total}
            </p>
            <p className='text-xs text-muted-foreground'>Total de Tarefas</p>
          </div>
          <div className='control-card text-center'>
            <Clock className='w-6 h-6 text-warning-foreground mx-auto mb-2' />
            <p className='text-2xl font-bold text-foreground'>
              {taskSummary.progress}
            </p>
            <p className='text-xs text-muted-foreground'>Em Progresso</p>
          </div>
          <div className='control-card text-center'>
            <CheckSquare className='w-6 h-6 text-success-foreground mx-auto mb-2' />
            <p className='text-2xl font-bold text-foreground'>
              {taskSummary.done}
            </p>
            <p className='text-xs text-muted-foreground'>Concluídas</p>
          </div>
          <div className='control-card text-center'>
            <TrendingUp className='w-6 h-6 text-primary mx-auto mb-2' />
            <p className='text-2xl font-bold text-foreground'>
              {completionRate}%
            </p>
            <p className='text-xs text-muted-foreground'>Taxa de Conclusão</p>
          </div>
        </div>

        {/* Feature cards grid */}
        <div className='grid lg:grid-cols-2 gap-6 lg:gap-8'>
          {/* Cognitive Panel summary */}
          <Link
            to='/cognitive-panel'
            className='control-card group hover:border-primary/50 transition-all duration-300'
          >
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center'>
                  <Brain className='w-5 h-5 text-primary' />
                </div>
                <h3 className='font-semibold text-foreground'>
                  Painel Cognitivo
                </h3>
              </div>
              <ArrowRight className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors' />
            </div>
            <p className='text-sm text-muted-foreground mb-4'>
              Ajuste a interface ao seu ritmo mental.
            </p>
            <div className='flex flex-wrap gap-2'>
              <span className='px-2 py-1 rounded-lg bg-muted text-xs text-muted-foreground'>
                Complexidade:{' '}
                {complexityLabels[settings.complexity_level] || 'Médio'}
              </span>
              <span className='px-2 py-1 rounded-lg bg-muted text-xs text-muted-foreground'>
                <Focus className='w-3 h-3 inline mr-1' />
                Foco: {settings.focus_mode ? 'Ativo' : 'Inativo'}
              </span>
              <span className='px-2 py-1 rounded-lg bg-muted text-xs text-muted-foreground'>
                <Eye className='w-3 h-3 inline mr-1' />
                Resumo: {settings.summary_mode ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </Link>

          {/* Tasks summary */}
          <Link
            to='/tasks'
            className='control-card group hover:border-primary/50 transition-all duration-300'
          >
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-xl bg-success/30 flex items-center justify-center'>
                  <CheckSquare className='w-5 h-5 text-success-foreground' />
                </div>
                <h3 className='font-semibold text-foreground'>
                  Organizador de Tarefas
                </h3>
              </div>
              <ArrowRight className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors' />
            </div>
            <p className='text-sm text-muted-foreground mb-4'>
              Kanban, Pomodoro e checklists para manter o foco.
            </p>
            <div className='flex gap-3'>
              <div className='flex-1 p-2 rounded-lg bg-muted/50 text-center'>
                <p className='text-lg font-bold text-foreground'>
                  {taskSummary.todo}
                </p>
                <p className='text-xs text-muted-foreground'>A fazer</p>
              </div>
              <div className='flex-1 p-2 rounded-lg bg-muted/50 text-center'>
                <p className='text-lg font-bold text-foreground'>
                  {taskSummary.progress}
                </p>
                <p className='text-xs text-muted-foreground'>Em progresso</p>
              </div>
              <div className='flex-1 p-2 rounded-lg bg-muted/50 text-center'>
                <p className='text-lg font-bold text-foreground'>
                  {taskSummary.done}
                </p>
                <p className='text-xs text-muted-foreground'>Concluídas</p>
              </div>
            </div>
          </Link>

          {/* Profile summary */}
          <Link
            to='/profile'
            className='control-card group hover:border-primary/50 transition-all duration-300'
          >
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-xl bg-secondary flex items-center justify-center'>
                  <User className='w-5 h-5 text-secondary-foreground' />
                </div>
                <h3 className='font-semibold text-foreground'>Meu Perfil</h3>
              </div>
              <ArrowRight className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors' />
            </div>
            <p className='text-sm text-muted-foreground mb-4'>
              Informações pessoais e perfil cognitivo.
            </p>
            <div className='flex flex-wrap gap-2'>
              {profile?.cognitive_type && (
                <span className='px-2 py-1 rounded-lg bg-primary-soft text-xs text-primary font-medium'>
                  {profile.cognitive_type}
                </span>
              )}
              {profile?.cognitive_strengths?.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className='px-2 py-1 rounded-lg bg-success text-xs text-success-foreground'
                >
                  {s}
                </span>
              ))}
              {!profile?.cognitive_type &&
                !profile?.cognitive_strengths?.length && (
                  <span className='text-xs text-muted-foreground'>
                    Perfil ainda não configurado
                  </span>
                )}
            </div>
          </Link>

          {/* Settings summary */}
          <Link
            to='/settings'
            className='control-card group hover:border-primary/50 transition-all duration-300'
          >
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-xl bg-accent flex items-center justify-center'>
                  <Settings className='w-5 h-5 text-accent-foreground' />
                </div>
                <h3 className='font-semibold text-foreground'>Configurações</h3>
              </div>
              <ArrowRight className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors' />
            </div>
            <p className='text-sm text-muted-foreground mb-4'>
              Preferências persistentes para sua experiência.
            </p>
            <div className='flex flex-wrap gap-2'>
              <span className='px-2 py-1 rounded-lg bg-muted text-xs text-muted-foreground'>
                Fonte: {settings.font_size}%
              </span>
              <span className='px-2 py-1 rounded-lg bg-muted text-xs text-muted-foreground'>
                Espaçamento: {settings.spacing}%
              </span>
              <span className='px-2 py-1 rounded-lg bg-muted text-xs text-muted-foreground'>
                Contraste: {settings.contrast}%
              </span>
              <span className='px-2 py-1 rounded-lg bg-muted text-xs text-muted-foreground'>
                <Timer className='w-3 h-3 inline mr-1' />
                Ritmo: {settings.interface_rhythm}%
              </span>
            </div>
          </Link>
        </div>

        {/* Quick tips */}
        <div className='mt-8 card-cognitive bg-gradient-to-br from-primary-soft to-secondary/30'>
          <div className='flex items-start gap-4'>
            <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0'>
              <Sparkles className='w-5 h-5 text-primary' />
            </div>
            <div>
              <h2 className='font-semibold text-foreground mb-1'>
                Dica do dia
              </h2>
              <p className='text-sm text-muted-foreground text-readable'>
                {settings.focus_mode
                  ? 'O modo foco está ativo. Aproveite para concluir suas tarefas mais importantes sem distrações.'
                  : taskSummary.progress > 0
                    ? `Você tem ${taskSummary.progress} tarefa${taskSummary.progress > 1 ? 's' : ''} em progresso. Ative o modo foco no Painel Cognitivo para se concentrar melhor.`
                    : 'Que tal começar organizando suas tarefas do dia? Acesse o Organizador de Tarefas e defina suas prioridades.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
