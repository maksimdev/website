import React from 'react';
import MaterialTable from 'material-table';
import { Api } from '../../api/Api';
import MaterialUIPickers from '../DatePicker/DatePicker';

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

export default class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns:
        [
          {
            title: 'Категория',
            field: 'category_id',
            lookup: {
              1: 'Продукты',
              2: 'Кредиты',
              3: 'Косметика',
              4: 'Медицина',
              5: 'Кот',
              6: 'Комуналка',
              7: 'Связь',
              8: 'Транспорт',
              9: 'Подарки',
              10: 'Рестораны',
              11: 'Игры',
              12: 'Автомобиль',
              13: 'Развлечения',
              14: 'Быт.химия',
              15: 'Одежда',
              16: 'Доставка',
              17: '"В карман"',
              18: 'Всё для дома',
              19: 'Техника '
            }
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
    Api.getList().then((data)=>{
      this.setState({ data })
    })
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
    return(
      <MaterialTable
        style={{ width: '50%' }}
        title="Расходы"
        columns={ this.state.columns }
        data={ this.state.data }
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
