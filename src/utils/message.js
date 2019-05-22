/*
 * @Author: james.zhang 
 * @Date: 2019-05-11 15:16:31 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-05-11 15:36:43
 * 消息提示框工具
 */
import {
  message
} from 'antd';

const success = ({
  content = '',
  duration = 1,
  onClose = function () {}
}) => {
  message.success(content,
    duration,
    onClose);
};

const error = ({
  content = '',
  duration = 1,
  onClose = function () {}
}) => {
  message.error(content, duration, onClose);
};

const warning = ({
  content = '',
  duration = 1,
  onClose = function () {}
}) => {
  message.warning(content,
    duration,
    onClose);
};

const info = ({
  content = '',
  duration = 1,
  onClose = function () {}
}) => {
  message.info(content,
    duration,
    onClose);
};

const loading = ({
  content = '',
  duration = 1,
  onClose = function () {}
}) => {
  message.loading(content,
    duration,
    onClose);
};

export default {
  success,
  error,
  warning,
  info,
  loading
}
