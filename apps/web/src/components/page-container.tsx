import { PropsWithChildren } from "react";
import { AppLogo } from "./app-logo";

export const PageContainer = ({ children }: PropsWithChildren) => (
    <div className="bg-brand-50 min-w-screen min-h-screen flex items-center justify-center flex-col gap-16 p-4">
        <AppLogo />

        <div>{children}</div>
    </div>
);
