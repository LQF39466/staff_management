import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { Card, Avatar, Descriptions, Button } from "antd";
import { BackwardOutlined } from "@ant-design/icons";

import { PersonalInfo, EmptyPersonalInfo } from "../../types";
import { get } from "../../requests";
import { AxiosResponse } from "axios";

const { Meta } = Card;

const Details: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setdata] = useState<PersonalInfo>(EmptyPersonalInfo);

  const fetchData = async () => {
    const response: AxiosResponse<any, any> | undefined = await get(
      "/api/stu/list"
    );
    if (response !== undefined && response.data.code === 0) {
      const infos: PersonalInfo[] = response.data.list;
      const info = infos.find((e: PersonalInfo) => e.uid === params.uid);
      if (info !== undefined) setdata(info);
    } else {
      alert("获取数据错误，请检查登录状态");
    }
  };

  React.useEffect(() => {
    fetchData();
  });

  const handelClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Card
        style={{
          borderRadius: "10px",
          boxShadow: "4px 4px 8px #eaeaea",
        }}
      >
        <Meta avatar={<Avatar src={data.avatar} />} title={data.name} />
        <Descriptions
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          style={{ marginTop: "25px" }}
        >
          <Descriptions.Item label="性别">{data.gender}</Descriptions.Item>
          <Descriptions.Item label="专业">{data.major}</Descriptions.Item>
          <Descriptions.Item label="年级">{data.grade}</Descriptions.Item>
          <Descriptions.Item label="电话">{data.phone}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{data.mail}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Button
        key="addItem"
        shape="round"
        icon={<BackwardOutlined />}
        style={{
          marginTop: "20px",
          boxShadow: "4px 4px 8px #eaeaea",
        }}
        onClick={handelClick}
      >
        返回
      </Button>
    </>
  );
};
export default Details;
