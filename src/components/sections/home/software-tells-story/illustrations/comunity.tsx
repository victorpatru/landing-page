import React, { FC, useRef } from 'react'

import { animateScale, animateUnscale, useEnterExit } from './common'

export const Comunity: FC<{ active: boolean }> = ({ active }) => {
  const ref = useRef(null)

  useEnterExit(
    ref,
    {
      enter: () => {
        if (ref.current) {
          return [animateScale(ref.current)]
        }

        return []
      },
      exit: () => {
        if (ref.current) {
          return [animateUnscale(ref.current, '.container, .grid')]
        }

        return []
      }
    },
    active
  )

  return (
    <svg
      style={{
        transform: 'translateY(6%)',
        overflow: 'visible',
        opacity: 0
      }}
      viewBox="0 0 551 587"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
    >
      <mask
        id="mask0_2474_6503"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="551"
        height="548"
      >
        <path fill="url(#paint0_radial_2474_6503)" d="M0 0h551v547.778H0z" />
      </mask>

      <g
        className="container scale"
        mask="url(#mask0_2474_6503)"
        stroke="#fff"
        strokeWidth="2"
      >
        <path d="M0-2.14844h68.875v68.875H0zM68.875-2.14844h68.875v68.875H68.875zM137.75-2.14844h68.875v68.875H137.75zM206.625-2.14844H275.5v68.875h-68.875zM275.5-2.14844h68.875v68.875H275.5zM344.375-2.14844h68.875v68.875h-68.875zM413.25-2.14844h68.875v68.875H413.25zM482.125-2.14844H551v68.875h-68.875zM0 66.7266h68.875v68.875H0zM68.875 66.7266h68.875v68.875H68.875zM137.75 66.7266h68.875v68.875H137.75zM206.625 66.7266H275.5v68.875h-68.875zM275.5 66.7266h68.875v68.875H275.5zM344.375 66.7266h68.875v68.875h-68.875zM413.25 66.7266h68.875v68.875H413.25zM482.125 66.7266H551v68.875h-68.875zM0 135.602h68.875v68.875H0zM68.875 135.602h68.875v68.875H68.875zM137.75 135.602h68.875v68.875H137.75zM206.625 135.602H275.5v68.875h-68.875zM275.5 135.602h68.875v68.875H275.5zM344.375 135.602h68.875v68.875h-68.875zM413.25 135.602h68.875v68.875H413.25zM482.125 135.602H551v68.875h-68.875zM0 204.477h68.875v68.875H0zM68.875 204.477h68.875v68.875H68.875zM137.75 204.477h68.875v68.875H137.75zM206.625 204.477H275.5v68.875h-68.875zM275.5 204.477h68.875v68.875H275.5zM344.375 204.477h68.875v68.875h-68.875zM413.25 204.477h68.875v68.875H413.25zM482.125 204.477H551v68.875h-68.875zM0 273.352h68.875v68.875H0zM68.875 273.352h68.875v68.875H68.875zM137.75 273.352h68.875v68.875H137.75zM206.625 273.352H275.5v68.875h-68.875zM275.5 273.352h68.875v68.875H275.5zM344.375 273.352h68.875v68.875h-68.875zM413.25 273.352h68.875v68.875H413.25zM482.125 273.352H551v68.875h-68.875zM0 342.227h68.875v68.875H0zM68.875 342.227h68.875v68.875H68.875zM137.75 342.227h68.875v68.875H137.75zM206.625 342.227H275.5v68.875h-68.875zM275.5 342.227h68.875v68.875H275.5zM344.375 342.227h68.875v68.875h-68.875zM413.25 342.227h68.875v68.875H413.25zM482.125 342.227H551v68.875h-68.875zM0 411.102h68.875v68.875H0zM68.875 411.102h68.875v68.875H68.875zM137.75 411.102h68.875v68.875H137.75zM206.625 411.102H275.5v68.875h-68.875zM275.5 411.102h68.875v68.875H275.5zM344.375 411.102h68.875v68.875h-68.875zM413.25 411.102h68.875v68.875H413.25zM482.125 411.102H551v68.875h-68.875z" />
        <path d="M0 411.102h68.875v68.875H0zM68.875 411.102h68.875v68.875H68.875zM137.75 411.102h68.875v68.875H137.75zM206.625 411.102H275.5v68.875h-68.875zM275.5 411.102h68.875v68.875H275.5zM344.375 411.102h68.875v68.875h-68.875zM413.25 411.102h68.875v68.875H413.25zM482.125 411.102H551v68.875h-68.875zM0 479.977h68.875v68.875H0zM68.875 479.977h68.875v68.875H68.875zM137.75 479.977h68.875v68.875H137.75zM206.625 479.977H275.5v68.875h-68.875zM275.5 479.977h68.875v68.875H275.5zM344.375 479.977h68.875v68.875h-68.875zM413.25 479.977h68.875v68.875H413.25zM482.125 479.977H551v68.875h-68.875z" />
      </g>
      <g className="container scale" filter="url(#filter0_d_2474_6503)">
        <rect
          x="130"
          y="87"
          width="290.047"
          height="373.807"
          rx="16"
          fill="#fff"
        />
        <path
          d="M178 137.679c0-1.479 1.203-2.679 2.687-2.679h154.836c1.484 0 2.687 1.2 2.687 2.679 0 1.48-1.203 2.68-2.687 2.68H180.687c-1.484 0-2.687-1.2-2.687-2.68Z"
          fill="#BEBEBE"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M178 190.578c0-10.062 8.157-18.22 18.22-18.22h157.607c10.063 0 18.22 8.158 18.22 18.22v60.401c0 10.063-8.157 18.22-18.22 18.22H196.22c-10.063 0-18.22-8.157-18.22-18.22v-60.401Zm18.22-13.47c-7.439 0-13.47 6.031-13.47 13.47v60.401c0 7.439 6.031 13.47 13.47 13.47h157.607c7.44 0 13.47-6.031 13.47-13.47v-60.401c0-7.439-6.03-13.47-13.47-13.47H196.22Z"
          fill="#F41C52"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M248.116 199.409c-2.86-4.51-9.48-4.392-12.178.217L215.875 233.9c-2.131 3.642-6.035 5.88-10.254 5.88h-25.246v-4.75h25.246c2.533 0 4.875-1.343 6.155-3.529l20.063-34.275c4.495-7.678 15.524-7.875 20.289-.361l17.737 27.97c2.628 4.145 8.561 4.458 11.611.613l14.303-18.035c4.489-5.66 12.948-6.037 17.923-.8l13.952 14.686c1.346 1.417 3.216 2.22 5.17 2.22h35.569v4.75h-35.569c-3.256 0-6.371-1.337-8.614-3.699l-13.951-14.685c-2.987-3.144-8.064-2.917-10.759.48l-14.303 18.034c-5.081 6.407-14.964 5.886-19.343-1.02l-17.738-27.97Z"
          fill="#F41C52"
        />
        <path
          d="M262.212 208.594c0 3.09-2.504 5.595-5.594 5.595-3.09 0-5.595-2.505-5.595-5.595 0-3.089 2.505-5.594 5.595-5.594s5.594 2.505 5.594 5.594Z"
          fill="#F41C52"
        />
        <path
          d="M256.618 215.947c4.061 0 7.352-3.292 7.352-7.353 0-4.06-3.291-7.352-7.352-7.352s-7.353 3.292-7.353 7.352c0 4.061 3.292 7.353 7.353 7.353Z"
          stroke="#F41C52"
          strokeOpacity=".2"
          strokeWidth="3.51648"
        />
        <path
          d="M178 303.878c0-1.479 1.203-2.679 2.687-2.679h154.836c1.484 0 2.687 1.2 2.687 2.679 0 1.48-1.203 2.68-2.687 2.68H180.687c-1.484 0-2.687-1.2-2.687-2.68ZM178 325.237c0-1.48 1.203-2.679 2.687-2.679h80.336c1.484 0 2.687 1.199 2.687 2.679 0 1.48-1.203 2.679-2.687 2.679h-80.336c-1.484 0-2.687-1.199-2.687-2.679Z"
          fill="#BEBEBE"
        />
        <path
          d="M226.394 393.023c0-8.751 7.094-15.845 15.844-15.845h1.566c8.75 0 15.844 7.094 15.844 15.845v1.565c0 8.751-7.094 15.845-15.844 15.845h-1.566c-8.75 0-15.844-7.094-15.844-15.845v-1.565Z"
          fill="#464646"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M285.648 393.023c0-10.063 8.158-18.22 18.22-18.22h1.565c10.063 0 18.22 8.157 18.22 18.22v1.565c0 10.062-8.157 18.22-18.22 18.22h-1.565c-10.062 0-18.22-8.158-18.22-18.22v-1.565Zm18.22-13.47c-7.439 0-13.47 6.03-13.47 13.47v1.565c0 7.439 6.031 13.47 13.47 13.47h1.565c7.44 0 13.47-6.031 13.47-13.47v-1.565c0-7.44-6.03-13.47-13.47-13.47h-1.565Z"
          fill="#BEBEBE"
        />
        <rect
          x="131"
          y="88"
          width="288.047"
          height="371.807"
          rx="15"
          stroke="url(#paint1_linear_2474_6503)"
          strokeWidth="2"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_2474_6503"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 259.389 -260.915 0 275.5 263.148)"
        >
          <stop stopColor="#fff" />
          <stop offset=".519904" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint1_linear_2474_6503"
          x1="275.024"
          y1="87"
          x2="275.024"
          y2="460.807"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DCDCDC" />
          <stop offset="1" stopColor="#DCDCDC" stopOpacity="0" />
        </linearGradient>
        <filter
          id="filter0_d_2474_6503"
          x="38.9652"
          y="41.4826"
          width="472.117"
          height="555.876"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="45.5174" />
          <feGaussianBlur stdDeviation="45.5174" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2474_6503"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2474_6503"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}