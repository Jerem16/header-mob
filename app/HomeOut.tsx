// import DrivingLazyWrapper from "@src/components/DrivingLazyWrapper";
import ServicesLazy from "../src/home/service/services";

export default function Home() {
    return (
        // <DrivingLazyWrapper>
            <section className="section" id="services">
                <div className="fixed-menu"></div>
                <ServicesLazy />
                <div className="fixed-menu"></div>
            </section>
        // </DrivingLazyWrapper>
    );
}
