import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { authRepository } from '@/data/repositories/authRepository';
import { useToast } from '@/presentation/hooks/use-toast';

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha o email e a senha.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      await authRepository.signIn(email, password);
      toast({
        title: 'Bem-vindo de volta!',
        description: 'Login realizado com sucesso.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erro ao entrar',
        description:
          error instanceof Error
            ? error.message
            : 'Verifique suas credenciais e tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      {/* Background decorative elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl' />
        <div className='absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/30 blur-3xl' />
      </div>

      <div className='w-full max-w-md relative stagger-children'>
        {/* Logo / Brand */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4'>
            <Brain className='w-8 h-8 text-primary-foreground' />
          </div>
          <h1 className='text-3xl font-bold text-foreground font-display'>
            MindEase
          </h1>
          <p className='text-muted-foreground mt-2 text-readable mx-auto'>
            Seu espaço de produtividade adaptativa
          </p>
        </div>

        {/* Login Card */}
        <div className='card-cognitive'>
          {/* Welcome message */}
          <div className='flex items-start gap-3 mb-6 p-4 rounded-xl bg-gradient-to-br from-primary-soft to-secondary/30'>
            <div className='w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0'>
              <Sparkles className='w-4 h-4 text-primary' />
            </div>
            <div>
              <h2 className='font-semibold text-foreground text-sm'>
                Bem-vindo de volta
              </h2>
              <p className='text-xs text-muted-foreground text-readable'>
                Entre na sua conta para acessar seu painel cognitivo
                personalizado.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className='space-y-5'>
            {/* Email */}
            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='text-foreground flex items-center gap-2'
              >
                <Mail className='w-4 h-4 text-muted-foreground' />
                Email
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='seu@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='h-12 rounded-xl bg-muted/50 border-border/50 focus:bg-background transition-colors'
                disabled={isLoading}
                autoComplete='email'
              />
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-foreground flex items-center gap-2'
              >
                <Lock className='w-4 h-4 text-muted-foreground' />
                Senha
              </Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='h-12 rounded-xl bg-muted/50 border-border/50 focus:bg-background transition-colors pr-12'
                  disabled={isLoading}
                  autoComplete='current-password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <EyeOff className='w-4 h-4' />
                  ) : (
                    <Eye className='w-4 h-4' />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type='submit'
              className='w-full h-12 rounded-xl text-base font-semibold'
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='flex items-center gap-2'>
                  <span className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-border/50' />
            </div>
            <div className='relative flex justify-center text-xs'>
              <span className='bg-card px-3 text-muted-foreground'>
                Ainda não tem uma conta?
              </span>
            </div>
          </div>

          {/* Register link */}
          <Button
            type='button'
            variant='outline'
            className='w-full h-12 rounded-xl text-base'
            onClick={() => navigate('/register')}
          >
            Criar conta
          </Button>
        </div>

        {/* Footer */}
        <p className='text-center text-xs text-muted-foreground mt-6'>
          Ao continuar, você concorda com nossos{' '}
          <a href='#' className='text-primary hover:underline'>
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href='#' className='text-primary hover:underline'>
            Política de Privacidade
          </a>
          .
        </p>
      </div>
    </div>
  );
}
