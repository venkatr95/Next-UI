"use client";

import React, { useState } from "react";
import { Table } from "@next-ui/table";
import { Progress } from "@next-ui/progress";
import { Badge } from "@next-ui/badge";
import { Avatar } from "@next-ui/avatar";
import { Chip } from "@next-ui/chip";
import type { TableColumnConfig, SortDescriptor } from "@next-ui/table";

const sampleData = [
  { id: "1", name: "Alice Johnson", role: "Designer", status: "active" },
  { id: "2", name: "Bob Smith", role: "Developer", status: "away" },
  { id: "3", name: "Carol White", role: "Manager", status: "active" },
];

const columns: TableColumnConfig[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "role", label: "Role", sortable: true },
  {
    key: "status",
    label: "Status",
    renderCell: (val) => (
      <Badge color={val === "active" ? "success" : "default"} size="sm">
        {String(val)}
      </Badge>
    ),
  },
];

export default function DataPage() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor | undefined>();

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Table</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Data tables for displaying structured information.
        </p>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <Table
            columns={columns}
            data={sampleData}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            variant="bordered"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Progress</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Progress bars for showing completion status.
        </p>
        <div className="max-w-md space-y-6">
          <Progress value={60} label="Upload progress" showValueLabel />
          <Progress value={100} color="success" label="Complete" showValueLabel />
          <Progress value={30} color="warning" size="lg" />
          <Progress isIndeterminate label="Loading..." />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Badge</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Small labels for status, counts, or categories.
        </p>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="danger">Danger</Badge>
          <Badge size="sm">Small</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Avatar</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          User avatars in various sizes.
        </p>
        <div className="flex flex-wrap items-end gap-6">
          <Avatar fallback="JD" size="sm" />
          <Avatar fallback="Alice" size="md" />
          <Avatar fallback="Bob" size="lg" />
          <Avatar src="https://i.pravatar.cc/150?u=1" fallback="User" size="md" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Chip</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Compact elements for tags, filters, or selections.
        </p>
        <div className="flex flex-wrap gap-4">
          <Chip>Default</Chip>
          <Chip color="primary">Primary</Chip>
          <Chip color="success">Success</Chip>
          <Chip variant="bordered">Bordered</Chip>
          <Chip variant="flat">Flat</Chip>
          <Chip size="sm">Small</Chip>
          <Chip size="lg">Large</Chip>
        </div>
      </div>
    </div>
  );
}
