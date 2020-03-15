import React from 'react';
import MaterialTable from 'material-table';
import { Api } from '../../api/Api';
import MaterialUIPickers from '../DatePicker/DatePicker';

export const convertArrCategoriesToObj = categories => categories.reduce(
  (acc, currentValue) => ({ ...acc, [currentValue.id]: currentValue.title }), {});

export const addCategoriesToColumns = (categories, columns) => {
  const updateColumns = [ ...columns ];
  updateColumns[0] = {
    ...updateColumns[0],
    lookup: convertArrCategoriesToObj(categories)
  };
  return updateColumns;
} 

const title = 'Расходы';
const options = {
  headerStyle: {
    backgroundColor: '#01579b',
    color: '#FFF'
  },
  paging: false,
  rowStyle: {
    backgroundColor: '#EEE',
  }
};

const localization = {
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
};

const style = { width: '50%' };

export default class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns:
        [
          {
            title: 'Категория',
            field: 'category_id',
            lookup: {}
          },
          { title: 'Сумма (руб.)', field: 'cost'},
          {
            title: 'Дата', field: 'date',
            editComponent: props => (<MaterialUIPickers value={props.value} onChange={props.onChange} />)
          },
        ],
      data: []
    }
  };

  componentDidMount() {
    Promise.all([
      Api.getPurchases(),
      Api.getCategories()
    ]).then(([purchases, categories]) => {
      this.setState(prevState => ({
        columns: addCategoriesToColumns(categories, prevState.columns),
        data: purchases
      }))
    });
  };

  onCreatePurchase = (newPurchase) =>
    Api.createPurchase(newPurchase)
      .then(
        receivedData => this.setState(
          prevState => ({ ...prevState, data: [...prevState.data, receivedData] })
        )
      );

  onUpdatePurchase = (newData, oldData) => 
    Api.updatePurchase(newData).then((receivedData) => {
      this.setState(prevState => {
        const data = [...prevState.data];
        data[data.indexOf(oldData)] = receivedData;
        return { ...prevState, data };
      });
    });

  onRemovePurchase = oldData => 
    Api.removePurchase(oldData.id)
      .then(receivedData => 
        this.setState(
          prevState => ({
            ...prevState,
            data: prevState.data.filter(item => item.id !== receivedData.id) })
        )
      );

  render() {
    const { columns, data } = this.state;
    return(
      <MaterialTable
        style={ style }
        title={ title }
        columns={ columns }
        data={ data }
        options={ options }
        localization={ localization }
        editable={{
          onRowAdd: this.onCreatePurchase,
          onRowUpdate: this.onUpdatePurchase,
          onRowDelete: this.onRemovePurchase
        }}
      />
    )
  }
}
