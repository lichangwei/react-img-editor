import Plugin from './plugins/Plugin';
import React from 'react';
import { ITranslate } from './common/type';
interface ReactImageEditorProps {
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    plugins?: Plugin[];
    toolbar?: {
        items: string[];
    };
    src: string;
    getStage?: (stage: any) => void;
    defaultPluginName?: string;
    t: ITranslate;
}
declare function ReactImageEditor(props: ReactImageEditorProps): JSX.Element;
declare namespace ReactImageEditor {
    var defaultProps: Partial<ReactImageEditorProps>;
}
export default ReactImageEditor;
