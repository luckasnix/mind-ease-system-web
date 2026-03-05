import { Layout } from '@/presentation/components/layout/Layout';
import { LoadingScreen } from '@/presentation/components/LoadingScreen';
import { useProfile } from '@/presentation/hooks/useProfile';
import { User, Brain, Settings, AlertCircle } from 'lucide-react';

const complexityLabels: Record<string, string> = {
  simple: 'Simples',
  medium: 'Médio',
  detailed: 'Detalhado',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

export default function Profile() {
  const { profile, settings, isLoading, error } = useProfile();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <Layout>
        <div className='max-w-4xl mx-auto flex flex-col items-center justify-center py-20 gap-4'>
          <AlertCircle className='w-12 h-12 text-destructive' />
          <p className='text-lg text-destructive font-medium'>
            Erro ao carregar perfil
          </p>
          <p className='text-sm text-muted-foreground'>{error}</p>
        </div>
      </Layout>
    );
  }

  const userName = profile?.name || 'Usuário';
  const initials = getInitials(userName);
  const memberSince = profile?.created_at
    ? formatDate(profile.created_at)
    : '—';
  const cognitiveType = profile?.cognitive_type || 'Não definido';
  const cognitiveDescription =
    profile?.cognitive_description || 'Perfil cognitivo ainda não configurado.';
  const cognitiveStrengths = profile?.cognitive_strengths || [];

  const preferences = [
    {
      label: 'Complexidade',
      value: settings?.complexity_level
        ? complexityLabels[settings.complexity_level] ||
          settings.complexity_level
        : '—',
    },
    {
      label: 'Modo Foco',
      value: settings?.focus_mode ? 'Ativado' : 'Desativado',
    },
    {
      label: 'Fonte',
      value: settings?.font_size ? `${settings.font_size}%` : '—',
    },
    {
      label: 'Espaçamento',
      value: settings?.spacing ? `${settings.spacing}%` : '—',
    },
    {
      label: 'Contraste',
      value: settings?.contrast ? `${settings.contrast}%` : '—',
    },
    {
      label: 'Modo Resumo',
      value: settings?.summary_mode ? 'Ativado' : 'Desativado',
    },
    {
      label: 'Ritmo Guiado',
      value: settings?.guided_rhythm ? 'Ativado' : 'Desativado',
    },
    {
      label: 'Reduzir Estímulos',
      value: settings?.reduce_visual_stimuli ? 'Ativado' : 'Desativado',
    },
  ];

  return (
    <Layout>
      <div className='max-w-4xl mx-auto stagger-children'>
        {/* Header */}
        <header className='mb-10'>
          <div className='flex items-center gap-4 mb-3'>
            <div className='w-12 h-12 rounded-2xl bg-primary flex items-center justify-center'>
              <User className='w-6 h-6 text-primary-foreground' />
            </div>
            <div>
              <h1 className='text-2xl lg:text-3xl font-bold text-foreground font-display'>
                Meu Perfil
              </h1>
              <p className='text-muted-foreground'>
                Suas informações e preferências
              </p>
            </div>
          </div>
        </header>

        {/* Profile card */}
        <div className='card-cognitive mb-8'>
          <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
            {/* Avatar */}
            <div className='w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center'>
              <span className='text-3xl font-bold text-primary-foreground'>
                {initials}
              </span>
            </div>

            {/* Info */}
            <div className='flex-1 text-center sm:text-left'>
              <h2 className='text-xl font-bold text-foreground mb-1'>
                {userName}
              </h2>
              <p className='text-muted-foreground mb-4'>
                Membro desde {memberSince}
              </p>

              <div className='flex flex-wrap justify-center sm:justify-start gap-2'>
                <span className='px-3 py-1 rounded-full bg-primary-soft text-primary text-sm font-medium'>
                  {cognitiveType}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid layout */}
        <div className='grid lg:grid-cols-2 gap-6 lg:gap-8'>
          {/* Cognitive Profile */}
          <div className='control-card'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 rounded-xl bg-muted flex items-center justify-center'>
                <Brain className='w-5 h-5 text-muted-foreground' />
              </div>
              <h3 className='font-semibold text-foreground'>
                Perfil Cognitivo
              </h3>
            </div>

            <p className='text-sm text-muted-foreground mb-4'>
              {cognitiveDescription}
            </p>

            {cognitiveStrengths.length > 0 && (
              <div className='space-y-2'>
                <p className='text-xs text-muted-foreground uppercase tracking-wider'>
                  Pontos fortes
                </p>
                <div className='flex flex-wrap gap-2'>
                  {cognitiveStrengths.map((strength) => (
                    <span
                      key={strength}
                      className='px-3 py-1.5 rounded-lg bg-success text-success-foreground text-sm'
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Preferences */}
          <div className='control-card'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 rounded-xl bg-muted flex items-center justify-center'>
                <Settings className='w-5 h-5 text-muted-foreground' />
              </div>
              <h3 className='font-semibold text-foreground'>
                Preferências Ativas
              </h3>
            </div>

            <div className='space-y-3'>
              {preferences.map((pref) => (
                <div
                  key={pref.label}
                  className='flex items-center justify-between py-2 border-b border-border/50 last:border-0'
                >
                  <span className='text-sm text-muted-foreground'>
                    {pref.label}
                  </span>
                  <span className='text-sm font-medium text-foreground'>
                    {pref.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
