import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomerAdd from './components/CustomerAdd';

const styles = theme => ({
  root : {
    width : '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX : 'auto'
  },
  table : {
    minWidth : 1080
  },
  progress : {
    margin : theme.spacing.unit * 2,
  }
})

class App extends Component {

  // api로부터 받아오는 데이터는 비동기처리이기 때문에 변할 수 있으므로 state로 처리하는 것이 옳다.
  constructor(props){
    super(props)

    this.state = {
      customers: '',
      completed: 0
    }
  }
  
  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });
    this.callApi()
      .then(res => this.setState({ customers : res }))
      .catch(err => console.log(err));
  };

  //모두 마운트 되고 나서 api호출하는 방식, 프록시 설정 후 서버 다시 시작해야된다.
  //네트워크 검사는 3000번이지만 실제로는 5000번 접근으로 하는 것이다.
  componentDidMount() {
    //progress loading
    this.timer = setInterval(this.progress, 20);
    //call api
    this.callApi()
      .then(res => this.setState({ customers : res }))
      .catch(err => console.log(err));
  }


  //exit progress
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>아이디</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { this.state.customers ?
                this.state.customers.map(c => {
                  return(
                    <Customer
                      stateRefresh={this.stateRefresh}
                      key={c.id}
                      id={c.id}
                      image={c.image}
                      name={c.name}
                      birthday={c.birthday}
                      gender={c.gender}
                      job={c.job}
                    />
                  )
                })
              : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={this.state.completed}
                  />
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

export default withStyles(styles)(App);
