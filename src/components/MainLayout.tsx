import { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const MainLayout: FC<Props> = ({ children }) => {
	return (
		<main className="flex justify-center p-4 h-screen dark:bg-black text-text-grey">
			<div className="w-full max-w-[600px]">{children}</div>
		</main>
	);
};
