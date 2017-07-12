import notification from './Notification';

notification.announce('init');
notification.log('init');

class Form {
  constructor() {
    alert('I am Form');
  }
}

new Form();

require('./main.css');