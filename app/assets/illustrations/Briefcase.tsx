import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> { }

export const Briefcase = (props: IProps) => {
    return (
        <svg width="306" height="242" viewBox="0 0 306 242" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M296.769 50L301.072 139.495L305.52 232.012C305.781 237.449 301.443 242 296 242H9.99951C4.55637 242 0.218698 237.449 0.47998 232.012L3.73291 164.364L9.23096 50L9.99951 34H296L296.769 50Z" fill="#0D0D0D" />
            <path d="M10 34H296L296.769 50L301.072 139.495L296.706 227.741C296.31 235.728 289.72 242 281.724 242H23.8379C16.0217 242 9.51549 235.998 8.88654 228.207L3.73254 164.364L9.2308 50L10 34Z" fill-rule="evenodd" clip-rule="evenodd" fill="#151515" />
            <g filter="url(#filter0_i_622_3679)">
                <path d="M17 37C17 33.134 20.134 30 24 30H282C285.866 30 289 33.134 289 37V130C289 135.523 284.523 140 279 140H27C21.4771 140 17 135.523 17 130V37Z" fill="#414141" />
            </g>
            <path d="M139 125H167V142C167 144.761 164.761 147 162 147H144C141.239 147 139 144.761 139 142V125Z" fill="#E7F8FF" />
            <path d="M107 12C107 12 134.871 5 153 5C171.129 5 199 12 199 12" stroke-width="10" stroke="#121212" />
            <path d="M103.037 11.5887C103.505 9.99921 105.173 9.08986 106.762 9.55759L107.722 9.83989C109.311 10.3076 110.22 11.9753 109.753 13.5648L104.703 30.7236C104.158 32.578 102.212 33.6389 100.358 33.0932C98.5033 32.5475 97.4424 30.6019 97.9881 28.7475L103.037 11.5887Z" fill="#E7F8FF" />
            <path d="M201.037 31.2033C201.505 32.7928 203.173 33.7021 204.762 33.2344L205.722 32.9521C207.311 32.4844 208.22 30.8167 207.753 29.2272L202.703 12.0684C202.158 10.214 200.212 9.15312 198.358 9.6988C196.503 10.2445 195.442 12.1901 195.988 14.0445L201.037 31.2033Z" fill="#E7F8FF" />
            <path d="M139 165H167V152C167 149.239 164.761 147 162 147H144C141.239 147 139 149.239 139 152V165Z" fill="#E7F8FF" />
            <path d="M10 242C4.55659 242 0.218814 237.449 0.480215 232.012L3.73251 164.364L10 242Z" fill="#0D0D0D" />
            <path d="M305.52 232.012C305.781 237.449 301.443 242 296 242L301.072 139.495L305.52 232.012Z" fill-rule="evenodd" clip-rule="evenodd" fill="#0D0D0D" />
            <defs>
                <filter id="filter0_i_622_3679" x="17" y="28" width="272" height="112" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_622_3679" />
                </filter>
            </defs>
        </svg>

    );
};
