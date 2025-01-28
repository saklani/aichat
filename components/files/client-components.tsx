"use client"

import { schema } from "@/lib/db"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { deleteObjects, getObjects } from "./_action"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'


export function DeleteButton({ id }: { id: string }) {
    return <Button onClick={() => deleteObjects(id)}>Delete</Button>
}

type Column = Pick<schema.Object, "name" | "source">


const columnHelper = createColumnHelper<Column>()

const columns = [
    columnHelper.accessor(row => row.name, {
        id: 'name',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Name</span>,
    }),
    columnHelper.accessor(row => row.source, {
        id: 'source',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Source</span>,
    }),
]

export function FileTable() {
    const [data, _setData] = useState<Column[]>(() => [])

    useEffect(() => {
        getObjects().then(objects => _setData(objects))
    }, [_setData])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="p-2">
            <Table>
          <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
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
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    {table.getFooterGroups().map(footerGroup => (
                        <TableRow key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableFooter>
            </Table>
            <div className="h-4" />
        </div>
    )
}

