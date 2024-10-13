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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const aptos = new Aptos(
  new AptosConfig({ network: Network.TESTNET })
);
const ADDRESS = "0xfed39611e5ac476394ec5799b1e0ed2a577a47dcfa522ab92df24d5667bc4720";

export type Payment = {
  id: number; // ID
  Type: string; // Tipo de reciclaje
  ubication: string; // Dirección de recolección
  weight: number; // Peso
  pricePound: number; // Precio por libra
  observations: string; // Mensaje opcional del usuario
  available: "available" | "not available"; // Disponibilidad
};

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
    header: "Tipo",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Type")}</div>
    ),
  },
  {
    accessorKey: "ubication",
    header: "Ubicación",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ubication")}</div>
    ),
  },
  {
    accessorKey: "weight",
    header: "Peso (lbs)",
    cell: ({ row }) => (
      <div>{row.getValue("weight")} lbs</div>
    ),
  },
  {
    accessorKey: "pricePound",
    header: "Precio por libra",
    cell: ({ row }) => {
      const pricePound = parseFloat(row.getValue("pricePound"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(pricePound);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "observations",
    header: "Observaciones",
    cell: ({ row }) => (
      <div>{row.getValue("observations")}</div>
    ),
  },
  {
    accessorKey: "available",
    header: "Disponibilidad",
    cell: ({ row }) => (
      <div>{row.getValue("available") === "available" ? "Disponible" : "No disponible"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return <></>; // Aquí puedes agregar botones u otras acciones
    },
  },
];

export function DataTableDemo() {
  const [data, setData] = React.useState<Payment[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
  });

  const getRecycling = async () => {
    const payload = {
      function: `${ADDRESS}::recicly::get_all_recyclings` as `${string}::${string}::${string}`,
      functionArguments: [`${account?.address}`],
    };

    try {
      const result = await aptos.view({ payload });

      // Mapeo de datos al formato `Payment`
      const recyclingData = result.map((item: any, index: number) => ({
        id: index, // Utiliza un índice como ID temporal
        Type: item.Type,
        ubication: item.ubication,
        weight: item.weight,
        pricePound: item.pricePound,
        observations: item.observations,
        available: item.available ? "available" : "not available",
      }));

      setData(recyclingData); // Asignamos el array de reciclajes
    } catch (error) {
      console.error("Error al obtener reciclajes: ", error);
    }
  };

  React.useEffect(() => {
    getRecycling(); // Llamamos a la función para obtener datos al cargar el componente
  }, [account]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por ubicación..."
          value={(table.getColumn("ubication")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("ubication")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
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
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getRowModel().rows.length} resultados
        </div>
        <Button
          variant="outline"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
