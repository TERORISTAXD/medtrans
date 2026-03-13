import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { PriceEstimator } from "@/components/PriceEstimator";
import {
    Phone,
    CalendarCheck,
    Clock,
    Shield,
    Heart,
    Users,
    Ambulance,
    ArrowRight,
    Star,
    CheckCircle,
    Stethoscope,
    Globe,
    Accessibility,
    Activity,
} from "lucide-react";

const PHONE_HREF = "tel:+359888000000";
const PHONE_NUMBER = "+359 888 000 000";

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
    const t = useTranslations("Home");
    const tCommon = useTranslations("Common");

    return (
        <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-gray-900">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="MedTrans Professional Medical Team"
                    fill
                    priority
                    className="object-cover object-center lg:object-right"
                />
                <div className="absolute inset-0 bg-gray-900/60 lg:bg-gradient-to-r lg:from-gray-900/90 lg:via-gray-900/50 lg:to-transparent" />
            </div>

            {/* Decorative grid */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <AnimatedContainer type="fade" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                    <AnimatedContainer type="slide-up" delay={0.1} className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 text-sm font-semibold text-brand-red">
                        <div className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                        {t("hero_badge")}
                    </AnimatedContainer>

                    <AnimatedContainer type="slide-up" delay={0.2}>
                        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                            {t("hero_title_1")}
                            <span className="block text-brand-red-light">
                                {t("hero_title_2")}
                            </span>
                        </h1>
                    </AnimatedContainer>

                    <AnimatedContainer type="slide-up" delay={0.3}>
                        <p className="mb-8 text-lg leading-relaxed text-gray-300 sm:text-xl max-w-2xl">
                            {t("hero_desc")}
                        </p>
                    </AnimatedContainer>

                    <AnimatedContainer type="slide-up" delay={0.4} className="flex flex-wrap gap-4">
                        <a href={PHONE_HREF} className="btn-emergency text-base sm:text-lg px-6 sm:px-8 py-3.5">
                            <Phone className="h-5 w-5" />
                            {tCommon("call_emergency")}
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/50 sm:text-lg sm:px-8"
                        >
                            <CalendarCheck className="h-5 w-5" />
                            {tCommon("book_transport")}
                        </Link>
                    </AnimatedContainer>

                    <AnimatedContainer type="slide-up" delay={0.5} className="mt-10 flex flex-wrap gap-6">
                        {[
                            { icon: Shield, text: t("trust_licensed") },
                            { icon: Clock, text: t("trust_response") },
                            { icon: Stethoscope, text: t("trust_staff") },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2 text-sm text-gray-300">
                                <CheckCircle className="h-4 w-4 text-brand-red-light flex-shrink-0" />
                                {text}
                            </div>
                        ))}
                    </AnimatedContainer>
                </div>
            </AnimatedContainer>

            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 40L60 35C120 30 240 20 360 25C480 30 600 50 720 55C840 60 960 50 1080 42C1200 34 1320 27 1380 24L1440 21V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V40Z" fill="white" />
                </svg>
            </div>
        </section>
    );
}

