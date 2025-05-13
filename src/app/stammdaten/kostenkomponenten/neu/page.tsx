"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

type KostenkomponenteForm = Omit<Kostenkomponente, 'id' | 'version' | 'erstelltAm' | 'geaendertAm' | 'einheit'>;

export default function NeueKostenkomponentePage() {
  const styles = useStyles();
  const router = useRouter();
  const { addKostenkomponente } = useKostenkomponenten();

  const [formData, setFormData] = useState<KostenkomponenteForm>({
    name: "",
    beschreibung: "",
    typ: "Sonstiges", // Default value
    betrag: 0,
    waehrung: "EUR", // Default Waehrung
    gueltigVon: new Date().toISOString().split('T')[0], // Default to today
    gueltigBis: "",
    status: "aktiv",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof KostenkomponenteForm, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof KostenkomponenteForm]) {
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
    const newErrors: Partial<Record<keyof KostenkomponenteForm, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name ist erforderlich.";
    if (!formData.typ) newErrors.typ = "Typ ist erforderlich.";
    if (formData.betrag <= 0) newErrors.betrag = "Betrag muss größer als 0 sein.";
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
      addKostenkomponente(formData);
      router.push("/stammdaten?tab=kostenkomponenten"); // Redirect and select tab
    }
  };

  const typOptionen: Kostenkomponente['typ'][] = ['Trassenpreis', 'Lokomotivkosten', 'Personalkosten', 'Energiekosten', 'Waggonkosten', 'Sonstiges'];
  const statusOptionen: Kostenkomponente['status'][] = ['aktiv', 'inaktiv'];
  const waehrungOptionen: string[] = ['EUR', 'CHF', 'USD', 'GBP'];

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
          <BreadcrumbItem>Neue Kostenkomponente</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <Title2 align="center" className="mb-6">Neue Kostenkomponente erstellen</Title2>

      <Card className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <Field label="Name der Kostenkomponente" required  validationMessage={errors.name}>
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
              value={formData.beschreibung}
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

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '24px' }}>
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
                value={formData.gueltigBis}
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