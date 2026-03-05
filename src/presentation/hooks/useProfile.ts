import { useEffect, useState } from 'react';
import { profileRepository } from '@/data/repositories/profileRepository';
import { userSettingsRepository } from '@/data/repositories/userSettingsRepository';
import type { Profile } from '@/domain/entities/profile';
import type { UserSettingsUpdate } from '@/domain/entities/user-settings';

interface UserSettings extends UserSettingsUpdate {
  id?: string;
  user_id?: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const [profileData, settingsData] = await Promise.all([
          profileRepository.getProfile(),
          userSettingsRepository.getUserSettings(),
        ]);

        setProfile(profileData);
        setSettings(settingsData);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao carregar perfil';
        setError(message);
        console.error('Erro ao carregar dados do perfil:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const refetch = async () => {
    try {
      setIsLoading(true);
      const [profileData, settingsData] = await Promise.all([
        profileRepository.getProfile(),
        userSettingsRepository.getUserSettings(),
      ]);
      setProfile(profileData);
      setSettings(settingsData);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar perfil';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { profile, settings, isLoading, error, refetch };
}
