import React from 'react';
import MaterialTable from 'material-table';

export default class Income extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns:
        [
          {
            title: 'Категория',
            field: 'category',
            lookup: {
              1: 'Зарплата',
              2: 'Аванс',
              3: 'Подарки'
            }
          },
          { title: 'Сумма (руб.)', field: 'cost'},
          { title: 'ДД/ММ/ГГГГ', field: 'date'},
        ],
      data: 
        [
          {id: 1, cost: 51700, category: 1, date: ' 10/02/2020'},
          {id: 2, cost: 44500, category: 2, date: ' 25/02/2020'}
        ]
    }
  }

  render() {
    return(
      <MaterialTable
        style={ {width: '50%'} }
        title="Доходы"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
        options={{
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF'
          },
          paging: false,
          rowStyle: {
            backgroundColor: '#EEE',
          }
        }}
        localization={{
          header: {
            actions: 'Действия'
          },
          body: {
            emptyDataSourceMessage: 'Нет записей для отображения',
            addTooltip: 'Добавить',
            deleteTooltip: 'Удалить',
            editTooltip: 'Изменить',
            editRow: {
              deleteText: 'Вы уверены, что хотите удалить строку?',
              cancelTooltip: 'Отменить',
              saveTooltip: 'Сохранить'
            },
            toolbar: {
              searchTooltip: 'Поиск',
              searchPlaceholder: 'Поиск записи'
            },
            filterRow: {
              ilterTooltip: 'Фильтр'
            }
          },
        }}
      />
    )
  }
}
