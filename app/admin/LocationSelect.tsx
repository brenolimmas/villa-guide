'use client';

import { useState } from 'react';

const CITIES = [
  'Porto Seguro — Bahia',
  'Trancoso — Bahia',
  'Arraial d\'Ajuda — Bahia',
  'Morro de São Paulo — Bahia',
  'Ilhéus — Bahia',
  'Salvador — Bahia',
  'Chapada Diamantina — Bahia',
  'Jericoacoara — Ceará',
  'Fortaleza — Ceará',
  'Natal — Rio Grande do Norte',
  'Maceió — Alagoas',
  'Recife — Pernambuco',
  'Fernando de Noronha — Pernambuco',
  'Paraty — Rio de Janeiro',
  'Búzios — Rio de Janeiro',
  'Arraial do Cabo — Rio de Janeiro',
  'Angra dos Reis — Rio de Janeiro',
  'Cabo Frio — Rio de Janeiro',
  'Rio de Janeiro — Rio de Janeiro',
  'Ubatuba — São Paulo',
  'Campos do Jordão — São Paulo',
  'São Paulo — São Paulo',
  'Florianópolis — Santa Catarina',
  'Gramado — Rio Grande do Sul',
  'Bonito — Mato Grosso do Sul',
  'Foz do Iguaçu — Paraná',
  'Curitiba — Paraná',
  'Belo Horizonte — Minas Gerais',
  'Manaus — Amazonas',
  'Belém — Pará',
];

interface Props {
  defaultValue?: string;
}

export function LocationSelect({ defaultValue = '' }: Props) {
  const isCustom = defaultValue !== '' && !CITIES.includes(defaultValue);
  const [custom, setCustom] = useState(isCustom);
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <input type="hidden" name="location" value={value} />

      <select
        className="admin-field__input"
        value={custom ? '__custom' : value}
        onChange={e => {
          if (e.target.value === '__custom') {
            setCustom(true);
            setValue('');
          } else {
            setCustom(false);
            setValue(e.target.value);
          }
        }}
      >
        <option value="">Selecione uma cidade…</option>
        {CITIES.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
        <option value="__custom">Outra cidade…</option>
      </select>

      {custom && (
        <input
          className="admin-field__input"
          style={{ marginTop: 8 }}
          placeholder="Ex: Arraial do Cabo — Rio de Janeiro"
          value={value}
          onChange={e => setValue(e.target.value)}
          autoFocus
        />
      )}
    </div>
  );
}
