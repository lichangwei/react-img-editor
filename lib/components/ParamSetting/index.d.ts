/// <reference types="react" />
import { PluginParamName, PluginParamValue } from '../../common/type';
interface ParamSettingProps {
    paramNames: PluginParamName[];
    paramValue: PluginParamValue | null;
    onChange: (value: PluginParamValue) => void;
}
export default function ParamSetting(props: ParamSettingProps): JSX.Element;
export {};
