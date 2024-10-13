import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
const ADDRESS = "0xfed39611e5ac476394ec5799b1e0ed2a577a47dcfa522ab92df24d5667bc4720";

export type Recycling = {
  id: number;
  type: string;
  ubication: string;
  weight: number;
  pricePound: number;
  observations: string;
  available: "available" | "not available";
};

export const columns: ColumnDef<Recycling>[] = [
  {
    accessorKey: "type",
    header: "Tipo de reciclaje",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "ubication",
    header: "Ubicación",
    cell: ({ row }) => <div>{row.getValue("ubication")}</div>,
  },
  {
    accessorKey: "weight",
    header: "Peso",
    cell: ({ row }) => <div>{row.getValue("weight")} kg</div>,
  },
  {
    accessorKey: "pricePound",
    header: "Precio por libra",
    cell: ({ row }) => <div>${row.getValue("pricePound")}</div>,
  },
  {
    accessorKey: "observations",
    header: "Observaciones",
    cell: ({ row }) => <div>{row.getValue("observations")}</div>,
  },
  {
    accessorKey: "available",
    header: "Disponibilidad",
    cell: ({ row }) => <div>{row.getValue("available") === "available" ? "Disponible" : "No disponible"}</div>,
  },
];

export function RecyclingTable() {
  const [data, setData] = React.useState<Recycling[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const { account } = useWallet();

  const getRecycling = async () => {
    if (!account?.address) return;

    const payload = {
      function: `${ADDRESS}::recicly::get_all_recyclings` as `${string}::${string}::${string}`,
      functionArguments: [`${account?.address}`],
    };
    
    try {
      const result = await aptos.view({ payload });
      if (result) {
        // Assuming result is an array of recyclings
        const recyclings = result[0] as Recycling[];
        setData(recyclings);
      }
    } catch (error) {
      console.error("Error fetching recyclings: ", error);
    }
  };

  React.useEffect(() => {
    getRecycling();
  }, [account]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por tipo..."
          value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("type")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
