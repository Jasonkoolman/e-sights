export const API_KEY = 'AIzaSyAAtTTZhVAZeRvFwFee8YqFd4ejvYo0lX0';

export const API_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed';

export const RESOURCE_TYPES = [
  {label: 'JavaScript', field: 'javascriptResponseBytes', color: 'rgba(255, 206, 86, 0.4)'},
  {label: 'Images', field: 'imageResponseBytes', color: 'rgba(89, 178, 0, 0.4)'},
  {label: 'CSS', field: 'cssResponseBytes', color: 'rgba(0, 133, 178, 0.4)'},
  {label: 'HTML', field: 'htmlResponseBytes', color: 'rgba(255, 99, 132, 0.4)'},
  {label: 'Flash', field: 'flashResponseBytes', color: 'rgba(231, 77, 49, 0.4)'},
  {label: 'Text', field: 'textResponseBytes', color: 'rgba(28, 96, 177, 0.4)'},
  {label: 'Other', field: 'otherResponseBytes', color: 'rgba(255, 255, 255, 0.4)'},
];

export const RESULT_MESSAGES = [
  {threshold: 90, text: 'There is no such thing as perfection, is there?'},
  {threshold: 75, text: 'This is a good score. Are your proud? You should be.'},
  {threshold: 50, text: 'Not bad, but there is room for improvement.'},
  {threshold: 25, text: 'The website\'s performance needs improvement.'},
  {threshold: 0, text: 'The website\'s performance is very poor'}
];
