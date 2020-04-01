import Plugin from './Plugin';
import PubSub from '../common/PubSub';
import { DrawEventParams, PluginParamValue, PluginParamName } from '../common/type';
export default class Text extends Plugin {
    constructor();
    name: string;
    iconfont: string;
    title: string;
    params: PluginParamName[];
    defaultParamValue: PluginParamValue;
    shapeName: string;
    transformer: any;
    selectedNode: any;
    removeTextareaBlurModal: () => void;
    addTextareaBlurModal: (stage: any) => void;
    createTextarea: (stage: any, drawLayer: any, transformer: any, textNode: any, pubSub: PubSub) => HTMLTextAreaElement;
    enableTransform: (drawEventParams: DrawEventParams, node: any) => void;
    disableTransform: (drawEventParams: DrawEventParams, node: any, remove?: boolean | undefined) => void;
    onEnter: (drawEventParams: DrawEventParams) => void;
    onClick: (drawEventParams: DrawEventParams) => void;
    onLeave: (drawEventParams: DrawEventParams) => void;
    onNodeRecreate: (drawEventParams: DrawEventParams, node: any) => void;
}
