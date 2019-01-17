import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../actions/app';
import { API_URL } from '../../constants/url';
import { Container, IptWrap, Submit, Top, Ctrls, Bottom, } from './Login.styled';
import Loading from '../libs/loading/Loading';
import logo from '../../assets/images/assistant.png';
import svgIcons from '../../assets/icons/icons.svg';

import UsernameIcon from '../common/icons/Username';
import PasswordIcon from '../common/icons/Password';
import LineIcon from '../common/icons/Line';
import CloseIcon from '../common/icons/Close';

const { ipcRenderer } = window.require('electron');

export class Login extends Component {

  state = {
    password: '',
    isSubmitting: false,
    username: '',
  }

  componentWillMount() {
    this.setState({
      username: localStorage.getItem('username') || '',
      password: localStorage.getItem('password') || '',
    })
  }

  handleIptChange(label, event) {
    this.setState({ [label]: event.target.value });
  }

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleLogin();
    }
  }

  handleLogin = () => {
    const { username, password } = this.state;
    if (!username || !password) return;
    this.setState({ isSubmitting: true });

    const body = {
      name: username,
      password,
      isAssistant: true,
    };
    
    axios.post('Members/loginx', body)
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            // sessionStorage.session = JSON.stringify(data);
            ipcRenderer.send('auth:login', data);
            // this.props.login(data);
            // this.props.history.replace('/');
          } else if (error) {
            this.setState({ isSubmitting: false });
            alert(error);
          }
        }
      ).catch(err => { this.setState({ isSubmitting: false }); });
  }

  handleCtrlClick(type) {
    ipcRenderer.send(`app:${type}`, {});
  }

  render() {
    const { password, username, isSubmitting } = this.state;

    return (
      <Container>
        <Top>
          <img src={logo} />
          <Ctrls>
            <li onClick={() => this.handleCtrlClick('extract')}>
              <LineIcon />
            </li>
            <li className="close" onClick={() => this.handleCtrlClick('close')}>
              <CloseIcon />
            </li>
          </Ctrls>
        </Top>
        <Bottom>
          <IptWrap>
            <div className="icon">
              <UsernameIcon />
            </div>
            <input value={username} onChange={(e) => this.handleIptChange('username', e)} />
            <span className="line"></span>
          </IptWrap>
          <IptWrap>
            <div className="icon">
              <PasswordIcon />  
            </div>
            <input value={password} type="password" 
              onKeyDown={this.handleKeyDown}
              onChange={(e) => this.handleIptChange('password', e)} />
            <span className="line"></span>
          </IptWrap>
          <Submit onClick={this.handleLogin} disabled={isSubmitting}>
            {isSubmitting ? <Loading name="circle" fill="#fff" /> : '登录'}
          </Submit>
        </Bottom>
        
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (session) => dispatch(login(session))
});

export default connect(null, mapDispatchToProps)(Login);
