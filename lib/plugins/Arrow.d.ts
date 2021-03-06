import Plugin from './Plugin';
import { DrawEventParams, PluginParamName, PluginParamValue } from '../common/type';
export default class Arrow extends Plugin {
    constructor();
    name: string;
    iconfont: string;
    title: string;
    params: PluginParamName[];
    defaultParamValue: PluginParamValue;
    shapeName: string;
    lastArrow: any;
    transformer: any;
    selectedNode: any;
    isPaint: boolean;
    started: boolean;
    startPoints: number[];
    enableTransform: (drawEventParams: DrawEventParams, node: any) => void;
    disableTransform: (drawEventParams: DrawEventParams, node: any, remove?: boolean | undefined) => void;
    onEnter: (drawEventParams: DrawEventParams) => void;
    onClick: (drawEventParams: DrawEventParams) => void;
    onDrawStart: () => void;
    onDraw: (drawEventParams: DrawEventParams) => void;
    onDrawEnd: (drawEventParams: DrawEventParams) => void;
    onLeave: (drawEventParams: DrawEventParams) => void;
    onNodeRecreate: (drawEventParams: DrawEventParams, node: any) => void;
}
