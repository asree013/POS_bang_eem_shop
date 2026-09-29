import Nav from "../components/Nav";

export default function SubLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            <Nav/>
            {children}

        </section>
    );
}
