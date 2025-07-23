import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";

import {
  Button,
  Space,
  Input,
  Table,
  Tag,
  Dropdown,
  MenuProps,
  Card,
  Avatar,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  SettingOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import EditModal, { EditModalRef } from "../EditModal";
import { ConfirmModalDelete } from "../ConfirmModal";
import { PersonalInfo } from "../../types";
import { get } from "../../requests";
import { AxiosResponse } from "axios";

const { Search } = Input;

const DataList: React.FC = () => {
  const editModalRef = useRef<EditModalRef>(null);
  const [data, setdata] = useState<PersonalInfo[]>([]);
  const [filteredData, setFilteredData] = useState<PersonalInfo[]>([]);
  const [refreshSignal, setRefreshSignal] = useState<Boolean>(false); //刷新控制
  const refresh = () => setRefreshSignal(!refreshSignal);

  const fetchData = async () => {
    const response: AxiosResponse<any, any> | undefined = await get(
      "/api/stu/list"
    );
    if (response !== undefined && response.data.code === 0) {
      const infos: PersonalInfo[] = response.data.list;
      setdata(infos);
      setFilteredData(infos);
    } else {
      message.error("获取数据失败，用户未登录");
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [refreshSignal]);

  const columns: ColumnsType<PersonalInfo> = [
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record) => <Avatar src={record.avatar} />,
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a.name > b.name ? -1 : 1),
    },
    {
      title: "专业",
      dataIndex: "major",
      key: "major",
      sorter: (a, b) => (a.major > b.major ? -1 : 1),
    },
    {
      title: "年级",
      dataIndex: "grade",
      key: "grade",
      sorter: (a, b) => (a.grade > b.grade ? -1 : 1),
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "男", value: "男" },
        { text: "女", value: "女" },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.gender === value,
      render: (gender: string) => (
        <>
          {gender === "男" ? (
            <Tag color="geekblue">男</Tag>
          ) : gender === "女" ? (
            <Tag color="volcano">女</Tag>
          ) : (
            <Tag color="red">错误</Tag>
          )}
        </>
      ),
    },
    {
      title: "手机",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) =>
        [record.uid].map((uid) => {
          const items: MenuProps["items"] = [
            {
              key: "check_" + uid, //在key中加入uid，方便后续获取
              icon: <EyeOutlined />,
              label: <Link to={"details/" + uid}>查看</Link>, //需要路由跳转，故用Link
            },
            {
              key: "edit_" + uid,
              icon: <EditOutlined />,
              label: <div>编辑</div>,
            },
            {
              key: "delete_" + uid,
              icon: <DeleteOutlined />,
              label: <div>删除</div>,
            },
          ];
          return (
            <Dropdown
              menu={{ items, onClick }}
              placement="bottom"
              overlayStyle={{ boxShadow: "2px 2px 8px #eaeaea" }}
            >
              <Button
                shape="round"
                icon={<SettingOutlined />}
                style={{ boxShadow: "2px 2px 8px #eaeaea" }}
              ></Button>
            </Dropdown>
          );
        }),
    },
  ];
  const onClick: MenuProps["onClick"] = ({ key }) => {
    const info = key.split("_"); //切分Key，获得菜单条目名称和uid
    if (info[0] === "delete") ConfirmModalDelete(info[1], refresh);
    else if (info[0] === "edit") handleEdit(info[1]);
  };

  const handleAdd = () => {
    //添加用户按钮的onClick事件，只打开modal，不需要修改值
    if (editModalRef.current !== null) editModalRef.current.showModal("");
  };
  const handleEdit = (uid: string) => {
    //编辑按钮的onClick事件，打开model，同时传入uid
    if (editModalRef.current !== null) editModalRef.current.showModal(uid);
  };

  const onSearch = (value: string) => {
    if (value !== "")
      setFilteredData(
        data.filter((e: PersonalInfo) => e.name.toLowerCase().includes(value.toLowerCase()))
      );
  };
  const handleReset = () => {
    setFilteredData(data);
  };

  return (
    <>
      <EditModal data={data} refresh={refresh} ref={editModalRef} />
      <Space style={{ display: "flex" }} size="large">
        <Button
          key="addItem"
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          style={{
            boxShadow: "4px 4px 8px #eaeaea",
          }}
          onClick={handleAdd}
        >
          添加用户
        </Button>
        <Search
          key="searcher"
          placeholder="搜索姓名"
          enterButton
          style={{
            width: "250px",
            boxShadow: "4px 4px 8px #eaeaea",
          }}
          onSearch={onSearch}
          allowClear
        />
        <Button
          key="addItem"
          style={{
            boxShadow: "4px 4px 8px #eaeaea",
          }}
          onClick={handleReset}
        >
          重置搜索
        </Button>
      </Space>
      <Card
        bodyStyle={{ paddingTop: "4px", paddingBottom: "8px" }}
        style={{
          marginTop: "20px",
          borderRadius: "10px",
          boxShadow: "4px 4px 8px #eaeaea",
        }}
      >
        <Table
          key="table"
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          dataSource={filteredData}
          style={{ paddingTop: "20px" }}
          bordered
        />
      </Card>
    </>
  );
};
export default DataList;
