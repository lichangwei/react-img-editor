
import { DrawEventParams } from '../common/type'
import Plugin from './Plugin'
import { i18n } from '../common/utils';

export default class Download extends Plugin {
  constructor(){
    super();
    this.title = i18n.t(`image.editor.plugin.${this.name}`)
  }
  name = 'download'
  iconfont = 'iconfont icon-download'
  title = '下载图片'

  onEnter = (drawEventParams: DrawEventParams) => {
    const {stage, pixelRatio} = drawEventParams
    // 延迟下载，等触发 plugin 的 onLeave 生命周期，清除未完成的现场
    setTimeout(() => {
      const canvas = stage.toCanvas({ pixelRatio })
      canvas.toBlob(function(blob: any) {
        const link = document.createElement('a')
        link.download = ''
        link.href = URL.createObjectURL(blob)
        link.click()
      }, 'image/jpeg')
    }, 100)
  }
}