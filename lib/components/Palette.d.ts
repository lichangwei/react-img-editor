import React from 'react';
import { EditorContextProps } from './EditorContext';
interface PaletteProps extends EditorContextProps {
    height: number;
    imageObj: HTMLImageElement;
    getStage?: (stage: any) => void;
}
declare const _default: React.ForwardRefExoticComponent<Pick<React.PropsWithChildren<PaletteProps>, "height" | "children" | "imageObj" | "getStage"> & React.RefAttributes<React.Component<PaletteProps, any, any>>>;
export default _default;