// ─── Why Choose Us ──────────────────────────────────────────────────────────
function WhyChooseUs() {
    const t = useTranslations("Home");

    const features = [
        { icon: Clock, title: t("f1_title"), description: t("f1_desc"), color: "text-brand-red", bg: "bg-brand-red/10" },
        { icon: Ambulance, title: t("f2_title"), description: t("f2_desc"), color: "text-brand-red", bg: "bg-brand-red/10" },
        { icon: Users, title: t("f3_title"), description: t("f3_desc"), color: "text-brand-red", bg: "bg-brand-red/10" },
        { icon: Globe, title: t("f4_title"), description: t("f4_desc"), color: "text-brand-red", bg: "bg-brand-red/10" },
        { icon: Heart, title: t("f5_title"), description: t("f5_desc"), color: "text-brand-red", bg: "bg-brand-red/10" },
        { icon: Shield, title: t("f6_title"), description: t("f6_desc"), color: "text-brand-red", bg: "bg-brand-red/10" },
    ];

    return (
        <section className="section-padding bg-trust-white">
            <div className="container-max">
                <AnimatedContainer className="text-center mb-14">
                    <span className="text-sm font-semibold uppercase tracking-widest text-brand-red">{t("why_badge")}</span>
                    <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">{t("why_title")}</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{t("why_desc")}</p>
                </AnimatedContainer>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <AnimatedContainer key={feature.title} delay={0.1 * index} className="card-hover rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}>
                                    <Icon className={`h-6 w-6 ${feature.color}`} />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
                                <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
                            </AnimatedContainer>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ─── Services Summary ────────────────────────────────────────────────────────
function ServicesSummary() {
    const t = useTranslations("Home");
    const tCommon = useTranslations("Common");

    const services = [
        { icon: Activity, title: t("s1_title"), description: t("s1_desc"), bg: "bg-brand-red-dark" },
        { icon: Heart, title: t("s2_title"), description: t("s2_desc"), bg: "bg-brand-red" },
        { icon: Globe, title: t("s3_title"), description: t("s3_desc"), bg: "bg-brand-red" },
        { icon: Accessibility, title: t("s4_title"), description: t("s4_desc"), bg: "bg-brand-red" },
    ];

    return (
        <section className="section-padding bg-white">
            <div className="container-max">
                <AnimatedContainer className="text-center mb-14">
                    <span className="text-sm font-semibold uppercase tracking-widest text-brand-red">{t("serv_badge")}</span>
                    <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">{t("serv_title")}</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{t("serv_desc")}</p>
                </AnimatedContainer>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <AnimatedContainer key={service.title} delay={0.1 * index} className="card-hover group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col h-full">
                                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${service.bg} shrink-0`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 text-base font-bold text-gray-900">{service.title}</h3>
                                <p className="text-sm leading-relaxed text-gray-600 mb-4 flex-grow">{service.description}</p>
                                <Link href="/services" className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:gap-2 transition-all">
                                    {tCommon("learn_more")} <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </AnimatedContainer>
                        );
                    })}
                </div>

                <AnimatedContainer delay={0.3} className="mt-10 text-center">
                    <Link href="/services" className="btn-primary">
                        {tCommon("view_all_services")} <ArrowRight className="h-4 w-4" />
                    </Link>
                </AnimatedContainer>
            </div>
        </section>
    );
}

// ─── Testimonials ──────────────────────────────────────────────────────────
function Testimonials() {
    const t = useTranslations("Home");

    const testimonials = [
        { name: t("t1_name"), role: t("t1_role"), content: t("t1_content"), rating: 5 },
        { name: t("t2_name"), role: t("t2_role"), content: t("t2_content"), rating: 5 },
        { name: t("t3_name"), role: t("t3_role"), content: t("t3_content"), rating: 5 },
    ];

    return (
        <section className="section-padding bg-gradient-to-br from-brand-red-dark to-brand-red">
            <div className="container-max">
                <AnimatedContainer className="text-center mb-14">
                    <span className="text-sm font-semibold uppercase tracking-widest text-brand-red-light">{t("test_badge")}</span>
                    <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{t("test_title")}</h2>
                </AnimatedContainer>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((test, index) => (
                        <AnimatedContainer key={test.name} delay={0.1 * index} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                            <div className="mb-4 flex gap-1">
                                {Array.from({ length: test.rating }).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="mb-6 text-sm leading-relaxed text-gray-300 italic">
                                &ldquo;{test.content}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/30 text-white font-bold text-sm">
                                    {test.name.charAt(0)}
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-white">{test.name}</p>
                                    <p className="text-xs text-brand-red-light">{test.role}</p>
                                </div>
                            </div>
                        </AnimatedContainer>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Emergency CTA Strip ──────────────────────────────────────────────────
function EmergencyCTA() {
    const t = useTranslations("Home");

    return (
        <section className="bg-brand-red py-10">
            <div className="container-max px-4 sm:px-6 lg:px-8">
                <AnimatedContainer type="scale" className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">{t("cta_title")}</h2>
                        <p className="mt-2 text-red-100 text-lg">{t("cta_desc")}</p>
                    </div>
                    <a href={PHONE_HREF} className="flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-bold text-brand-red shadow-xl transition-all hover:shadow-2xl hover:scale-105">
                        <Phone className="h-6 w-6" />
                        {PHONE_NUMBER}
                    </a>
                </AnimatedContainer>
            </div>
        </section>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function HomePage() {
    return (
        <>
            <Hero />
            <WhyChooseUs />
            <ServicesSummary />
            <PriceEstimator />
            <Testimonials />
            <EmergencyCTA />
        </>
    );
}
