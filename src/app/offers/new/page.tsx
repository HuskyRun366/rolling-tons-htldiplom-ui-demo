'use client';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from '@fluentui/react-components';
import { useRouter } from 'next/navigation';

export default function NewOfferPage() {
  const { control, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    await fetch('http://localhost:8080/api/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    router.push('/offers');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: 480, padding: 24 }}>
        <Controller
          name="customer"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} placeholder="Kunde" />}
        />
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} placeholder="Titel" />}
        />
        <Controller
          name="total"
          control={control}
          rules={{
            required: true,
            validate: (value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0 || 'Invalid number',
          }}
          render={({ field }) => <Input {...field} placeholder="Betrag (€)" type="number" step="0.01" />}
        />
        <Button appearance="primary" type="submit">
          Speichern
        </Button>
        </div>
    </form>
  );
}
