import React from 'react';
//form 형식으로 database에 정보 보내기 위해
import {post} from 'axios';

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then((response) => {
                console.log(response.data)
            });
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        });
        window.location.reload();
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

    render() {
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: 
                <input 
                    type="file" 
                    name="file" 
                    file={this.state.file} 
                    value={this.state.fileName} 
                    onChange={this.handleFileChange}
                /><br/>
                이름: 
                <input 
                    type="text" 
                    name="userName" 
                    value={this.state.userName} 
                    onChange={this.handleValueChange}
                /><br/>
                생년월일:
                <input 
                    type="text"
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.handleValueChange}
                /><br/>
                성별:
                <input 
                    type="text"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.handleValueChange}
                />
                직업:
                <input 
                    type="text"
                    name="job"
                    value={this.state.job}
                    onChange={this.handleValueChange}
                />
                <button type="submit">추가하기</button>
            </form> 
        )
    }
}

export default CustomerAdd;