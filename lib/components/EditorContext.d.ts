import React from 'react';
import Plugin from '../plugins/Plugin';
import { PluginParamValue } from '../common/type';
export interface EditorContextProps {
    containerWidth: number;
    containerHeight: number;
    plugins: Plugin[];
    toolbar: {
        items: string[];
    };
    currentPlugin: Plugin | null;
    handlePluginChange: (plugin: Plugin) => void;
    paramValue: PluginParamValue | null;
    handlePluginParamValueChange: (paramValue: PluginParamValue) => void;
    toolbarItemConfig: any;
    updateToolbarItemConfig: (config: any) => void;
}
export declare const EditorContext: React.Context<EditorContextProps>;
export declare const withEditorContext: <P extends EditorContextProps>(WrappedComponent: React.ComponentClass<P, any>) => React.ForwardRefExoticComponent<React.PropsWithoutRef<Pick<React.PropsWithChildren<P>, "children" | Exclude<keyof P, "toolbar" | "paramValue" | "plugins" | "containerWidth" | "containerHeight" | "currentPlugin" | "handlePluginChange" | "handlePluginParamValueChange" | "toolbarItemConfig" | "updateToolbarItemConfig">>> & React.RefAttributes<React.Component<P, any, any>>>;
