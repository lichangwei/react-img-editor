/// <reference types="react" />
interface ColorSettingProps {
    value?: string;
    onChange: (color: string) => void;
}
export default function ColorSetting(props: ColorSettingProps): JSX.Element;
export {};
