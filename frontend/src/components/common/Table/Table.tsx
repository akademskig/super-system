/* @ts-nocheck */
import { useEffect } from 'react'
import { TableInstance, UsePaginationInstanceProps } from 'react-table'
import Pagination from './Pagination'
import styles from './Table.module.scss'

type Props = {
  tableInstance: UsePaginationInstanceProps<any> & TableInstance<object>
  withPagination?: boolean
}

const Table = ({ tableInstance, withPagination }: Props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    columns,
    initialState,
    toggleHideColumn,
    ...paginationProps
  } = tableInstance

  useEffect(() => {
    const columnKeys = columns.map((c) => c.id)
    ;(columnKeys || []).map((hc) => {
      if ((initialState?.hiddenColumns || []).includes(hc)) {
        return toggleHideColumn(hc, true)
      } else {
        return toggleHideColumn(hc, false)
      }
    })
  }, [columns, initialState?.hiddenColumns, toggleHideColumn])

  return (
    <div className={styles.root}>
      <Pagination paginationProps={{ ...paginationProps, page }} />
      <table className={styles.table} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // @ts-ignore
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Table
