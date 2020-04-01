import React from 'react'
import { prefixCls } from '../../common/constants'
import { i18n } from '../../common/utils'

interface FontSizeSettingProps {
  value?: number;
  onChange: (fontSize: number) => void;
}

export default function FontSizeSetting(props: FontSizeSettingProps) {
  return (
    <span style={{ margin: '0 8px' }}>
      <button
        className={`${prefixCls}-font-size ${props.value === 12 ? prefixCls + '-font-size-activated' : ''}`}
        onClick={() => props.onChange(12)}
  >{i18n.t('image.editor.font.size.small')}</button>
      <button
        className={`${prefixCls}-font-size ${props.value === 16 ? prefixCls + '-font-size-activated' : ''}`}
        onClick={() => props.onChange(16)}
      >{i18n.t('image.editor.font.size.medium')}</button>
      <button
        className={`${prefixCls}-font-size ${props.value === 20 ? prefixCls + '-font-size-activated' : ''}`}
        onClick={() => props.onChange(20)}
      >{i18n.t('image.editor.font.size.big')}</button>
    </span>
  )
}