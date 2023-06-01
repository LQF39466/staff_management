import { useState, forwardRef, useImperativeHandle } from "react";

import { Button, Modal, Form, Input, Select, message } from "antd";

import * as uuid from "uuid";

import { PersonalInfo, EmptyPersonalInfo } from "../../types";
import { post } from "../../requests";
import { AxiosResponse } from "axios";

interface EditModalProps {
  data: PersonalInfo[];
  refresh: () => void;
}

const { Option } = Select;

export type EditModalRef = {
  showModal(uid: string): void;
};

const EditModal = forwardRef((props: EditModalProps, ref) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<PersonalInfo>(EmptyPersonalInfo);
  const [newItem, setNewItem] = useState<boolean>(false); //用于区分新增和更新
  const [form] = Form.useForm();

  const showModal = (uid: string) => {
    const newInfo = props.data.find((e: PersonalInfo) => e.uid === uid);
    if (newInfo !== undefined) {
      setInfo(newInfo);
      setNewItem(false);
    } else {
      setInfo(EmptyPersonalInfo);
      setNewItem(true);
    }
    form.resetFields();
    setOpen(true);
  };

  const handleOk = async (values: PersonalInfo) => {
    let response: AxiosResponse<any, any> | undefined;
    if (newItem) {
      values.uid = uuid.v4();
      console.log("post create", values);
      response = await post("/api/stu/create", JSON.stringify(values));
    } else {
      values.uid = info.uid;
      console.log("post update", values);
      response = await post("/api/stu/update", JSON.stringify(values));
    }
    if (response !== undefined) {
      message.info(response.data.message);
    }
    setOpen(false);
    props.refresh();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  //利用ImperativeHandle暴露showModal方法
  useImperativeHandle(ref, () => {
    return { showModal };
  });

  return (
    <>
      <Modal
        open={open}
        title="编辑用户信息"
        onCancel={handleCancel}
        destroyOnClose
        footer={[]}
      >
        <Form
          name="edit"
          wrapperCol={{ span: 24 }}
          autoComplete="off"
          form={form}
          onFinish={handleOk}
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名" }]}
            initialValue={info.name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="专业"
            name="major"
            rules={[{ required: true, message: "请输入专业" }]}
            initialValue={info.major}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="年级"
            name="grade"
            rules={[{ required: true, message: "请输入年级" }]}
            initialValue={info.grade}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="性别"
            name="gender"
            rules={[{ required: true, message: "请选择性别" }]}
            initialValue={info.gender}
          >
            <Select placeholder="请选择性别">
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="电话"
            name="phone"
            rules={[
              { required: true, message: "请输入电话" },
              { type: "string", len: 11 },
            ]}
            initialValue={info.phone}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="mail"
            rules={[
              { required: true, message: "请输入邮箱" },
              { type: "email" },
            ]}
            initialValue={info.mail}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="头像"
            name="avatar"
            rules={[
              { required: true, message: "请输入头像URL" },
              { type: "url" },
              { type: "string", min: 6 },
            ]}
            initialValue={info.avatar}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button key="submit" type="primary" htmlType="submit" block={true}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});
export default EditModal;
