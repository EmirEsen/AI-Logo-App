import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgSlashIcon = (props: {}) => (
    <Svg
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        {...props}
    >
        <Path
            d="M20 36.6666C29.2 36.6666 36.6667 29.1999 36.6667 19.9999C36.6667 10.7999 29.2 3.33325 20 3.33325C10.8 3.33325 3.33337 10.7999 3.33337 19.9999C3.33337 29.1999 10.8 36.6666 20 36.6666Z"
            stroke="#FAFAFA"
            strokeWidth={2.7}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M31.5 8.33337L8.16669 31.6667"
            stroke="#FAFAFA"
            strokeWidth={2.7}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export default SvgSlashIcon;
