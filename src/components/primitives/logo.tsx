import * as React from 'react'

export const IsoLogo = () => {
  return (
    <svg viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.2826 11.9545L13.6931 6.40771L4.10349 0.86089C3.68759 0.620535 3.21588 0.49405 2.73574 0.494141C2.2556 0.494231 1.78394 0.620894 1.36813 0.861405C0.952315 1.10192 0.606999 1.44781 0.366851 1.86434C0.126704 2.28088 0.000181045 2.75338 0 3.2344V25.4215C0.000161455 25.9025 0.126671 26.375 0.36681 26.7916C0.60695 27.2081 0.952264 27.554 1.36808 27.7946C1.78389 28.0351 2.25557 28.1617 2.73572 28.1618C3.21586 28.1619 3.68758 28.0355 4.10349 27.7951L13.6931 22.2483L23.2826 16.7016C23.6985 16.461 24.0439 16.1151 24.284 15.6984C24.5241 15.2818 24.6505 14.8091 24.6505 14.328C24.6505 13.8469 24.5241 13.3743 24.284 12.9577C24.0439 12.541 23.6985 12.1951 23.2826 11.9545Z"
        fill="currentColor"
      />
      <path
        d="M23.2826 42.8509L13.6931 37.3042L4.10349 31.7574C3.68758 31.517 3.21586 31.3905 2.73571 31.3906C2.25556 31.3907 1.78389 31.5174 1.36808 31.7579C0.952264 31.9984 0.606943 32.3444 0.366803 32.7609C0.126664 33.1774 0.000161455 33.65 0 34.131V56.3179C0.000161455 56.799 0.126664 57.2715 0.366803 57.6881C0.606943 58.1046 0.952264 58.4505 1.36808 58.691C1.78389 58.9316 2.25556 59.0582 2.73571 59.0583C3.21586 59.0584 3.68758 58.9319 4.10349 58.6916L13.6931 53.1449L23.2826 47.598C23.6985 47.3575 24.0439 47.0115 24.2841 46.5949C24.5242 46.1782 24.6506 45.7056 24.6506 45.2245C24.6506 44.7434 24.5242 44.2707 24.2841 43.8541C24.0439 43.4374 23.6985 43.0914 23.2826 42.8509Z"
        fill="currentColor"
      />
      <path
        d="M50.6303 27.4036L41.0408 21.8568L31.4511 16.3101C31.0352 16.0698 30.5635 15.9433 30.0834 15.9434C29.6033 15.9435 29.1316 16.0701 28.7158 16.3106C28.3 16.5511 27.9546 16.897 27.7145 17.3136C27.4744 17.7301 27.3478 18.2026 27.3477 18.6836V40.8707C27.3478 41.3517 27.4744 41.8242 27.7145 42.2408C27.9546 42.6573 28.3 43.0032 28.7158 43.2437C29.1316 43.4842 29.6033 43.6109 30.0834 43.611C30.5635 43.611 31.0352 43.4846 31.4511 43.2442L41.0408 37.6975L50.6303 32.1507C51.0462 31.9101 51.3916 31.5642 51.6317 31.1475C51.8718 30.7309 51.9982 30.2583 51.9982 29.7772C51.9982 29.2961 51.8718 28.8234 51.6317 28.4068C51.3916 27.9901 51.0462 27.6442 50.6303 27.4036Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const Logo: React.FC<JSX.IntrinsicElements['svg']> = ({
  width = 94,
  ...rest
}) => {
  return (
    <svg
      width={width}
      viewBox="0 0 94 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M12.0154 6.18409L7.27252 3.44068L2.52956 0.697261C2.32385 0.578383 2.09055 0.515824 1.85308 0.515869C1.61561 0.515914 1.38232 0.57856 1.17667 0.697516C0.971008 0.816471 0.800217 0.987547 0.681442 1.19356C0.562667 1.39958 0.50009 1.63327 0.5 1.87118V12.8447C0.50008 13.0827 0.56265 13.3164 0.681422 13.5224C0.800193 13.7284 0.970983 13.8995 1.17664 14.0185C1.3823 14.1374 1.61559 14.2001 1.85307 14.2001C2.09054 14.2002 2.32385 14.1376 2.52956 14.0187L7.27252 11.2753L12.0154 8.53195C12.2211 8.41298 12.3919 8.24186 12.5107 8.03579C12.6295 7.82973 12.692 7.59597 12.692 7.35802C12.692 7.12007 12.6295 6.88631 12.5107 6.68024C12.3919 6.47418 12.2211 6.30306 12.0154 6.18409Z"
        fill="#F41C52"
      />
      <path
        d="M12.0154 21.4651L7.27251 18.7217L2.52956 15.9783C2.32385 15.8594 2.09054 15.7969 1.85306 15.7969C1.61558 15.797 1.3823 15.8596 1.17664 15.9786C0.970983 16.0976 0.80019 16.2686 0.681418 16.4747C0.562647 16.6807 0.50008 16.9144 0.5 17.1523V28.1258C0.50008 28.3637 0.562647 28.5974 0.681418 28.8035C0.80019 29.0095 0.970983 29.1806 1.17664 29.2995C1.3823 29.4185 1.61558 29.4811 1.85306 29.4812C2.09054 29.4812 2.32385 29.4187 2.52956 29.2998L7.27251 26.5564L12.0154 23.813C12.2211 23.6941 12.392 23.5229 12.5107 23.3169C12.6295 23.1108 12.692 22.877 12.692 22.6391C12.692 22.4011 12.6295 22.1673 12.5107 21.9613C12.392 21.7552 12.2211 21.5841 12.0154 21.4651Z"
        fill="#F41C52"
      />
      <path
        d="M25.5424 13.8261L20.7995 11.0827L16.0565 8.33935C15.8508 8.22047 15.6175 8.15791 15.3801 8.15796C15.1426 8.158 14.9093 8.22065 14.7036 8.33961C14.498 8.45856 14.3272 8.62964 14.2084 8.83565C14.0896 9.04167 14.0271 9.27536 14.027 9.51327V20.4868C14.0271 20.7247 14.0896 20.9584 14.2084 21.1645C14.3272 21.3705 14.498 21.5416 14.7036 21.6605C14.9093 21.7795 15.1426 21.8421 15.3801 21.8422C15.6175 21.8422 15.8508 21.7796 16.0565 21.6608L20.7995 18.9174L25.5424 16.174C25.7481 16.055 25.9189 15.8839 26.0377 15.6778C26.1564 15.4718 26.219 15.238 26.219 15.0001C26.219 14.7621 26.1564 14.5283 26.0377 14.3223C25.9189 14.1162 25.7481 13.9451 25.5424 13.8261Z"
        fill="#F41C52"
      />
      <path
        d="M38.3162 19.7427V6.54565H42.7753C43.8064 6.54565 44.6527 6.72179 45.3142 7.07405C45.9758 7.42202 46.4655 7.90102 46.7834 8.51104C47.1013 9.12106 47.2603 9.81485 47.2603 10.5924C47.2603 11.37 47.1013 12.0595 46.7834 12.6609C46.4655 13.2623 45.9779 13.7349 45.3207 14.0786C44.6634 14.4179 43.8235 14.5876 42.8011 14.5876H39.1925V13.1442H42.7496C43.4541 13.1442 44.0212 13.0411 44.4507 12.8349C44.8846 12.6287 45.1982 12.3366 45.3916 11.9585C45.5892 11.5762 45.688 11.1208 45.688 10.5924C45.688 10.064 45.5892 9.60221 45.3916 9.20698C45.1939 8.81176 44.8782 8.50674 44.4443 8.29195C44.0104 8.07286 43.4369 7.96331 42.7238 7.96331H39.9142V19.7427H38.3162ZM44.5281 13.8144L47.7758 19.7427H45.92L42.7238 13.8144H44.5281Z"
        fill="#F41C52"
      />
      <path
        d="M53.7606 19.9489C52.8069 19.9489 51.9842 19.7384 51.2925 19.3174C50.6052 18.8921 50.0746 18.2993 49.7009 17.5389C49.3315 16.7743 49.1467 15.885 49.1467 14.8712C49.1467 13.8573 49.3315 12.9638 49.7009 12.1905C50.0746 11.4129 50.5945 10.8072 51.2603 10.3733C51.9305 9.93514 52.7123 9.71605 53.6059 9.71605C54.1214 9.71605 54.6305 9.80197 55.1331 9.9738C55.6357 10.1456 56.0932 10.4249 56.5056 10.8115C56.9181 11.1938 57.2467 11.7008 57.4916 12.3323C57.7364 12.9638 57.8589 13.7413 57.8589 14.665V15.3093H50.2293V13.9948H56.3123C56.3123 13.4363 56.2006 12.938 55.9772 12.4998C55.7582 12.0616 55.4446 11.7158 55.0364 11.4623C54.6326 11.2089 54.1558 11.0822 53.6059 11.0822C53.0002 11.0822 52.4761 11.2325 52.0336 11.5332C51.5954 11.8296 51.2582 12.2163 51.0219 12.6931C50.7856 13.17 50.6675 13.6812 50.6675 14.2268V15.1031C50.6675 15.8506 50.7964 16.4843 51.0541 17.0041C51.3162 17.5196 51.6792 17.9127 52.1431 18.1833C52.6071 18.4497 53.1462 18.5828 53.7606 18.5828C54.1601 18.5828 54.5209 18.527 54.8431 18.4153C55.1696 18.2993 55.451 18.1275 55.6873 17.8998C55.9236 17.6678 56.1061 17.38 56.235 17.0363L57.7042 17.4487C57.5496 17.947 57.2897 18.3852 56.9245 18.7633C56.5593 19.137 56.1083 19.4291 55.5713 19.6396C55.0343 19.8458 54.4307 19.9489 53.7606 19.9489Z"
        fill="#F41C52"
      />
      <path
        d="M60.1722 23.4544V9.84493H61.6414V11.4172H61.8219C61.9335 11.2454 62.0882 11.0263 62.2858 10.76C62.4877 10.4893 62.7756 10.2487 63.1493 10.0382C63.5273 9.82345 64.0386 9.71605 64.6829 9.71605C65.5164 9.71605 66.251 9.9244 66.8868 10.3411C67.5226 10.7578 68.0187 11.3485 68.3753 12.1132C68.7319 12.8778 68.9101 13.78 68.9101 14.8196C68.9101 15.8678 68.7319 16.7764 68.3753 17.5454C68.0187 18.31 67.5247 18.9029 66.8932 19.3239C66.2617 19.7406 65.5335 19.9489 64.7087 19.9489C64.0729 19.9489 63.5639 19.8437 63.1815 19.6332C62.7992 19.4184 62.5049 19.1757 62.2987 18.905C62.0925 18.6301 61.9335 18.4024 61.8219 18.222H61.693V23.4544H60.1722ZM61.6672 14.7938C61.6672 15.5413 61.7767 16.2007 61.9958 16.7721C62.2149 17.3392 62.535 17.7838 62.956 18.106C63.377 18.4239 63.8925 18.5828 64.5025 18.5828C65.1383 18.5828 65.6689 18.4153 66.0942 18.0802C66.5237 17.7408 66.8459 17.2855 67.0607 16.7141C67.2798 16.1385 67.3894 15.4984 67.3894 14.7938C67.3894 14.0979 67.282 13.4707 67.0672 12.9122C66.8567 12.3495 66.5366 11.9048 66.107 11.5783C65.6817 11.2475 65.1469 11.0822 64.5025 11.0822C63.8839 11.0822 63.3641 11.239 62.9431 11.5526C62.5221 11.8619 62.2042 12.2958 61.9894 12.8542C61.7746 13.4084 61.6672 14.0549 61.6672 14.7938Z"
        fill="#F41C52"
      />
      <path
        d="M72.7507 6.54565V19.7427H71.2299V6.54565H72.7507Z"
        fill="#F41C52"
      />
      <path
        d="M78.4487 19.9747C77.8215 19.9747 77.2523 19.8566 76.7411 19.6203C76.2299 19.3797 75.8239 19.0339 75.5232 18.5828C75.2225 18.1275 75.0721 17.5776 75.0721 16.9332C75.0721 16.3661 75.1838 15.9065 75.4072 15.5542C75.6306 15.1976 75.9291 14.9184 76.3029 14.7165C76.6766 14.5146 77.089 14.3642 77.5401 14.2654C77.9955 14.1623 78.453 14.0807 78.9127 14.0206C79.5141 13.9432 80.0017 13.8852 80.3754 13.8466C80.7535 13.8036 81.0284 13.7327 81.2002 13.6339C81.3764 13.5351 81.4644 13.3633 81.4644 13.1184V13.0669C81.4644 12.4311 81.2905 11.937 80.9425 11.5848C80.5988 11.2325 80.0769 11.0564 79.3766 11.0564C78.6506 11.0564 78.0814 11.2153 77.669 11.5332C77.2566 11.8511 76.9666 12.1905 76.7991 12.5514L75.3556 12.0358C75.6134 11.4344 75.9571 10.9662 76.3867 10.6311C76.8205 10.2917 77.2931 10.0554 77.8043 9.92225C78.3198 9.78478 78.8267 9.71605 79.3251 9.71605C79.643 9.71605 80.0081 9.75471 80.4205 9.83204C80.8372 9.90507 81.2389 10.0576 81.6255 10.2896C82.0165 10.5215 82.3408 10.8717 82.5986 11.3399C82.8563 11.8082 82.9852 12.4354 82.9852 13.2215V19.7427H81.4644V18.4024H81.3871C81.284 18.6172 81.1122 18.847 80.8716 19.0919C80.631 19.3368 80.311 19.5451 79.9115 19.717C79.5119 19.8888 79.0244 19.9747 78.4487 19.9747ZM78.6807 18.6086C79.2821 18.6086 79.789 18.4905 80.2014 18.2542C80.6181 18.0179 80.9317 17.7129 81.1422 17.3392C81.357 16.9654 81.4644 16.5723 81.4644 16.1599V14.7681C81.4 14.8454 81.2582 14.9163 81.0391 14.9807C80.8243 15.0408 80.5752 15.0945 80.2916 15.1418C80.0124 15.1848 79.7396 15.2234 79.4733 15.2578C79.2112 15.2879 78.9986 15.3136 78.8353 15.3351C78.4401 15.3867 78.0707 15.4704 77.727 15.5864C77.3876 15.6981 77.1127 15.8678 76.9022 16.0955C76.696 16.3189 76.5929 16.6239 76.5929 17.0105C76.5929 17.5389 76.7883 17.9384 77.1793 18.2091C77.5745 18.4754 78.075 18.6086 78.6807 18.6086Z"
        fill="#F41C52"
      />
      <path
        d="M86.386 23.4544C86.1282 23.4544 85.8984 23.4329 85.6965 23.39C85.4946 23.3513 85.3549 23.3127 85.2776 23.274L85.6642 21.9337C86.0337 22.0282 86.3602 22.0625 86.6437 22.0368C86.9272 22.011 87.1786 21.8843 87.3976 21.6566C87.621 21.4332 87.8251 21.0702 88.0098 20.5676L88.2934 19.7943L84.6332 9.84493H86.2829L89.0151 17.7322H89.1182L91.8504 9.84493H93.5L89.2986 21.1862C89.1096 21.6974 88.8754 22.1205 88.5962 22.4556C88.317 22.795 87.9926 23.0463 87.6232 23.2096C87.258 23.3728 86.8456 23.4544 86.386 23.4544Z"
        fill="#F41C52"
      />
    </svg>
  )
}
