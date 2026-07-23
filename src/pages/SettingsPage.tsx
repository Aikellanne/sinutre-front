import { useEffect, useState } from 'react';
import { SimpleHeader } from '@/components/layout/SimpleHeader';
import { getProfile, updateProfile, type Profile } from '@/services/profileService';
import axios from 'axios';

const initialProfile: Profile = {
  name: '',
  birthDate: null,
  gender: 'NAO_ESPECIFICADO',
  height: null,
  weight: null,
  goal: null,
  targetDietDaily: null,
  levelActivity: null,
};

export function SettingsPage() {
  const [profile, setProfile] =
    useState<Profile>(initialProfile);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function loadProfile() {
    try {
      setError('');

      const data = await getProfile();

      setProfile({
        ...data,
        birthDate: data.birthDate
          ? data.birthDate.split('T')[0]
          : null,
      });
    } catch {
      setError(
        'Não foi possível carregar seus dados.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage('');
      setError('');

      await updateProfile(profile);

      setMessage('Dados salvos com sucesso.');
    } catch (error) {
      if (axios.isAxiosError(error)){
        setError(
          error.response?.data?.error ??
          'Não foi possível salvar os dados.'
        );
      } else {
        setError('Não foi possível salvar os dados.');
      } 
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[900px] mx-auto">
      <SimpleHeader
        title="Configurações"
        subtitle="Atualize seus dados pessoais e metas"
      />

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm"
      >
        <div>
          <h2 className="text-lg font-semibold">
            Dados pessoais
          </h2>

          <p className="mt-1 text-sm text-base-content/60">
            Informações básicas da sua conta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <label className="form-control">
            <span className="label-text mb-2">
              Nome
            </span>

            <input
              type="text"
              className="input input-bordered w-full"
              value={profile.name}
              disabled
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-2">
              Data de nascimento
            </span>

            <input
              type="date"
              className="input input-bordered w-full"
              max={new Date().toISOString().split('T')[0]}
              value={profile.birthDate ?? ''}
              onChange={event =>
                setProfile(previous => ({
                  ...previous,
                  birthDate: event.target.value || null,
                }))
              }
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-2">
              Gênero
            </span>

            <select
              className="select select-bordered w-full"
              value={profile.gender}
              onChange={event =>
                setProfile(previous => ({
                  ...previous,
                  gender: event.target.value,
                }))
              }
            >
              <option value="NAO_ESPECIFICADO">
                Não especificado
              </option>
              <option value="FEMININO">
                Feminino
              </option>
              <option value="MASCULINO">
                Masculino
              </option>
              <option value="OUTRO">
                Outro
              </option>
            </select>
          </label>
        </div>

        <div className="divider my-8" />

        <div>
          <h2 className="text-lg font-semibold">
            Dados físicos
          </h2>

          <p className="mt-1 text-sm text-base-content/60">
            Informe sua altura e seu peso atuais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <label className="form-control">
            <span className="label-text mb-2">
              Altura em metros
            </span>

            <input
              type="number"
              step="0.01"
              min="0.5"
              max="2.5"
              className="input input-bordered w-full"
              placeholder="Ex.: 1.64"
              value={profile.height ?? ''}
              onChange={event =>
                setProfile(previous => ({
                  ...previous,
                  height: event.target.value
                    ? Number(event.target.value)
                    : null,
                }))
              }
              required
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-2">
              Peso em quilogramas
            </span>

            <input
              type="number"
              step="0.1"
              min="20"
              max="300"
              className="input input-bordered w-full"
              placeholder="Ex.: 50"
              value={profile.weight ?? ''}
              onChange={event =>
                setProfile(previous => ({
                  ...previous,
                  weight: event.target.value
                    ? Number(event.target.value)
                    : null,
                }))
              }
              required
            />
          </label>
        </div>

        <div className="divider my-8" />

        <div>
          <h2 className="text-lg font-semibold">
            Metas
          </h2>

          <p className="mt-1 text-sm text-base-content/60">
            Defina seu objetivo e sua meta diária
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <label className="form-control">
            <span className="label-text mb-2">
              Objetivo
            </span>

            <select
              className="select select-bordered w-full"
              value={profile.goal ?? ''}
              onChange={event =>
                setProfile(previous => ({
                  ...previous,
                  goal: event.target.value,
                }))
              }
              required
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="PERDER_PESO">
                Perder peso
              </option>
              <option value="MANTER_PESO">
                Manter peso
              </option>
              <option value="GANHAR_MASSA">
                Ganhar massa
              </option>
            </select>
          </label>

          <label className="form-control">
            <span className="label-text mb-2">
              Nível de atividade
            </span>

            <select
              className="select select-bordered w-full"
              value={profile.levelActivity ?? ''}
              onChange={event =>
                setProfile(previous => ({
                  ...previous,
                  levelActivity:
                    event.target.value,
                }))
              }
              required
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="SEDENTARIO">
                Sedentário
              </option>
              <option value="LEVE">
                Leve
              </option>
              <option value="MODERADO">
                Moderado
              </option>
              <option value="INTENSO">
                Intenso
              </option>
            </select>
          </label>

          <label className="form-control md:col-span-2">
            <span className="label-text mb-2">
              Meta diária de calorias
            </span>

            <input
              type="number"
              min="500"
              max="10000"
              step="1"
              className="input input-bordered w-full"
              placeholder="Ex.: 2000"
              value={profile.targetDietDaily ?? ''}
              onChange={event =>
                setProfile(previous => ({
                  ...previous,
                  targetDietDaily:
                    event.target.value
                      ? Number(event.target.value)
                      : null,
                }))
              }
              required
            />
          </label>
        </div>

        {message && (
          <div className="alert alert-success mt-6 text-white">
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error mt-6">
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Salvando...
              </>
            ) : (
              'Salvar alterações'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}