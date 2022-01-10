import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Modal, Button, Avatar, Typography,Card,Checkbox,Select } from 'antd';
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import '../static/css/login.css';
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
  return (
      <Modal title="Basic Drawer" visible={visible} onOk={onOk} onCancel={onCancel}>
        <Form form={form}  name="userForm"    labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <Form.Item name="register_login_id" label="账号"
                rules={[
                        {
                        required: true, message: '请输入邮箱/手机号!' 
                        },
                    ]}
                >
                <Input />
            </Form.Item>
            <Form.Item name="register_username" label="姓名"
                rules={[
                        {
                        required: true, message: '请输入邮箱/手机号!' 
                        },
                    ]}
                >
                <Input />
            </Form.Item>
            <Form.Item name="register_sex" label="性别" rules={[{ required: true }]}>
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
                    required: true,message: '请输入密码!' 
                    },
                ]}
                >
                <Input.Password />
            </Form.Item>
            <Form.Item
                  label="确认密码"
                  name="confirm_password"
                  rules={[{ required: true, message: '请再次确认密码！' }]}
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
            onFormFinish={(name, { values, forms }) => {
                if (name === 'userForm') {
                const { basicForm } = forms;
                const users = basicForm.getFieldValue('users') || [];
                basicForm.setFieldsValue({
                    users: [...users, values],
                });
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
                <Form.Item
                label="User List"
                shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
                >
                {({ getFieldValue }) => {
                    const users = getFieldValue('users') || [];
                    return users.length ? (
                    <ul>
                        {users.map((user, index) => (
                        <li key={index} className="user">
                            <Avatar icon={<UserOutlined />} />
                            {user.name} - {user.age}
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <Typography.Text className="ant-form-text" type="secondary">
                        ( <SmileOutlined /> No user yet. )
                    </Typography.Text>
                    );
                }}
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
