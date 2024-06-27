import CopyToClipboard from "./index";

export default function App() {
  return <CopyToClipboard text={"猜猜我是谁"} onCopy={() => {
    console.log("done");
  }} >
    <div onClick={() => {alert("复制成功")}}>点我复制</div>
  </CopyToClipboard>
}