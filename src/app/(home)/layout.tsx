import { TopBar } from "@/components/layout/TopBar";


export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <TopBar />
            {children}
        </section>
    );
}