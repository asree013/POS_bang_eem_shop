import { useState } from "react";
import { Users } from "@/models/user.model";

export default function SubLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    
    return (
        <section>
                {children}

        </section>
    );
}
