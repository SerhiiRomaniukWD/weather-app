import { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const ItemLayout: FC<Props> = ({ children }) => {
	return <div className="bg-item-light p-3 rounded-lg">{children}</div>;
};
