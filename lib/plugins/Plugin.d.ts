import { DrawEventParams, PluginParamName, PluginParamValue, ITranslate } from '../common/type';
export default abstract class Plugin {
    abstract name: string;
    abstract iconfont: string;
    abstract title: string;
    t: ITranslate;
    params?: PluginParamName[];
    defaultParamValue?: PluginParamValue;
    shapeName?: string;
    onEnter?: (params: DrawEventParams) => void;
    onDrawStart?: (params: DrawEventParams) => void;
    onClick?: (params: DrawEventParams) => void;
    onDraw?: (params: DrawEventParams) => void;
    onDrawEnd?: (params: DrawEventParams) => void;
    onLeave?: (params: DrawEventParams) => void;
    onNodeRecreate?: (params: DrawEventParams, node: any) => void;
}
