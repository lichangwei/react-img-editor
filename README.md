# react-img-editor · 图像编辑器

react-img-editor 是一个图像编辑器 react 组件，支持对图片进行裁剪、涂鸦、文字编辑、马赛克处理等操作，同时支持自定义插件和灵活的样式配置。

![示例](./assets/demo.png)

## 安装

```
npm install react-img-editor -S
```

## 引入

```
import ReactImgEditor from 'react-img-editor'
import 'react-img-editor/assets/index.css'

<ReactImgEditor src="https://www.w3schools.com/html/img_girl.jpg" />
```

## API

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片 url | string | - |
| width | 画板宽度 | number? | 700 |
| height | 画板高度 | number? | 500 |
| style | 画板样式 | React.CSSProperties | - |
| plugins | 自定义的插件 | PluginProps[] | [] |
| toolbar | 工具栏配置 | { items: string[] } | {items: ['pen', 'eraser', 'arrow', 'rect', 'circle', 'mosaic', 'text', 'repeal', 'download', 'crop']} |
| getStage | 获取 KonvaJS 的 [Stage](https://konvajs.org/api/Konva.Stage.html) 对象，可用于下载图片等操作 | (stage: any) => void |
| defaultPluginName | 默认选中的插件名称 | string? | - |

**TODO**

- [ ] 支持绘制元素的移动和删除
- [ ] 支持同一页面多个组件同时存在