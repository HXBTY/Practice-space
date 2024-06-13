import Space from "./index";
import "./index.scss";
import { ConfigProvider } from "./ConfigProvider";

export default function App() {
  return <>
    {/*<Space*/}
    {/*  direction="vertical"*/}
    {/*  className="container"*/}
    {/*  wrap={true}*/}
    {/*  align="end"*/}
    {/*  size={["large", "small"]}*/}
    {/*>*/}
    {/*  <div className="box">Lorem ipsum dolor sit.</div>*/}
    {/*  <div className="box">Corporis incidunt officia veniam.</div>*/}
    {/*  <div className="box">Deserunt labore perspiciatis reiciendis.</div>*/}
    {/*  <div className="box">Deleniti dignissimos repellat vitae.</div>*/}
    {/*  <div className="box">Impedit ipsam iure quibusdam?</div>*/}
    {/*  <div className="box">Corporis quidem reprehenderit totam?</div>*/}
    {/*  <div className="box">Accusantium deleniti praesentium suscipit.</div>*/}
    {/*  <div className="box">Eligendi itaque natus similique!</div>*/}
    {/*  <div className="box">Cum dolor ducimus reiciendis.</div>*/}
    {/*</Space>*/}
    <ConfigProvider space={{ size: 20 }}>
      <Space direction="horizontal">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </Space>
      <Space direction="vertical">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </Space>
    </ConfigProvider>
  </>;


}