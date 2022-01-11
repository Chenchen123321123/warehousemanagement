import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Modal, Button,Card,Checkbox,Select } from 'antd';
import '../static/css/login.css';
import md5 from 'js-md5';
import http from '../utils/server';
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};
const { Option } = Select;
// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);// eslint-disable-line react-hooks/exhaustive-deps
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);// eslint-disable-line react-hooks/exhaustive-deps
};

const ModalForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    visible,
  });
  const onOk = () => {
    form.submit();
  };
  //验证登录名
  const loginidValidator = (rule, value, callback) => {
    const validatorEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    const validatorTell = /1[0-9]{10}/;
    if (value) {
      if (validatorTell.test(value) || validatorEmail.test(value)) { 
        return Promise.resolve()
      } else {
        return Promise.reject('请输入正确的手机号码或者邮箱！');
      }
    } else {
      //这里的callback函数会报错
    }
  }
  //验证密码
  const confirmPasswordValidator = (rule, value, callback) => {
    const { getFieldValue } = form;
    let password = getFieldValue('password');
    if (value) {
      if (password===value) { 
        return Promise.resolve()
      } else {
        return Promise.reject('两次输入的密码不一致！');
      }
    } else {
      return Promise.reject('请再次输入密码！');
    }
  }
   //验证密码
   const passwordValidator = (rule, value, callback) => {
    if (value) {
      return Promise.resolve()
    } else {
      return Promise.reject('请输入密码！');
    }
  }
  return (
      <Modal title="Basic Drawer" visible={visible} onOk={onOk} onCancel={onCancel}  okText="注册" cancelText="取消">
        <Form form={form}  name="userForm"    labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <Form.Item name="register_login_id" label="账号"
                rules={[
                        {
                        required: true, message: '请输入邮箱/手机号!' 
                        }, {
                          validator: loginidValidator
                        }
                    ]}
                >
                <Input />
            </Form.Item>
            <Form.Item name="register_username" label="姓名"
                rules={[
                        {
                        required: true, message: '请输用户姓名!' 
                        }
                    ]}
                >
                <Input />
            </Form.Item>
            <Form.Item name="register_sex" label="性别" rules={[{ required: true, message: '请选择性别!'  }]}>
                  <Select
                    placeholder="请选择性别"
                    allowClear
                  >
                    <Option value="0">男</Option>
                    <Option value="1">女</Option>
                  </Select>
            </Form.Item>
            <Form.Item name="password" label="密码"
                rules={[
                    {
                        validator: passwordValidator
                    },
                ]}
                >
                <Input.Password />
            </Form.Item>
            <Form.Item
                  label="确认密码"
                  name="confirm_password"
                  rules={[ 
                    {
                    validator: confirmPasswordValidator
                    }
                  ]}
                >
                  <Input.Password />
            </Form.Item>
        </Form>
    </Modal>
  );
};

const Login = () => {
  const [visible, setVisible] = useState(false);

  const onRegister = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log('Finish:', values);
  };

  return (
    <div className="login-form">
        <Card title="登录" style={{ width: 400 }}>
            <Form.Provider
            onFormFinish={async (name, { values, forms }) => {
                if (name === 'userForm') {
                  let params = values;
                  params.password = md5(values.password);
                  const res = await http.post('/register',params);
                  console.log(res);
                  setVisible(false);
                }
            }}
            >
            <Form {...layout} name="basicForm" onFinish={onFinish}>
                <Form.Item
                name="login_id"
                label="账号"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
                    <Checkbox>记住密码</Checkbox>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button htmlType="submit" type="primary" className='button_submit'>
                        登录
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 13, span: 16 }}>
                    <Button type = "link" htmlType="button"  size="default" className="button-register" onClick={onRegister}>
                    没有账号？去注册
                    </Button>
                </Form.Item>
            </Form>

            <ModalForm visible={visible} onCancel={hideUserModal} />
            </Form.Provider>
        </Card>
    </div>
  );
};

export default Login;
