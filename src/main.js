import notification from './Notification';

notification.announce('init again');
notification.log('init');

class Form {
  constructor() {
    alert('I am Form');
  }
}

new Form();

require('./styles.css');

// require('./main.css');

// require('./main.scss');