import { IconAdd } from "./Icons/iconAdd";
import { IconEmail } from "./Icons/iconEmail";
import { CreateIconfont } from "./createIconfont";

const Iconfont = CreateIconfont("//at.alicdn.com/t/c/font_2719699_1e3d0146r0f.js")

function IconShow() {
  return (
    <div style={{ padding: "50px" }}>
      <IconAdd size="40px" />
      <IconEmail spin style={{ color: "skyblue", fontSize: "40px" }} />
      {/* 只有在字体加载完成后才渲染 Iconfont 组件 */}
      <Iconfont type="icon-quanping" fill="blue" size="40px" />
    </div>
  );
}

export default IconShow;
