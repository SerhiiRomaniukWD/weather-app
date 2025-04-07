import { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
	className?: string;
};

export const ItemLayout: FC<Props> = ({ children, className }) => {
	return (
		<div
			className={`relative bg-item-light dark:bg-item-dark p-3 rounded-lg ${className}`}
		>
			{children}
		</div>
	);
};
