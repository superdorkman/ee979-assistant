import MQTT from 'mqtt';
import axios from 'axios';
import { API_URL } from '../constants/url';
import { store } from '../index';

const groupId = 'GID_ee979';
let client;
let clientId;
let topic;

const connect = (memberSN, token, num = 1) => {
  clientId = `${groupId}@@@${memberSN}${num}`;
  topic = `ee979/${memberSN}`;
  const message = JSON.stringify({ token, type: 'R' });
  const opts = {
    clientId,
    keepAliveInterval: 60,
    useSSL: true
  };
  client = MQTT.connect("wss://post-cn-4590blc8609.mqtt.aliyuncs.com:443", opts);

  client.on('connect', function () {
    console.log('connected');
    client.publish('$SYS/uploadToken', message);
    client.subscribe(topic, { dup: true });
  });

  client.on('message', function (topic, message) {
    message = message.toString();
    const { type } = JSON.parse(message);
    if (type === 'freeChat') return;
    console.log('message arrived', message);
    store.dispatch({
      type: 'SET_MSG',
      msg: message
    });
  });

  client.on('close', function () {
    console.log('disconnected');
  });
}

const initMqtt = () => {
  axios.get('Members/getMqttToken')
    .then(res => {
      const { data } = res.data;
      if (data) {
        const { memberSN, token, num } = data;
        connect(memberSN, token, num);
        store.dispatch({ type: 'SET_CHATSN', sn: memberSN });
      }
    }).catch(err => { 
      // initMqtt() 
    });
}

export default initMqtt;
