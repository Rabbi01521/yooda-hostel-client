import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { usePagination, useRowSelect, useTable } from "react-table";
import { CheckBox } from "./CheckBox";
// import useStudents from "../../../hooks/useStudents";
import { Columns } from "./Columns";
import "./table.css";

const BasicTable = () => {
  const [students, setStudents] = useState([]);
  // const [toRender, setToRender] = useState([]);

  const [update, setUpdate] = useState(false);
  useEffect(() => {
    fetch("https://evening-stream-09071.herokuapp.com/students")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudents(data);
      });
  }, [update]);

  //   DELETE an food
  const handleDeleteStudent = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `https://evening-stream-09071.herokuapp.com/student/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted Successfully");
            const remainingUsers = students.filter((user) => user._id !== id);
            setStudents(remainingUsers);
            setUpdate((st) => !st);
          }
        });
    }
  };

  console.log(students);

  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => students, [students]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "edit",
          Header: () => (
            <div>
              <span>Edit</span>
            </div>
          ),
          Cell: ({ row }) => {
            console.log(row);
            return (
              <div>
                <Link to={`/student/${row.original._id}`}>Edit</Link>
              </div>
            );
          },
        },
        ...columns,
      ]);
    },
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "delete",

          Header: () => (
            <div>
              <span>Delete</span>
            </div>
          ),
          Cell: ({ row }) => {
            console.log(row);
            return (
              <div>
                <Button onClick={() => handleDeleteStudent(row.original._id)}>
                  Delete
                </Button>
              </div>
            );
          },
        },
        ...columns,
      ]);
    },
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <CheckBox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <CheckBox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,

    nextPage,
    previousPage,
    selectedFlatRows,
    state: { pageIndex, selectedRowIds },
  } = tableInstance;

  console.log(pageIndex);

  const handleStatus = () => {
    const status = [];

    for (let i = 0; i < selectedFlatRows.length; i++) {
      status.push(selectedFlatRows[i].original._id);
    }
    console.log(status);

    fetch("https://evening-stream-09071.herokuapp.com/student-invert-status", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(status),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdate((st) => !st);
      });
  };

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page?.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {Object.keys(selectedRowIds).length > 0 && (
        <button style={{}} onClick={handleStatus}>
          Change Status
        </button>
      )}
      <div style={{ marginTop: "10px" }}>
        <span>
          page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  );
};

export default BasicTable;
