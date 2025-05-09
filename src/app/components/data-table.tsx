"use client";
import { DetailsList, IColumn } from "@fluentui/react";
import type { FC } from "react";

export interface DataTableProps {
  rows: Record<string, string>[];
}

const DataTable: FC<DataTableProps> = ({ rows }) => {
  if (!rows.length) return null;

  const columns: IColumn[] = Object.keys(rows[0]).map((key) => ({
    key,
    name: key,
    fieldName: key,
    minWidth: 100,
    isResizable: true,
  }));

  return <DetailsList items={rows} columns={columns} />;
};

export default DataTable;