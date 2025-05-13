"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Button, 
  Title2, 
  Card, 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  Input,
  Label,
  Dropdown,
  Option,
  Field
} from "@fluentui/react-components";
import { 
  ArrowLeftRegular,
  SaveRegular
} from "@fluentui/react-icons";
import { useBahnhoefe } from "@/contexts/BahnhofContext";

export default function NeuerBahnhof() {
  const router = useRouter();
  const { addBahnhof } = useBahnhoefe();
  
  const [formData, setFormData] = useState({
    name: "",
    bahnhofId: "",
    land: "",
    region: "",
    status: "aktiv" as "aktiv" | "inaktiv"
  });
  
  const [errors, setErrors] = useState({
    name: false,
    bahnhofId: false,
    land: false,
    region: false
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: value.trim() === "" });
  };

  // Handle select changes
  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      bahnhofId: formData.bahnhofId.trim() === "",
      land: formData.land.trim() === "",
      region: formData.region.trim() === ""
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addBahnhof(formData);
      router.push("/stammdaten");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/">Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link href="/stammdaten">Stammdaten</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>Neuer Bahnhof</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Title2>Neuen Bahnhof anlegen</Title2>
        <div className="flex space-x-3">
          <Link href="/stammdaten">
            <Button icon={<ArrowLeftRegular />}>Zurück</Button>
          </Link>
          <Button 
            icon={<SaveRegular />} 
            appearance="primary"
            onClick={handleSubmit}
          >
            Speichern
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field
                label="Bahnhofname"
                required
                validationMessage={errors.name ? "Bitte einen Namen eingeben" : undefined}
              >
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Field>
              
              <Field
                label="Bahnhof-ID"
                required
                validationMessage={errors.bahnhofId ? "Bitte eine ID eingeben" : undefined}
              >
                <Input
                  name="bahnhofId"
                  value={formData.bahnhofId}
                  onChange={handleChange}
                />
              </Field>
              
              <Field
                label="Land"
                required
                validationMessage={errors.land ? "Bitte ein Land eingeben" : undefined}
              >
                <Input
                  name="land"
                  value={formData.land}
                  onChange={handleChange}
                />
              </Field>
              
              <Field
                label="Region"
                required
                validationMessage={errors.region ? "Bitte eine Region eingeben" : undefined}
              >
                <Input
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                />
              </Field>
              
              <Field label="Status">
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={formData.status}
                  onChange={(e) => handleSelectChange("status", e.target.value as "aktiv" | "inaktiv")}
                >
                  <option value="aktiv">Aktiv</option>
                  <option value="inaktiv">Inaktiv</option>
                </select>
              </Field>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
} 