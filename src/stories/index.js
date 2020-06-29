/* eslint-disbale */
import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import MUIDatatable from '../components/datatables/MUIDataTable';
import users from '../stubs/users.json';
import usersWithCars from '../stubs/usersWithCars.json';
import Header from '../components/headers';
import nihLogo from './icdc_nih_logo.svg';
import easter2000 from './Canine2000.png';

const columns = [
  {
    name: 'firstName',
    label: 'First Name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
  },
  {
    name: 'age',
    label: 'Age',
  },
];

const title = 'Awesome list';

const data = users;

storiesOf('Header', module)
  .add('Header default', () => <Header />)
  .add('Header with custom Logo', () => <Header logo={nihLogo} />)
  .add('Easter Header with custom easter', () => <Header easter={easter2000} />)
  .add('Easter Header with custom logo and eas', () => <Header logo={nihLogo} easter={easter2000} />);

storiesOf('MUIDatatable', module).add('common', () => <MUIDatatable columns={columns} data={data} title={title} />);

storiesOf('MUIDatatable/Props', module)
  .add('selectable', () => <MUIDatatable columns={columns} data={data} title={title} selectable={false} />)
  .add('searchable', () => <MUIDatatable columns={columns} data={data} title={title} searchable={false} />)
  .add('filterable', () => <MUIDatatable columns={columns} data={data} title={title} filterable={false} />)
  .add('page', () => <MUIDatatable columns={columns} data={data} title={title} page={10} />)
  .add('perPage', () => <MUIDatatable columns={columns} data={data} title={title} perPage={15} />)
  .add('perPageOption', () => <MUIDatatable columns={columns} data={data} title={title} perPageOption={[5, 15, 50]} />)
  .add('selectedData', () => (
    <MUIDatatable columns={columns} data={data} title={title} selectedData={[data[0], data[1], data[2], data[3]]} />
  ))
  .add('toolbarSelectActions', () => (
    <MUIDatatable
      columns={columns}
      data={data}
      title={title}
      selectedData={[data[0], data[1], data[2], data[3]]}
      toolbarSelectActions={({
        data, selectedData, updateSelectedData, handleDelete,
      }) => (
        <>
          <IconButton
            onClick={() => {
              const nextSelectedData = data.reduce((nextSelectedData, row) => {
                if (!selectedData.includes(row)) {
                  nextSelectedData.push(row);
                }

                return nextSelectedData;
              }, []);

              updateSelectedData(nextSelectedData);
            }}
          >
            <SwapHorizIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDelete(selectedData);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    />
  ))
  .add('toolbarActions', () => (
    <MUIDatatable
      columns={columns}
      data={data}
      title={title}
      toolbarActions={() => (
        <>
          <IconButton onClick={action('click Add button')}>
            <AddCircleIcon />
          </IconButton>
        </>
      )}
    />
  ))
  .add('rowActions', () => (
    <MUIDatatable
      columns={columns}
      data={data}
      title={title}
      rowActions={({ row, rowIndex }) => (
        <>
          <IconButton
            onClick={action(
              `click Edit button at row ${rowIndex} for ${row.firstName} ${row.lastName}, ${row.age} years old`,
            )}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={action(
              `click View button at row ${rowIndex} for ${row.firstName} ${row.lastName}, ${row.age} years old`,
            )}
          >
            <VisibilityIcon />
          </IconButton>
        </>
      )}
    />
  ))
  .add('showSearchBar', () => <MUIDatatable columns={columns} data={data} title={title} showSearchBar />)
  .add('searchValue', () => (
    <MUIDatatable columns={columns} data={data} title={title} showSearchBar searchValue="Jo" />
  ))
  .add('sort', () => (
    <MUIDatatable
      columns={columns}
      data={data}
      title={title}
      sort={[
        { columnName: 'firstName', direction: 'DESC' },
        { columnName: 'age', direction: 'ASC' },
      ]}
    />
  ))
  .add('filterValues', () => <MUIDatatable columns={columns} data={data} title={title} filterValues={{ age: 20 }} />)
  .add('onStateChanged', () => (
    <MUIDatatable columns={columns} data={data} title={title} onStateChanged={action('onStateChanged')} />
  ))
  .add('localization', () => (
    <MUIDatatable
      columns={columns}
      data={data}
      title={title}
      localization={{
        toolbar: {
          searchAction: 'Поиск',
          filterAction: 'Фильтры',
          closeSearch: 'Закрыть поиск',
        },
        filterLists: {
          title: 'Фильтр',
          allOption: 'Все',
          reset: 'Сброс',
          noMatchesText: 'Нет совпадений',
        },
        toolbarSelect: {
          selectedData: (count) => `Выбрано ${count} элемент(ов)`,
        },
        pagination: {
          rowsPerPage: 'Кол-во на стр.',
          displayedRows: ({ from, to, count }) => `${from}-${to} из ${count}`,
        },
        body: {
          noMatchesText: 'Нет совпадений',
        },
      }}
    />
  ))
  .add('custom cell', (props) => (
    <MUIDatatable
      columns={columns}
      data={data}
      title={title}
      customCell={({ value, column }) => {
        if (column.name === 'firstName') {
          return <div style={{ color: 'red' }}>{value.toUpperCase()}</div>;
        }

        return value;
      }}
    />
  ))
  .add('custom noMatches', (props) => (
    <MUIDatatable
      columns={columns}
      data={data}
      title={title}
      searchValue="asd"
      showSearchBar
      customNoMatches={(localization) => (
        <Typography variant="h5" color="error" style={{ textAlign: 'center' }}>
          {localization}
        </Typography>
      )}
    />
  ));

storiesOf('MUIDatatable/Props/columns', module)
  .add('name with dots', () => {
    const columns = [
      {
        name: 'firstName',
        label: 'First Name',
      },
      {
        name: 'lastName',
        label: 'Last Name',
      },
      {
        name: 'age',
        label: 'Age',
      },
      {
        name: 'car.make',
        label: 'Car make',
      },
      {
        name: 'car.model',
        label: 'Car model',
      },
      {
        name: 'car.year',
        label: 'Car year',
      },
    ];

    const data = usersWithCars;

    return <MUIDatatable columns={columns} data={data} title={title} />;
  })
  .add('searchable', () => {
    const columns = [
      {
        name: 'firstName',
        label: 'First Name (no search)',
        searchable: false,
      },
      {
        name: 'lastName',
        label: 'Last Name',
      },
      {
        name: 'age',
        label: 'Age',
      },
      {
        name: 'car.make',
        label: 'Car make',
      },
      {
        name: 'car.model',
        label: 'Car model',
      },
      {
        name: 'car.year',
        label: 'Car year',
      },
    ];

    const data = usersWithCars;

    return <MUIDatatable columns={columns} data={data} title={title} />;
  })
  .add('sortable', () => {
    const columns = [
      {
        name: 'firstName',
        label: 'First Name (no sort)',
        sortable: false,
      },
      {
        name: 'lastName',
        label: 'Last Name',
      },
      {
        name: 'age',
        label: 'Age',
      },
      {
        name: 'car.make',
        label: 'Car make',
      },
      {
        name: 'car.model',
        label: 'Car model',
      },
      {
        name: 'car.year',
        label: 'Car year',
      },
    ];

    const data = usersWithCars;

    return <MUIDatatable columns={columns} data={data} title={title} />;
  })
  .add('filterable', () => {
    const columns = [
      {
        name: 'firstName',
        label: 'First Name (no filter)',
        filterable: false,
      },
      {
        name: 'lastName',
        label: 'Last Name',
      },
      {
        name: 'age',
        label: 'Age',
      },
      {
        name: 'car.make',
        label: 'Car make',
      },
      {
        name: 'car.model',
        label: 'Car model',
      },
      {
        name: 'car.year',
        label: 'Car year',
      },
    ];

    const data = usersWithCars;

    return <MUIDatatable columns={columns} data={data} title={title} />;
  });
