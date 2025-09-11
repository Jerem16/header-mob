import { lazy } from "react";
import LazyWrapper from "@/src/components/LazyWrapper";
const ScrollSectionsWrapper = lazy(() => import("./ScrollSectionsWrapper"));
const ScrollProvider = lazy(() => import("../src/utils/context/ScrollContext"));
const ClientLayout2 = ({ children }: { children: React.ReactNode }) => {
    return (
        <LazyWrapper>
            <ScrollProvider>
                <ScrollSectionsWrapper>{children}</ScrollSectionsWrapper>
            </ScrollProvider>
        </LazyWrapper>
    );
};

export default ClientLayout2;
