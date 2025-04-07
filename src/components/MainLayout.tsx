import { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const MainLayout: FC<Props> = ({ children }) => {
	return <main className="p-4 h-screen bg-bg">{children}</main>;
};
