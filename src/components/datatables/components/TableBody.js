import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MuiTableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import cloneDeep from 'lodash.clonedeep';
import classNames from 'classnames';
import TableBodyCell from './TableBodyCell';
import TableBodyRow from './TableBodyRow';
import TableSelectCell from './TableSelectCell';
import { getPageValue } from '../utils';

const defaultBodyStyles = (theme) => ({
  root: {
    width: '65em'
  },
  emptyTitle: {
    textAlign: 'center',
  },
  lastStackedCell: {
    [theme.breakpoints.down('sm')]: {
      '& td:last-child': {
        borderBottom: 'none',
      },
    },
  },
  bodyCell: {
    backgroundColor: 'red'
  },
  lastSimpleCell: {
    [theme.breakpoints.down('xs')]: {
      '& td:last-child': {
        borderBottom: 'none',
      },
    },
  },
});

class TableBody extends React.Component {
  static propTypes = {
    /** Data used to describe table */
    data: PropTypes.array.isRequired,
    /** Total number of data rows */
    count: PropTypes.number.isRequired,
    /** Columns used to describe table */
    columns: PropTypes.array.isRequired,
    /** Options used to describe table */
    options: PropTypes.object.isRequired,
    /** Data used to filter table against */
    filterList: PropTypes.array,
    /** Callback to execute when row is clicked */
    onRowClick: PropTypes.func,
    /** Table rows expanded */
    expandedRows: PropTypes.object,
    /** Table rows selected */
    selectedRows: PropTypes.object,
    /** Callback to trigger table row select */
    selectRowUpdate: PropTypes.func,
    /** The most recent row to have been selected/unselected */
    previousSelectedRow: PropTypes.object,
    /** Data used to search table against */
    searchText: PropTypes.string,
    /** Toggle row expandable */
    toggleExpandRow: PropTypes.func,
    /** Extend the style applied to components */
    classes: PropTypes.object,
  };

  static defaultProps = {
    toggleExpandRow: () => {},
  };

  buildRows() {
    const {
      data, page, rowsPerPage, count,
    } = this.props;

    if (this.props.options.serverSide) return data.length ? data : null;

    const rows = [];
    const highestPageInRange = getPageValue(count, rowsPerPage, page);
    const fromIndex = highestPageInRange === 0 ? 0 : highestPageInRange * rowsPerPage;
    const toIndex = Math.min(count, (highestPageInRange + 1) * rowsPerPage);

    if (page > highestPageInRange) {
      console.warn('Current page is out of range, using the highest page that is in range instead.');
    }

    for (let rowIndex = fromIndex; rowIndex < count && rowIndex < toIndex; rowIndex++) {
      if (data[rowIndex] !== undefined) rows.push(data[rowIndex]);
    }

    return rows.length ? rows : null;
  }

  getRowIndex(index) {
    const { page, rowsPerPage, options } = this.props;

    if (options.serverSide) {
      return index;
    }

    const startIndex = page === 0 ? 0 : page * rowsPerPage;
    return startIndex + index;
  }

  isRowSelected(dataIndex) {
    const { selectedRows } = this.props;
    return !!(selectedRows.lookup && selectedRows.lookup[dataIndex]);
  }

  isRowExpanded(dataIndex) {
    const { expandedRows } = this.props;
    return !!(expandedRows.lookup && expandedRows.lookup[dataIndex]);
  }

  isRowSelectable(dataIndex, selectedRows) {
    const { options } = this.props;
    selectedRows = selectedRows || this.props.selectedRows;

    if (options.isRowSelectable) {
      return options.isRowSelectable(dataIndex, selectedRows);
    }
    return true;
  }

  isRowExpandable(dataIndex) {
    const { options, expandedRows } = this.props;
    if (options.isRowExpandable) {
      return options.isRowExpandable(dataIndex, expandedRows);
    }
    return true;
  }

