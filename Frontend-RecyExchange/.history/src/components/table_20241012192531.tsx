import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from '@aptos-labs/wallet-adapter-react';

export const aptos = new Aptos(new AptosConfig({network: Network.TESTNET}));
const ADDRESS = "0xfed39611e5ac476394ec5799b1e0ed2a577a47dcfa522ab92df24d5667bc4720"

export type Payment = {
  id: number,
  Type: string,
  ubication: string,
  weight: number,
  pricePound: number,
  observations: string,
  available: "available" | "not available",
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("Type")}</div>,
  },
  {
    accessorKey: "ubication",
    header: "Ubication",
    cell: ({ row }) => <div>{row.getValue("ubication")}</div>,
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }) => <div>{row.getValue("weight")} kg</div>,
  },
  {
    accessorKey: "pricePound",
    header: "Price per Pound",
    cell: ({ row }) => <div>${row.getValue("pricePound")}</div>,
  },
  {
    accessorKey: "observations",
    header: "Observations",
    cell: ({ row }) => <div>{row.getValue("observations")}</div>,
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ row }) => <div>{row.getValue("available")}</div>,
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<Payment[]>([])

  const { account } = useWallet();

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
  })

  const getRecycling = async () => {
    const payload = {
      function: `${ADDRESS}::recicly::get_all_recyclings` as `${string}::${string}::${string}`,
      functionArguments: [`${account?.address}`],
    }

    try {
      let result = await aptos.view({ payload });
      // Asume que los datos devueltos son un array de reciclajes en el formato correcto
      const recyclingData = result.map((item: any, index: number) => ({
        id: index,
        Type: item.type,
        ubication: item.ubication,
        weight: item.weight,
        pricePound: item.price_pound,
        observations: item.observations,
        available: item.available ? "available" : "not available",
      }));
      setData ([recyclingData]);
    } catch (error) {
      console.error("Error fetching recycling data:", error);
    }
  };

  // Llama a la función para obtener los reciclajes cuando el componente se monta
  React.useEffect(() => {
    getRecycling();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Type..."
          value={(table.getColumn("Type")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Type")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button onClick={getRecycling} className="ml-auto">
          Refresh Data
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
