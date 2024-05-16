import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FiCheckCircle, FiCircle, FiDelete, FiEdit } from "react-icons/fi";

import AccessTypeIcon from "./accessTypeIcon";
import GroupItem from "./groupItemColor";
import { GroupNames } from "../common/constants";
import React from "react";
import Tooltip from '@mui/material/Tooltip';
import { useTable } from 'react-table';

const UserTable = ({ users, selectedEmails, handleRowSelect, handlesingleEdit, handlesingleselect, handleSelectAll }) => {
    const data = React.useMemo(() => users, [users]);
    const columns = React.useMemo(() => [
        // { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'User', accessor: 'usertype' },
        { Header: 'Role', accessor: 'role' },
        { Header: 'Group', accessor: 'group', Cell: ({ value }) => value.split(",").map((item, index) => (<GroupItem key={index} value={item} />)) },
        {
            Header: 'Access', accessor: 'access_type', Cell: ({ value }) => (
                <div className="flex flex-col">
                    {value && value.MODULE && value.MODULE[GroupNames[0]] !== undefined && (
                        <AccessTypeIcon label={GroupNames[0]} value={value.MODULE[GroupNames[0]]} />
                    )}
                    {value && value.MODULE && value.MODULE[GroupNames[1]] !== undefined && (
                        <AccessTypeIcon label={GroupNames[1]} value={value.MODULE[GroupNames[1]]} />
                    )}
                    {value && value.MODULE && value.MODULE[GroupNames[2]] !== undefined && (
                        <AccessTypeIcon label={GroupNames[2]} value={value.MODULE[GroupNames[2]]} />
                    )}
                </div>
            )
        },
        {
            Header: 'Checkbox',
            accessor: 'email_checkbox',
            Cell: ({ row }) => (
                <Checkbox
                    checked={selectedEmails.includes(row.original.email)}
                    onChange={() => handleRowSelect(row.original.email)}
                />
            ),
            Header: () => (
                <Checkbox
                    checked={selectedEmails.length === data.length}
                    indeterminate={selectedEmails.length > 0 && selectedEmails.length < data.length}
                    onChange={() => handleSelectAll()}
                />
            )
        },
        { Header: 'Last login', accessor: 'last_logged_in', Cell: ({ value }) => new Date(value).toLocaleDateString("en-IN") },
        { Header: 'Status', accessor: 'is_active' },
        {
            Header: 'Actions', accessor: 'email_actions', Cell: ({ row }) => (
                <div className="flex flex-col gap-1">
                    <Tooltip title="Edit" arrow placement="top">
                        <Button onClick={() => handlesingleEdit(row.original.email, row.original.role)}>
                            <FiEdit />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Delet" arrow placement="right">
                        <Button  onClick={() => handlesingleselect(row.original.email,'delete')}>
                            <FiDelete />
                        </Button>
                    </Tooltip>
                    <Tooltip title="status" arrow placement="bottom">
                        <Button onClick={() => handlesingleselect(row.original.email,'status')} >
                            {row.original.is_active === 'Active' ? <FiCheckCircle /> : <FiCircle />}
                        </Button>
                    </Tooltip>
                </div>
            )
        }

    ], [selectedEmails, handleRowSelect, handleSelectAll, handlesingleEdit,handlesingleselect, data]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <TableContainer className='border border-slate-500' component={Paper}>
            <Table {...getTableProps()} >
                <TableHead className='bg-slate-200 border'>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()} key={headerGroup.id} >
                            {headerGroup.headers.map(column => (
                                <TableCell className='overflow-x-scroll no-scrollbar' {...column.getHeaderProps()} key={column.id}  style={{ whiteSpace: 'nowrap' }}>
                                    {column.render('Header')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()}  key={row.id} className={`${row.index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${row.index === 0 ? "first:rounded-t-lg" : ""} ${row.index === rows.length - 1 ? "last:rounded-b-lg" : ""}`}>
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell className='overflow-x-scroll no-scrollbar' {...cell.getCellProps()} key={cell.id} style={{ whiteSpace: 'nowrap', maxWidth: '200px' }}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>

            </Table>
        </TableContainer>
    );
};

export default UserTable;