  handleRowSelect = (data, event) => {
    const shiftKey = event && event.nativeEvent ? event.nativeEvent.shiftKey : false;
    const shiftAdjacentRows = [];
    const { previousSelectedRow } = this.props;

    // If the user is pressing shift and has previously clicked another row.
    if (shiftKey && previousSelectedRow && previousSelectedRow.index < this.props.data.length) {
      let curIndex = previousSelectedRow.index;

      // Create a copy of the selectedRows object. This will be used and modified
      // below when we see if we can add adjacent rows.
      const selectedRows = cloneDeep(this.props.selectedRows);

      // Add the clicked on row to our copy of selectedRows (if it isn't already present).
      const clickedDataIndex = this.props.data[data.index].dataIndex;
      if (selectedRows.data.filter((d) => d.dataIndex === clickedDataIndex).length === 0) {
        selectedRows.data.push({
          index: data.index,
          dataIndex: clickedDataIndex,
        });
        selectedRows.lookup[clickedDataIndex] = true;
      }

      while (curIndex !== data.index) {
        const { dataIndex } = this.props.data[curIndex];

        if (this.isRowSelectable(dataIndex, selectedRows)) {
          const lookup = {
            index: curIndex,
            dataIndex,
          };

          // Add adjacent row to temp selectedRow object if it isn't present.
          if (selectedRows.data.filter((d) => d.dataIndex === dataIndex).length === 0) {
            selectedRows.data.push(lookup);
            selectedRows.lookup[dataIndex] = true;
          }

          shiftAdjacentRows.push(lookup);
        }
        curIndex = data.index > curIndex ? curIndex + 1 : curIndex - 1;
      }
    }
    this.props.selectRowUpdate('cell', data, shiftAdjacentRows);
  };

  handleRowClick = (row, data, event) => {
    // Don't trigger onRowClick if the event was actually the expandable icon.
    if (
      event.target.id === 'expandable-button'
      || (event.target.nodeName === 'path' && event.target.parentNode.id === 'expandable-button')
    ) {
      return;
    }

    // Don't trigger onRowClick if the event was actually a row selection via checkbox
    if (event.target.id && event.target.id.startsWith('MUIDataTableSelectCell')) return;

    // Check if we should toggle row select when row is clicked anywhere
    if (
      this.props.options.selectableRowsOnClick
      && this.props.options.selectableRows !== 'none'
      && this.isRowSelectable(data.dataIndex, this.props.selectedRows)
    ) {
      const selectRow = { index: data.rowIndex, dataIndex: data.dataIndex };
      this.handleRowSelect(selectRow, event);
    }
    // Check if we should trigger row expand when row is clicked anywhere
    if (
      this.props.options.expandableRowsOnClick
      && this.props.options.expandableRows
      && this.isRowExpandable(data.dataIndex, this.props.expandedRows)
    ) {
      const expandRow = { index: data.rowIndex, dataIndex: data.dataIndex };
      this.props.toggleExpandRow(expandRow);
    }

    // Don't trigger onRowClick if the event was actually a row selection via click
    if (this.props.options.selectableRowsOnClick) return;

    this.props.options.onRowClick && this.props.options.onRowClick(row, data, event);
  };

