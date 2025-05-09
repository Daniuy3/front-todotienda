import { TopBar } from "@/components/layout/TopBar/TopBar";


export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <TopBar />
            {children}
        </section>
    );
}