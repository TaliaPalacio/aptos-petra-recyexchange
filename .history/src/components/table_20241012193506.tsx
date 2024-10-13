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
  id: string; // Cambia a string si el ID es un string
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

      // Aplanar el array de arrays y mapear al formato `Payment`
      const recyclingData = result.flat().map((item: any) => ({
        id: item[0], // Asignar el ID proporcionado por el backend
        Type: item[1], // Ajusta según la estructura interna de los arrays
        ubication: item[2], // Ajusta según la estructura interna de los arrays
        weight: item[3], // Ajusta según la estructura interna de los arrays
        pricePound: item[4], // Ajusta según la estructura interna de los arrays
        observations: item[5], // Ajusta según la estructura interna de los arrays
        available: item[6], // Ajusta según la estructura interna de los arrays
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
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={`flex items-center space-x-2 ${
                        header.column.getIsSorted() ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                      <div>
                        {{
                          asc: <ArrowUpDown className="h-4 w-4" />,
                          desc: <ArrowUpDown className="h-4 w-4 rotate-180" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
