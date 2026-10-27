import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

export const ArrowUpLeft = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      fill="none"
      viewBox="0 0 44 44"
      {...props}
    >
      <path
        fill="#fff"
        d="M5.43 30.668.032 2.136A1.8 1.8 0 0 1 2.136.032L30.668 5.43c1.464.277 1.978 2.111.87 3.108l-5.265 4.739a1.8 1.8 0 0 0-.069 2.611l17.079 17.079a1.8 1.8 0 0 1 0 2.546l-7.77 7.77a1.8 1.8 0 0 1-2.546 0l-17.079-17.08a1.8 1.8 0 0 0-2.611.07l-4.74 5.265c-.996 1.107-2.83.594-3.107-.87"
      />
    </svg>
  );
};
