import { message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { post } from "../../requests";
import { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";

const { confirm } = Modal;

export const ConfirmModalLogout = (navigate: NavigateFunction) => {
  confirm({
    title: "确定退出登录吗",
    icon: <ExclamationCircleOutlined />,
    onOk() {
      console.log("OK");
      postLogout(navigate);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

export const ConfirmModalDelete = (uid: string, refresh: () => void) => {
  confirm({
    title: "确定删除该条目吗",
    icon: <ExclamationCircleOutlined />,
    content: "此操作不可逆",
    onOk() {
      postItemDel(uid, refresh);
    },
  });
};

const postLogout = async (navigate: NavigateFunction) => {
  const response: AxiosResponse<any, any> | undefined = await post(
    "/api/user/logout",
    ""
  );
  if (response !== undefined && response.data.code === 0) {
    message.info("退出登录成功");
    navigate("/");
  }
};

const postItemDel = async (uid: string, refresh: () => void) => {
  const response: AxiosResponse<any, any> | undefined = await post(
    "api/stu/delete",
    JSON.stringify({ uid: uid })
  );
  if (response !== undefined && response.data.code === 0) {
    message.info("删除数据成功");
    refresh();
  }
};
