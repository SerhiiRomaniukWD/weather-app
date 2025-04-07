import { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const MainLayout: FC<Props> = ({ children }) => {
	return (
		<main className="flex justify-center p-4 md:py-8 h-screen bg-light dark:bg-black text-text-grey dark:text-white">
			<div className="flex flex-col gap-6 w-full max-w-[600px]">{children}</div>
		</main>
	);
};
