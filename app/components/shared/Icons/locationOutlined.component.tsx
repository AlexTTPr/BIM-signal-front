import React from "react";
import Icon from '@ant-design/icons';
import type { GetProps } from 'antd';

type CustomIconComponentProps = GetProps<typeof Icon>;

const LocationIconSvg = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 5.7C2.5 4.57989 2.5 4.01984 2.71799 3.59202C2.90973 3.21569 3.21569 2.90973 3.59202 2.71799C4.01984 2.5 4.5799 2.5 5.7 2.5H18.3C19.4201 2.5 19.9802 2.5 20.408 2.71799C20.7843 2.90973 21.0903 3.21569 21.282 3.59202C21.5 4.01984 21.5 4.5799 21.5 5.7V18.3C21.5 19.4201 21.5 19.9802 21.282 20.408C21.0903 20.7843 20.7843 21.0903 20.408 21.282C19.9802 21.5 19.4201 21.5 18.3 21.5H5.7C4.57989 21.5 4.01984 21.5 3.59202 21.282C3.21569 21.0903 2.90973 20.7843 2.71799 20.408C2.5 19.9802 2.5 19.4201 2.5 18.3V5.7Z" stroke="#222222" strokeLinecap="round" />
    <path d="M12.5 15.0294C12.5 17.1878 10.3603 18.704 9.42687 19.2628C9.16233 19.4211 8.83767 19.4211 8.57313 19.2628C7.63974 18.704 5.5 17.1878 5.5 15.0294C5.5 12.9118 7.19587 11.5 9 11.5C10.8667 11.5 12.5 12.9118 12.5 15.0294Z" stroke="#222222" />
    <path d="M18.5 21.5L12.5 6.5" stroke="#222222" />
    <path d="M21.5 4.5L2.5 8.5" stroke="#222222" />
    <circle cx="9" cy="15" r="1" fill="#222222" />
</svg>
);

export default function LocationOutlined(props: Partial<CustomIconComponentProps>) : JSX.Element {
    return(
        <Icon component={LocationIconSvg} {...props} />
    );
};