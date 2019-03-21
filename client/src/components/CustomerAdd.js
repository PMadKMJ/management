import React from 'react';
//form 형식으로 database에 정보 보내기 위해
import {post} from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden : {
        display : 'none'
    }
})

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }
    }

    //비동기적으로 처리하는 것이고 순서대로 처리한다는 것을 확신할 수 없기 때문에 .then 뒤에 나와야 한다.
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            });
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });
    }

    handleFileChange = (e) => {
        //Target은 이벤트가 일어난 input 값 그 자체이므로[0]이 필요하다.
        console.log(e.target);
        this.setState({
            file : e.target.files[0],
            fileName : e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        console.log(nextState);   
    }

    //server에 데이터 전송
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        //데이터베이스에 열과 이름 같게 해야한다.
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        //http 형식에 맞게 보내야한다. 그래서 데이터 타입을 정해야함
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        }
        //해당 url에 formData를 config 형식에 맞게 제출
        return post(url, formData, config)
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open:false
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                고객추가하기
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                <input
                    className={classes.hidden}
                    accept="image/"
                    id="raised-button-file"
                    type="file" 
                    name="file" 
                    file={this.state.file} 
                    value={this.state.fileName} 
                    onChange={this.handleFileChange}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" color="primary" component="span" name="file">
                        {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                    </Button>
                </label>
                <br/>
                <TextField
                    label="이름"
                    type="text" 
                    name="userName" 
                    value={this.state.userName} 
                    onChange={this.handleValueChange}
                /><br/>
                <TextField
                    label="생년월일" 
                    type="text"
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.handleValueChange}
                /><br/>
                <TextField
                    label="성별" 
                    type="text"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.handleValueChange}
                /><br/>
                <TextField
                    label="직업" 
                    type="text"
                    name="job"
                    value={this.state.job}
                    onChange={this.handleValueChange}
                />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>
                        추가
                    </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
            </div>
            // <form onSubmit={this.handleFormSubmit}>
            //     <h1>고객 추가</h1>
            //     프로필 이미지: 
            //     <input 
            //         type="file" 
            //         name="file" 
            //         file={this.state.file} 
            //         value={this.state.fileName} 
            //         onChange={this.handleFileChange}
            //     /><br/>
            //     이름: 
            //     <input 
            //         type="text" 
            //         name="userName" 
            //         value={this.state.userName} 
            //         onChange={this.handleValueChange}
            //     /><br/>
            //     생년월일:
            //     <input 
            //         type="text"
            //         name="birthday"
            //         value={this.state.birthday}
            //         onChange={this.handleValueChange}
            //     /><br/>
            //     성별:
            //     <input 
            //         type="text"
            //         name="gender"
            //         value={this.state.gender}
            //         onChange={this.handleValueChange}
            //     />
            //     직업:
            //     <input 
            //         type="text"
            //         name="job"
            //         value={this.state.job}
            //         onChange={this.handleValueChange}
            //     />
            //     <button type="submit">추가하기</button>
            // </form> 
        )
    }
}

export default withStyles(styles)(CustomerAdd);