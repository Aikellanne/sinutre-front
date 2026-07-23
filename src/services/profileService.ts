import { api } from '@/lib/api';

export interface Profile {
  name: string;
  birthDate: string | null;
  gender: string;

  height: number | null;
  weight: number | null;

  goal: string | null;
  targetDietDaily: number | null;
  levelActivity: string | null;
}

export async function getProfile() {
  const response = await api.get<Profile>('/profile');
  return response.data;
}

export async function updateProfile(profile: Profile) {
  const response = await api.put('/profile', profile);
  return response.data;
}