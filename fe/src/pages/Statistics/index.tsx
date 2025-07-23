import { useState, useEffect } from "react";
import { Card, message } from "antd";
import { PersonalInfo } from "../../types";
import { get } from "../../requests";
import { AxiosResponse } from "axios";
import { BarChart } from "./piechart";

function Statistics() {
  const [infos, setInfos] = useState<PersonalInfo[]>([]);

  const fetchData = async () => {
    const response: AxiosResponse<any, any> | undefined = await get(
      "/api/stu/list"
    );
    if (response !== undefined && response.data.code === 0) {
      const infos: PersonalInfo[] = response.data.list;
      setInfos(infos);
    } else {
      message.error("获取数据失败，用户未登录");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Card
        bodyStyle={{ padding: "20px" }}
        style={{
          marginTop: "20px",
          width: "442px",
          height: "442px",
          borderRadius: "10px",
          boxShadow: "4px 4px 8px #eaeaea",
        }}
      >
        <div style={{ width: "100%", height: "100%", flexDirection: "column", alignItems: "center", justifyItems: "center" }}>
          <BarChart infos={infos} />
        </div>
      </Card>
    </>
  );
}
export default Statistics;
