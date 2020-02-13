import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import { Api } from '../../api/Api'
import './styles.css';


export default class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      rows: [],
      isLoading: true,
    };
  }
  
  componentDidMount() {
    Api.getList().then((data)=>{
      this.setState({rows: data, isLoading: false})
  })}
  
  render() {
    const rows= this.state.rows;
    return (  
      <div className="container">
        {this.state.isLoading ? <div className="spinerContainer"><CircularProgress size={80} /></div> :
          <div className="tableWrapper">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="tableHeader">
                    <TableCell>Категория</TableCell>
                    <TableCell align="right">Сумма</TableCell>
                    <TableCell align="right">Дата</TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                      {row.category}
                      </TableCell>
                      <TableCell align="right">{row.cost}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                    </TableRow>
                      )
                    ) 
                  }
                </TableBody>              
            </Table>
          </TableContainer>
          {/* <br />
          <Button variant="outlined" color="primary">Добавить</Button> */}
        </div>    
        }
      </div>
    )
  }
}

// import React from 'react';
// import MaterialTable from 'material-table';

// export default function MaterialTableDemo() {
//   const [state, setState] = React.useState({
//     columns: [
//       { title: 'Каткгория', field: 'category' },
//       { title: 'Сумма', field: 'cost', type: 'numeric' },
//       { title: 'Дата', field: 'date', type: 'numeric' },
//     ],
//     data: [
//         {id: 1, cost: 100, category: 'Продукты', date: ' 02/08/2020'},
//         {id: 2, cost: 200, category: 'Развлечения', date: ' 01/08/2020'}
//     ],
//   });

//   return (
//     <div className="tableWrapper">
//       <MaterialTable
//         iconProps={DeleteIcon}
//         title="Расходы"
//         columns={state.columns}
//         data={state.data}
//         editable={{
//           onRowAdd: newData =>
//             new Promise(resolve => {
//               setTimeout(() => {
//                 resolve();
//                 setState(prevState => {
//                   const data = [...prevState.data];
//                   data.push(newData);
//                   return { ...prevState, data };
//                 });
//               }, 600);
//             }),
//           onRowUpdate: (newData, oldData) =>
//             new Promise(resolve => {
//               setTimeout(() => {
//                 resolve();
//                 if (oldData) {
//                   setState(prevState => {
//                     const data = [...prevState.data];
//                     data[data.indexOf(oldData)] = newData;
//                     return { ...prevState, data };
//                   });
//                 }
//               }, 600);
//             }),
//           onRowDelete: oldData =>
//             new Promise(resolve => {
//               setTimeout(() => {
//                 resolve();
//                 setState(prevState => {
//                   const data = [...prevState.data];
//                   data.splice(data.indexOf(oldData), 1);
//                   return { ...prevState, data };
//                 });
//               }, 600);
//             }),
//         }}
//       />
//     </div>
//   );
// }