  render() {
    const {
      classes, columns, toggleExpandRow, options, selectCellPostion,
    } = this.props;
    const tableRows = this.buildRows();
    const visibleColCnt = columns.filter((c) => c.display === 'true').length;

    return (
      <MuiTableBody>
        {tableRows && tableRows.length > 0 ? (
          tableRows.map((data, rowIndex) => {
            const { data: row, dataIndex } = data;

            if (options.customRowRender) {
              return options.customRowRender(row, dataIndex, rowIndex);
            }

            const isRowSelected = options.selectableRows !== 'none' ? this.isRowSelected(dataIndex) : false;
            const isRowSelectable = this.isRowSelectable(dataIndex);
            const bodyClasses = options.setRowProps ? options.setRowProps(row, dataIndex, rowIndex) : {};

            return (
              <React.Fragment key={rowIndex}>
                <TableBodyRow
                  {...bodyClasses}
                  options={options}
                  rowSelected={isRowSelected}
                  isRowSelectable={isRowSelectable}
                  onClick={this.handleRowClick.bind(null, row, { rowIndex, dataIndex })}
                  className={classNames({
                    [classes.lastStackedCell]:
                      options.responsive === 'vertical'
                      || options.responsive === 'stacked'
                      || options.responsive === 'stackedFullWidth',
                    [classes.lastSimpleCell]: options.responsive === 'simple',
                    [bodyClasses.className]: bodyClasses.className,
                  })}
                  data-testid={`MUIDataTableBodyRow-${dataIndex}`}
                  id={`MUIDataTableBodyRow-${dataIndex}`}
                >
                  {options.selectCellPostion === 'left' && <TableSelectCell
                    onChange={this.handleRowSelect.bind(null, {
                      index: this.getRowIndex(rowIndex),
                      dataIndex,
                    })}
                    onExpand={toggleExpandRow.bind(null, {
                      index: this.getRowIndex(rowIndex),
                      dataIndex,
                    })}
                    fixedHeader={options.fixedHeader}
                    fixedSelectColumn={options.fixedSelectColumn}
                    checked={isRowSelected}
                    expandableOn={options.expandableRows}
                    // When rows are expandable, but this particular row isn't expandable, set this to true.
                    // This will add a new class to the toggle button, MUIDataTableSelectCell-expandDisabled.
                    hideExpandButton={!this.isRowExpandable(dataIndex) && options.expandableRows}
                    selectableOn={options.selectableRows}
                    selectableRowsHideCheckboxes={options.selectableRowsHideCheckboxes}
                    isRowExpanded={this.isRowExpanded(dataIndex)}
                    isRowSelectable={isRowSelectable}
                    id={`MUIDataTableSelectCell-${dataIndex}`}
                  />}
                  {row.map(
                    (column, columnIndex) => {
                      return (
                        <>
                        {
                          columns[columnIndex].display === 'true' && (
                            <TableBodyCell
                              {...(columns[columnIndex].setCellProps
                                ? columns[columnIndex].setCellProps(column, dataIndex, columnIndex)
                                : {})}
                              data-testid={`MuiDataTableBodyCell-${columnIndex}-${rowIndex}`}
                              dataIndex={dataIndex}
                              rowIndex={rowIndex}
                              colIndex={columnIndex}
                              columnHeader={columns[columnIndex].label}
                              print={columns[columnIndex].print}
                              firstIcon={columns[columnIndex].firstIcon}
                              lastIcon={columns[columnIndex].lastIcon}
                              options={columns[columnIndex].icon ? {...options, icon: true}: options}
                              key={columnIndex}
                              className={columnIndex === 2 && options.origin === 'STUDIES IN THIS PROGRAM' && classes.root}
                            >
                              {column}
                            </TableBodyCell>
                            )
                        }
                        </>
                      )
                    },
                  )}
                  {options.selectCellPostion === 'right' && <TableSelectCell
                    onChange={this.handleRowSelect.bind(null, {
                      index: this.getRowIndex(rowIndex),
                      dataIndex,
                    })}
                    onExpand={toggleExpandRow.bind(null, {
                      index: this.getRowIndex(rowIndex),
                      dataIndex,
                    })}
                    fixedHeader={options.fixedHeader}
                    fixedSelectColumn={options.fixedSelectColumn}
                    checked={isRowSelected}
                    expandableOn={options.expandableRows}
                    // When rows are expandable, but this particular row isn't expandable, set this to true.
                    // This will add a new class to the toggle button, MUIDataTableSelectCell-expandDisabled.
                    hideExpandButton={!this.isRowExpandable(dataIndex) && options.expandableRows}
                    selectableOn={options.selectableRows}
                    selectableRowsHideCheckboxes={options.selectableRowsHideCheckboxes}
                    isRowExpanded={this.isRowExpanded(dataIndex)}
                    isRowSelectable={isRowSelectable}
                    id={`MUIDataTableSelectCell-${dataIndex}`}
                  />}
                </TableBodyRow>
                {this.isRowExpanded(dataIndex) && options.renderExpandableRow(row, { rowIndex, dataIndex })}
              </React.Fragment>
            );
          })
        ) : (
          <TableBodyRow options={options}>
            <TableBodyCell
              colSpan={options.selectableRows !== 'none' || options.expandableRows ? visibleColCnt + 1 : visibleColCnt}
              options={options}
              colIndex={0}
              rowIndex={0}
            >
              <Typography variant="body1" className={classes.emptyTitle}>
                {options.textLabels.body.noMatch}
              </Typography>
            </TableBodyCell>
          </TableBodyRow>
        )}
      </MuiTableBody>
    );
  }
}

export default withStyles(defaultBodyStyles, { name: 'MUIDataTableBody' })(TableBody);
