import { FC, useEffect, useState } from "react";
import * as timeago from "timeago.js";

type Props = {
	date: number;
};

export const TimeAgo: FC<Props> = ({ date }) => {
	const getTimeAgo = (date: number) => {
		return timeago.format(date, "en_US");
	};

	const [timeAgo, setTimeAgo] = useState(getTimeAgo(date));

	useEffect(() => {
		setTimeAgo(getTimeAgo(date));
	}, [date]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeAgo(timeago.format(date, "en_US"));
		}, 10000);

		return () => clearInterval(intervalId);
	}, [date]);

	return <div className="mb-1 text-[12px]">{timeAgo}</div>;
};
