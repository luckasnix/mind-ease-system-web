import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock, Eye, EyeOff, User, Sparkles } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { authRepository } from '@/data/repositories/authRepository';
import { useToast } from '@/presentation/hooks/use-toast';

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Senha muito curta',
        description: 'A senha deve ter pelo menos 6 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast({
        title: 'Senha inválida',
        description: 'A senha deve conter pelo menos uma letra minúscula.',
        variant: 'destructive',
      });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast({
        title: 'Senha inválida',
        description: 'A senha deve conter pelo menos uma letra maiúscula.',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Senhas não coincidem',
        description: 'Verifique se as senhas digitadas são iguais.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      await authRepository.signUp(name, email, password);
      toast({
        title: 'Conta criada!',
        description: 'Bem-vindo ao MindEase.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erro ao criar conta',
        description:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro inesperado. Tente novamente.',
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
            Crie sua conta e comece sua jornada
          </p>
        </div>

        {/* Register Card */}
        <div className='card-cognitive'>
          {/* Welcome message */}
          <div className='flex items-start gap-3 mb-6 p-4 rounded-xl bg-gradient-to-br from-primary-soft to-secondary/30'>
            <div className='w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0'>
              <Sparkles className='w-4 h-4 text-primary' />
            </div>
            <div>
              <h2 className='font-semibold text-foreground text-sm'>
                Vamos começar
              </h2>
              <p className='text-xs text-muted-foreground text-readable'>
                Preencha suas informações para criar um espaço de produtividade
                adaptado a você.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className='space-y-5'>
            {/* Name */}
            <div className='space-y-2'>
              <Label
                htmlFor='name'
                className='text-foreground flex items-center gap-2'
              >
                <User className='w-4 h-4 text-muted-foreground' />
                Nome
              </Label>
              <Input
                id='name'
                type='text'
                placeholder='Seu nome completo'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='h-12 rounded-xl bg-muted/50 border-border/50 focus:bg-background transition-colors'
                disabled={isLoading}
                autoComplete='name'
              />
            </div>

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
                  placeholder='Mínimo 6 caracteres'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='h-12 rounded-xl bg-muted/50 border-border/50 focus:bg-background transition-colors pr-12'
                  disabled={isLoading}
                  autoComplete='new-password'
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

            {/* Confirm Password */}
            <div className='space-y-2'>
              <Label
                htmlFor='confirmPassword'
                className='text-foreground flex items-center gap-2'
              >
                <Lock className='w-4 h-4 text-muted-foreground' />
                Confirmar senha
              </Label>
              <div className='relative'>
                <Input
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Repita a senha'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='h-12 rounded-xl bg-muted/50 border-border/50 focus:bg-background transition-colors pr-12'
                  disabled={isLoading}
                  autoComplete='new-password'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                  tabIndex={-1}
                  aria-label={
                    showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'
                  }
                >
                  {showConfirmPassword ? (
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
                  Criando conta...
                </span>
              ) : (
                'Criar conta'
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
                Já possui uma conta?
              </span>
            </div>
          </div>

          {/* Login link */}
          <Button
            type='button'
            variant='outline'
            className='w-full h-12 rounded-xl text-base'
            onClick={() => navigate('/login')}
          >
            Entrar
          </Button>
        </div>

        {/* Footer */}
        <p className='text-center text-xs text-muted-foreground mt-6'>
          Ao criar sua conta, você concorda com nossos{' '}
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
