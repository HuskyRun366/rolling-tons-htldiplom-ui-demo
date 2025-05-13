"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  Button,
  Input,
  Textarea,
  Label,
  Title2,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  Dropdown,
  Option,
  Field,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { SaveRegular, DismissRegular } from "@fluentui/react-icons";
import { useKostenkomponenten, Kostenkomponente } from "@/contexts/KostenkomponenteContext";

const useStyles = makeStyles({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    width: "100%",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("8px"),
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    ...shorthands.gap("8px"),
    marginTop: "20px",
  },
  card: {
    ...shorthands.padding("30px"),
    width: "100%",
  }
});

export default function EditKostenkomponentePage() {
  const styles = useStyles();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { kostenkomponenten, updateKostenkomponente, getKostenkomponenteById } = useKostenkomponenten();
  
  const [formData, setFormData] = useState<Omit<Kostenkomponente, 'id' | 'version' | 'erstelltAm' | 'geaendertAm'>>({
    name: "",
    beschreibung: "",
    typ: "Sonstiges",
    betrag: 0,
    einheit: "EUR/Stunde",
    waehrung: "EUR",
    gueltigVon: new Date().toISOString().split('T')[0],
    gueltigBis: "",
    status: "aktiv",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Kostenkomponente, 'id' | 'version' | 'erstelltAm' | 'geaendertAm'>, string>>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const kostenkomponente = getKostenkomponenteById(id);
    if (kostenkomponente) {
      const { id: _, version: __, erstelltAm: ___, geaendertAm: ____, ...rest } = kostenkomponente;
      setFormData(rest);
    } else {
      // Handle case when cost component is not found
      router.push("/stammdaten?tab=kostenkomponenten");
    }
    setIsLoading(false);
  }, [id, getKostenkomponenteById, router]);

  // Define unit options based on cost component type
  const getEinheitOptionenByTyp = (typ: Kostenkomponente['typ']): string[] => {
    switch(typ) {
      case 'Trassenpreis':
        return ['EUR/km', 'EUR/Zug', 'EUR/Waggon'];
      case 'Lokomotivkosten':
        return ['EUR/Stunde', 'EUR/Tag', 'EUR/Monat', 'EUR/km'];
      case 'Personalkosten':
        return ['EUR/Stunde', 'EUR/Tag', 'EUR/Monat', 'EUR/Schicht'];
      case 'Energiekosten':
        return ['EUR/kWh', 'EUR/Liter', 'EUR/kg', 'EUR/Tonne'];
      case 'Waggonkosten':
        return ['EUR/Waggon', 'EUR/Tag', 'EUR/Monat', 'EUR/km'];
      case 'Sonstiges':
      default:
        return ['EUR/Stunde', 'EUR/Tag', 'EUR/Monat', 'EUR/km', 'EUR/Stück', 'EUR/Einheit', 'EUR/Pauschale'];
    }
  };

  // Get appropriate units based on current type
  const einheitOptionen = getEinheitOptionenByTyp(formData.typ);
  const typOptionen: Kostenkomponente['typ'][] = ['Trassenpreis', 'Lokomotivkosten', 'Personalkosten', 'Energiekosten', 'Waggonkosten', 'Sonstiges'];
  const statusOptionen: Kostenkomponente['status'][] = ['aktiv', 'inaktiv'];
  const waehrungOptionen: string[] = ['EUR', 'CHF', 'USD', 'GBP'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If changing the type, also update the unit to a suitable default
    if (name === 'typ') {
      const typValue = value as Kostenkomponente['typ'];
      const newUnits = getEinheitOptionenByTyp(typValue);
      setFormData(prev => ({ 
        ...prev, 
        [name]: typValue,
        // Set unit to the first option of the new type if current unit not in new options
        einheit: newUnits.includes(prev.einheit) ? prev.einheit : newUnits[0]
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBetragChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, betrag: value === '' ? 0 : parseFloat(value) }));
     if (errors.betrag) {
        setErrors(prev => ({ ...prev, betrag: undefined }));
      }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name ist erforderlich.";
    if (!formData.typ) newErrors.typ = "Typ ist erforderlich.";
    if (formData.betrag <= 0) newErrors.betrag = "Betrag muss größer als 0 sein.";
    if (!formData.einheit.trim()) newErrors.einheit = "Einheit ist erforderlich.";
    if (!formData.waehrung.trim()) newErrors.waehrung = "Währung ist erforderlich.";
    if (!formData.gueltigVon) newErrors.gueltigVon = "Gültig von Datum ist erforderlich.";
    if (formData.gueltigBis && formData.gueltigVon > formData.gueltigBis) {
      newErrors.gueltigBis = "Gültig bis Datum darf nicht vor Gültig von Datum liegen.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      updateKostenkomponente(id, formData);
      router.push("/stammdaten?tab=kostenkomponenten");
    }
  };

  if (isLoading) {
    return <div className="p-6">Daten werden geladen...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/">Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link href="/stammdaten?tab=kostenkomponenten">Stammdaten</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>Kostenkomponente bearbeiten</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <Title2 align="center" className="mb-6">Kostenkomponente bearbeiten</Title2>

      <Card className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <Field label="Name der Kostenkomponente" required validationMessage={errors.name}>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="z.B. Trassenpreis DB Netz"
            />
          </Field>

          <Field label="Beschreibung (optional)" validationMessage={errors.beschreibung}>
            <Textarea
              name="beschreibung"
              value={formData.beschreibung || ''}
              onChange={handleChange}
              placeholder="Zusätzliche Details zur Kostenkomponente"
              rows={3}
            />
          </Field>
          
          <Field label="Typ" required validationMessage={errors.typ}>
            <select
              name="typ"
              value={formData.typ}
              onChange={handleChange}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {typOptionen.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '24px' }}>
            <Field label="Betrag" required validationMessage={errors.betrag}>
              <Input
                type="number"
                name="betrag"
                value={formData.betrag.toString()}
                onChange={handleBetragChange}
                step="0.01"
                size="large"
              />
            </Field>
            <Field label="Einheit" required validationMessage={errors.einheit}>
              <select
                name="einheit"
                value={formData.einheit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base h-10"
              >
                {einheitOptionen.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Währung" required validationMessage={errors.waehrung}>
              <select
                name="waehrung"
                value={formData.waehrung}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base h-10"
              >
                {waehrungOptionen.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <Field label="Gültig von" required validationMessage={errors.gueltigVon}>
              <Input
                type="date"
                name="gueltigVon"
                value={formData.gueltigVon}
                onChange={handleChange}
                size="large"
              />
            </Field>
            <Field label="Gültig bis (optional)" validationMessage={errors.gueltigBis}>
              <Input
                type="date"
                name="gueltigBis"
                value={formData.gueltigBis || ''}
                onChange={handleChange}
                size="large"
              />
            </Field>
          </div>

          <Field label="Status" required validationMessage={errors.status}>
             <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base h-10"
            >
              {statusOptionen.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </Field>

          <div className={styles.buttonGroup}>
            <Link href="/stammdaten?tab=kostenkomponenten">
              <Button icon={<DismissRegular />} appearance="secondary" size="large">
                Abbrechen
              </Button>
            </Link>
            <Button icon={<SaveRegular />} appearance="primary" type="submit" size="large">
              Speichern
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 