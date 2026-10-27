import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> { }

export const StoreBackground = (props: IProps) => {
    return (
        <svg width="1067" height="468" viewBox="0 0 1067 468" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect width="1067" height="468" rx="31" fill="#A1ADB2" />
            <path d="M0 31C0 13.8792 13.8792 0 31 0H1036C1053.12 0 1067 13.8792 1067 31V419H0V31Z" fill="#E8F9FF" />
            <rect x="144" y="91" width="923" height="328" fill="#E7F8FF" />
            <path d="M1036 116V384H175V116H1036Z" fill="#D0E6EF" />
            <path d="M98 116V384H0V116H98Z" fill="#D0E6EF" />
            <path opacity="0.51" d="M144 0H1036C1053.12 0 1067 13.8792 1067 31V54C1067 61.732 1060.73 68 1053 68H158C150.268 68 144 61.732 144 54V0Z" fill="#5B6468" />
            <path opacity="0.51" d="M0 31C0 13.8792 13.8792 0 31 0H98V54C98 61.732 91.732 68 84 68H14C6.26801 68 0 61.732 0 54V31Z" fill="#5B6468" />
            <rect x="144" y="45" width="923" height="46" fill="#E7F8FF" />
            <rect y="45" width="98" height="46" fill="#E7F8FF" />
            <rect x="144" width="419" height="46" transform="rotate(90 144 0)" fill="#E7F8FF" />
            <rect x="144" width="419" height="7.99998" transform="rotate(90 144 0)" fill="#B4CDD8" />
            <rect x="98" y="116" width="268" height="7.99999" transform="rotate(90 98 116)" fill="#A1B5BD" />
            <rect x="1" y="115" width="97" height="8" fill="#A1B5BD" />
            <rect x="1036" y="116" width="268" height="6.9999" transform="rotate(90 1036 116)" fill="#A1B5BD" />
            <rect x="175" y="115" width="857" height="8" fill="#A1B5BD" />
            <rect width="923" height="8" transform="matrix(1 0 0 -1 144 99)" fill="#B4CDD8" />
            <rect width="97" height="8" transform="matrix(1 0 0 -1 1 99)" fill="#B4CDD8" />
        </svg>

    );
};
