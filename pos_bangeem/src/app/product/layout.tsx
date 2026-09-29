'use client'
import { useState } from "react";
import Nav from "../components/Nav";
import { Users } from "@/models/user.model";
import { FindMeContext } from "../contexts/findme.context";

export default function SubLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [findMe, setFindMe] = useState<Users>({} as Users)

    
    return (
        <section>
            <FindMeContext.Provider value={{findMe, setFindMe}} >
                <Nav />
                {children}
            </FindMeContext.Provider>

        </section>
    );
}
