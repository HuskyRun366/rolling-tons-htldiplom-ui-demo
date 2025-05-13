"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Field,
  Text
} from "@fluentui/react-components";
import { 
  ArrowLeftRegular,
  SaveRegular,
  DeleteRegular
} from "@fluentui/react-icons";
import { useBahnhoefe } from "@/contexts/BahnhofContext";

export default function BahnhofBearbeiten() {
  const router = useRouter();
  const params = useParams();
  const { getBahnhofById, updateBahnhof } = useBahnhoefe();
  
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
  
  const [loading, setLoading] = useState(true);
  const [bahnhofNotFound, setBahnhofNotFound] = useState(false);

  // Load railway station data
  useEffect(() => {
    if (params.id) {
      const bahnhof = getBahnhofById(params.id as string);
      
      if (bahnhof) {
        setFormData({
          name: bahnhof.name,
          bahnhofId: bahnhof.bahnhofId,
          land: bahnhof.land,
          region: bahnhof.region,
          status: bahnhof.status
        });
      } else {
        setBahnhofNotFound(true);
      }
      
      setLoading(false);
    }
  }, [params.id, getBahnhofById]);

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
    
    if (validateForm() && params.id) {
      updateBahnhof(params.id as string, formData);
      router.push("/stammdaten");
    }
  };

  if (loading) {
    return <div className="p-6">Bahnhof wird geladen...</div>;
  }

  if (bahnhofNotFound) {
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
          </Breadcrumb>
        </div>
        <Title2>Bahnhof nicht gefunden</Title2>
        <Text className="mt-2 mb-4">Der gesuchte Bahnhof konnte nicht gefunden werden.</Text>
        <Link href="/stammdaten">
          <Button icon={<ArrowLeftRegular />}>Zurück zur Übersicht</Button>
        </Link>
      </div>
    );
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
            <Link href="/stammdaten">Stammdaten</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>Bahnhof bearbeiten</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Title2>Bahnhof bearbeiten</Title2>
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