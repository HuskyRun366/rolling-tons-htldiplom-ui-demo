"use client";
import { useState, ChangeEvent } from "react";
import { Button, Input } from "@fluentui/react-components";
import DataTable from "./components/data-table";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const backend = "http://localhost:8080/api/excel";

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleUpload = async () => {
    if (!file) return;

    // ---------- JSON holen für Tabelle ----------
    const fdJson = new FormData();
    fdJson.append("file", file);
    const jsonRes = await fetch(`${backend}/upload`, {
      method: "POST",
      body: fdJson,
    });
    const data: Record<string, string>[] = await jsonRes.json();
    setRows(data);

    // ---------- PDF holen & im neuen Tab öffnen ----------
    const fdPdf = new FormData();
    fdPdf.append("file", file);
    const pdfRes = await fetch(`${backend}/uploadPdf`, {
      method: "POST",
      body: fdPdf,
    });
    const blob = await pdfRes.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <section>
      <input type="file" accept=".xlsx,.xls" onChange={onFileChange} />
      <Button
        appearance="primary"
        onClick={handleUpload}
        style={{ marginLeft: "1rem" }}
        disabled={!file}
      >
        Hochladen
      </Button>

      <div style={{ marginTop: "2rem" }}>
        <DataTable rows={rows} />
      </div>
    </section>
  );
}
