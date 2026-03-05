import { useState, useEffect } from 'react';
import { Layout } from '@/presentation/components/layout/Layout';
import { LoadingScreen } from '@/presentation/components/LoadingScreen';
import { ComplexitySelector } from '@/presentation/components/dashboard/ComplexitySelector';
import { useUserSettings } from '@/presentation/contexts/UserSettingsContext';
import { Slider } from '@/shared/ui/slider';
import { Switch } from '@/shared/ui/switch';
import { cn } from '@/shared/lib/utils';
import {
  Settings as SettingsIcon,
  Focus,
  Sun,
  Move,
  Type,
  Sparkles,
  Zap,
  Timer,
  Eye,
  AlertCircle,
} from 'lucide-react';

interface SettingToggleProps {
  icon: React.ElementType;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function SettingToggle({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: SettingToggleProps) {
  return (
    <div className='flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors'>
      <div className='flex items-center gap-4'>
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
            checked ? 'bg-primary' : 'bg-muted',
          )}
        >
          <Icon
            className={cn(
              'w-5 h-5 transition-colors',
              checked ? 'text-primary-foreground' : 'text-muted-foreground',
            )}
          />
        </div>
        <div>
          <p className='font-medium text-sm text-foreground'>{label}</p>
          <p className='text-xs text-muted-foreground'>{description}</p>
        </div>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className='data-[state=checked]:bg-primary'
      />
    </div>
  );
}

interface SettingSliderProps {
  icon: React.ElementType;
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
}

function SettingSlider({
  icon: Icon,
  label,
  description,
  value,
  onChange,
  min = 50,
  max = 150,
  suffix = '%',
}: SettingSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className='p-4 rounded-xl bg-muted/30'>
      <div className='flex items-center gap-4 mb-4'>
        <div className='w-10 h-10 rounded-xl bg-muted flex items-center justify-center'>
          <Icon className='w-5 h-5 text-muted-foreground' />
        </div>
        <div className='flex-1'>
          <p className='font-medium text-sm text-foreground'>{label}</p>
          <p className='text-xs text-muted-foreground'>{description}</p>
        </div>
        <span className='text-sm font-semibold text-primary'>
          {localValue}
          {suffix}
        </span>
      </div>
      <Slider
        value={[localValue]}
        onValueChange={([v]) => setLocalValue(v)}
        onValueCommit={([v]) => onChange(v)}
        min={min}
        max={max}
        step={5}
        className='w-full'
      />
    </div>
  );
}

export default function Settings() {
  const {
    settings,
    isLoading,
    error,
    setComplexity,
    setFocusModeDefault,
    setSummaryModeDefault,
    setGuidedRhythm,
    setFontSize,
    setSpacing,
    setContrast,
    setReduceVisualStimuli,
    setDisableAnimations,
    setInterfaceRhythm,
  } = useUserSettings();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <Layout>
        <div className='max-w-4xl mx-auto flex flex-col items-center justify-center py-20 gap-4'>
          <AlertCircle className='w-12 h-12 text-destructive' />
          <p className='text-lg text-destructive font-medium'>
            Erro ao carregar configurações
          </p>
          <p className='text-sm text-muted-foreground'>{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='max-w-4xl mx-auto stagger-children'>
        {/* Header */}
        <header className='mb-10'>
          <div className='flex items-center gap-4 mb-3'>
            <div className='w-12 h-12 rounded-2xl bg-primary flex items-center justify-center'>
              <SettingsIcon className='w-6 h-6 text-primary-foreground' />
            </div>
            <div>
              <h1 className='text-2xl lg:text-3xl font-bold text-foreground font-display'>
                Configurações
              </h1>
              <p className='text-muted-foreground'>
                Personalize sua experiência por completo
              </p>
            </div>
          </div>
        </header>

        {/* Settings sections */}
        <div className='space-y-8'>
          {/* Complexity level */}
          <ComplexitySelector
            value={settings.complexity_level}
            onChange={setComplexity}
          />

          {/* Behavior settings */}
          <section className='control-card'>
            <h2 className='font-semibold text-lg text-foreground mb-6 flex items-center gap-2'>
              <Zap className='w-5 h-5 text-primary' />
              Comportamento
            </h2>
            <div className='space-y-3'>
              <SettingToggle
                icon={Focus}
                label='Modo Foco Padrão'
                description='Iniciar sempre com o modo foco ativado'
                checked={settings.focus_mode_default}
                onChange={setFocusModeDefault}
              />
              <SettingToggle
                icon={Eye}
                label='Modo Resumo Padrão'
                description='Mostrar apenas informações essenciais'
                checked={settings.summary_mode_default}
                onChange={setSummaryModeDefault}
              />
              <SettingToggle
                icon={Timer}
                label='Ritmo Guiado'
                description='Receber lembretes suaves de pausas e transições'
                checked={settings.guided_rhythm}
                onChange={setGuidedRhythm}
              />
            </div>
          </section>

          {/* Visual settings */}
          <section className='control-card'>
            <h2 className='font-semibold text-lg text-foreground mb-6 flex items-center gap-2'>
              <Sparkles className='w-5 h-5 text-primary' />
              Ajustes Visuais
            </h2>
            <div className='space-y-4'>
              <SettingSlider
                icon={Type}
                label='Tamanho da Fonte'
                description='Ajuste o tamanho do texto em toda a interface'
                value={settings.font_size}
                onChange={setFontSize}
                min={80}
                max={150}
              />
              <SettingSlider
                icon={Move}
                label='Espaçamento'
                description='Controle o espaço entre os elementos'
                value={settings.spacing}
                onChange={setSpacing}
                min={80}
                max={150}
              />
              <SettingSlider
                icon={Sun}
                label='Contraste'
                description='Ajuste a intensidade das cores'
                value={settings.contrast}
                onChange={setContrast}
                min={80}
                max={120}
              />
            </div>
          </section>

          {/* Accessibility settings */}
          <section className='control-card'>
            <h2 className='font-semibold text-lg text-foreground mb-6 flex items-center gap-2'>
              <Eye className='w-5 h-5 text-primary' />
              Acessibilidade
            </h2>
            <div className='space-y-3'>
              <SettingToggle
                icon={Sparkles}
                label='Reduzir Estímulos Visuais'
                description='Minimizar animações e efeitos decorativos'
                checked={settings.reduce_visual_stimuli}
                onChange={setReduceVisualStimuli}
              />
              <SettingToggle
                icon={Zap}
                label='Desativar Animações'
                description='Remover todas as animações da interface'
                checked={settings.disable_animations}
                onChange={setDisableAnimations}
              />
              <SettingSlider
                icon={Timer}
                label='Ritmo da Interface'
                description='Velocidade das transições e feedbacks'
                value={settings.interface_rhythm}
                onChange={setInterfaceRhythm}
                min={50}
                max={150}
              />
            </div>
          </section>

          {/* Info footer */}
          <div className='text-center py-6'>
            <p className='text-sm text-muted-foreground'>
              Suas preferências são salvas automaticamente e sincronizadas entre
              dispositivos.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
