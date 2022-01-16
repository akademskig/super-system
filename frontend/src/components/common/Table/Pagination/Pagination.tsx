import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'
import { UsePaginationInstanceProps } from 'react-table'
import Button from '../../Button'
import Select from '../../Select'
import styles from './Pagination.module.scss'

const pageLimits = [10, 20, 30, 40, 50]

type Props = {
  paginationProps: UsePaginationInstanceProps<any>
}
const Pagination = ({ paginationProps }: Props) => {
  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    //@ts-ignore
    state: { pageIndex, pageSize },
    nextPage,
    previousPage,
    setPageSize,
  } = paginationProps
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.buttons}>
          <Button
            link
            className={styles.button}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <FaAngleDoubleLeft />
          </Button>{' '}
          <Button
            link
            className={styles.button}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <FaAngleLeft />
          </Button>{' '}
          <Button
            link
            className={styles.button}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <FaAngleRight />
          </Button>{' '}
          <Button
            link
            className={styles.button}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <FaAngleDoubleRight />
          </Button>{' '}
        </div>
        <div>
          <span className={styles.pageIndicator}>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
        </div>
      </div>
      <div className={styles.setLimit}>
        <Select
          label="Show"
          classes={{
            menuButton: styles.menuButton,
            root: styles.selectLimitRoot,
          }}
          options={pageLimits.map((pageSize) => ({
            value: pageSize,
            label: `${pageSize}`,
          }))}
          value={pageSize}
          onChange={(e: any) => {
            setPageSize(Number(e.target.value))
          }}
        />
      </div>
    </div>
  )
}
export default Pagination
