import React from 'react';
import MaterialTable from 'material-table';
import { Api } from '../../api/Api';
import MaterialUIPickers from '../DatePicker/DatePicker';
import { Chart } from '../Chart/Chart'
import moment from 'moment';
import DateSwitcher from '../DateSwitcher/DateSwitcher';

export const convertArrCategoriesToObj = categories => categories.reduce(
  (acc, currentValue) => ({ ...acc, [currentValue.id]: currentValue.title }), {});

export const addCategoriesToColumns = (categories, columns) => {
  const updateColumns = [ ...columns ];
  updateColumns[0] = {
    ...updateColumns[0],
    lookup: convertArrCategoriesToObj(categories)
  };
  return updateColumns;
};

export const isValidPurchase = ({ category_id, cost, date }) => (category_id && cost && date) ? true : false;

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

const style = { width: '100%' };

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
      data: [],
      categories: [],
      currentDate: moment().format('YYYY-MM-DD'),
      isLoading: false
    }
  };

  componentDidMount() {
    Promise.all([
      Api.getPurchases(moment().format('YYYY-MM')),
      Api.getCategories()
    ]).then(([purchases, categories]) => {
      this.setState(prevState => ({
        columns: addCategoriesToColumns(categories, prevState.columns),
        data: purchases,
        categories
      }))
    });
  };

  componentDidUpdate(prevProps, prevState) {
    prevState.currentDate !== this.state.currentDate
    ? Api.getPurchases(moment(this.state.currentDate).format('YYYY-MM'))
        .then((purchases) => {
          this.setState(prevState => ({ isLoading: false, data: purchases }));
        }) : null
  }

  onChangeMonthBack = () => this.setState((prevState) => ({
    isLoading: true,
    currentDate: moment(prevState.currentDate).subtract(1, 'month').format('YYYY-MM-DD')
  }));

  onChangeMonthForward = () => this.setState((prevState) => ({
    isLoading: true,
    currentDate: moment(prevState.currentDate).add(1, 'month').format('YYYY-MM-DD')
  }));

  onCreatePurchase = ({ category_id, cost, date = new Date() }) => {
    const newPurchase = { category_id, cost, date };
    return isValidPurchase(newPurchase) ? Api.createPurchase(newPurchase)
      .then(
        receivedData => this.setState(
          prevState => ({ ...prevState, data: [...prevState.data, receivedData] })
        )) : Promise.resolve().then(() => console.log('Error: Please select values')); //should be changed to validation for fields
  };

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
    const { columns, data, categories, isLoading } = this.state;
    return(
      <>
        <DateSwitcher
          onChangeMonthBack={() => isLoading ? null : this.onChangeMonthBack()}
          onChangeMonthForward={() => isLoading ? null : this.onChangeMonthForward()}
          isLoading={isLoading}
        >
          {moment(this.state.currentDate).format('YYYY-MM')}
        </DateSwitcher>
        <br />
        <Chart
          data={data}
          categories={categories}
        />
        <br />
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
      </>
    )
  }
}
