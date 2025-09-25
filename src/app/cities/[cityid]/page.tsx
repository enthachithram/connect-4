"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

interface EventsPageProps {
    params: { cityid: string };
}

const Events = () => {
    const { cityid } = useParams();

    return (
        <>
            <Link href={`/cities/${cityid}/events`}>
                <div>events</div>
            </Link>
            <h1>{cityid}</h1>
        </>
    );
};

export default Events;
