import React, { useCallback } from 'react';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      // width: '55.8em',
    },
    icon: {
      // borderLeft: '1px solid #CFCFCC',
      // borderRight: '1px solid #CFCFCC'
    },
    firstIcon: {
      borderLeft: '1px solid #CFCFCC',
    },
    lastIcon: {
      borderRight: '1px solid #CFCFCC'
    },
    cellHide: {
      display: 'none',
    },
    simpleHeader: {
      [theme.breakpoints.down('xs')]: {
        display: 'inline-block',
        fontWeight: 'bold',
        width: '100%',
        boxSizing: 'border-box',
      },
    },
    simpleCell: {
      [theme.breakpoints.down('xs')]: {
        display: 'inline-block',
        width: '100%',
        boxSizing: 'border-box',
      },
    },
    stackedHeader: {
      verticalAlign: 'top',
    },
    stackedCommon: {
      [theme.breakpoints.down('sm')]: {
        display: 'inline-block',
        fontSize: '16px',
        height: 'auto',
        width: 'calc(50%)',
        boxSizing: 'border-box',
        '&:last-child': {
          borderBottom: 'none',
        },
        '&:nth-last-child(2)': {
          borderBottom: 'none',
        },
      },
    },
    stackedParent: {
      [theme.breakpoints.down('sm')]: {
        display: 'inline-block',
        fontSize: '16px',
        height: 'auto',
        width: 'calc(100%)',
        boxSizing: 'border-box',
      },
    },
    cellStackedSmall: {
      [theme.breakpoints.down('sm')]: {
        width: '50%',
        boxSizing: 'border-box',
      },
    },
    responsiveStackedSmall: {
      [theme.breakpoints.down('sm')]: {
        width: '50%',
        boxSizing: 'border-box',
      },
    },
    responsiveStackedSmallParent: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        boxSizing: 'border-box',
      },
    },
  }),
  { name: 'MUIDataTableBodyCell' },
);

function TableBodyCell(props) {
  const classes = useStyles();
  const {
    children, colIndex, columnHeader, options, dataIndex, rowIndex, className, print, firstIcon, lastIcon, ...otherProps
  } = props;
  const { onCellClick } = options;
  const handleClick = useCallback(
    (event) => {
      onCellClick(children, {
        colIndex, rowIndex, dataIndex, event,
      });
    },
    [onCellClick, children, colIndex, rowIndex, dataIndex],
  );

  // Event listeners. Avoid attaching them if they're not necessary.
  const methods = {};
  if (onCellClick) {
    methods.onClick = handleClick;
  }

  const cells = [
    <div
      key={1}
      className={classNames(
        {
          lastColumn: colIndex === 2,
          [classes.root]: true,
          [classes.cellHide]: true,
          [classes.stackedHeader]: true,
          [classes.stackedCommon]:
            options.responsive === 'vertical'
            || options.responsive === 'stacked'
            || options.responsive === 'stackedFullWidth',
          [classes.cellStackedSmall]:
            options.responsive === 'stacked'
            || (options.responsive === 'stackedFullWidth'
              && (options.setTableProps().padding === 'none' || options.setTableProps().size === 'small')),
          [classes.simpleHeader]: options.responsive === 'simple',
          'datatables-noprint': !print,
        },
        className,
      )}
    >
      {columnHeader}
    </div>,
    <div
      key={2}
      className={classNames(
        {
          [classes.root]: true,
          [classes.stackedCommon]:
            options.responsive === 'vertical'
            || options.responsive === 'stacked'
            || options.responsive === 'stackedFullWidth',
          [classes.responsiveStackedSmall]:
            options.responsive === 'stacked'
            || (options.responsive === 'stackedFullWidth'
              && (options.setTableProps().padding === 'none' || options.setTableProps().size === 'small')),
          [classes.simpleCell]: options.responsive === 'simple',
          'datatables-noprint': !print,
        },
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>,
  ];

  let innerCells;
  if (
    ['standard', 'scrollMaxHeight', 'scrollFullHeight', 'scrollFullHeightFullWidth'].indexOf(options.responsive) !== -1
  ) {
    innerCells = cells.slice(1, 2);
  } else {
    innerCells = cells;
  }

  return (
    <TableCell
      {...methods}
      className={classNames(
        {
          [classes.root]: true,
          [classes.icon]: options.icon,
          [classes.firstIcon]: firstIcon,
          [classes.lastIcon]: lastIcon,
          [classes.stackedParent]:
            options.responsive === 'vertical'
            || options.responsive === 'stacked'
            || options.responsive === 'stackedFullWidth',
          [classes.responsiveStackedSmallParent]:
            options.responsive === 'vertical'
            || options.responsive === 'stacked'
            || (options.responsive === 'stackedFullWidth'
              && (options.setTableProps().padding === 'none' || options.setTableProps().size === 'small')),
          [classes.simpleCell]: options.responsive === 'simple',
          'datatables-noprint': !print,
        },
        className,
      )}
      {...otherProps}
    >
      {innerCells}
    </TableCell>
  );
}

export default TableBodyCell;
