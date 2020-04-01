/// <reference types="react" />
interface LineTypeSettingProps {
    value?: string;
    onChange: (lineType: 'solid' | 'dash') => void;
}
export default function LineTypeSetting(props: LineTypeSettingProps): JSX.Element;
export {};
