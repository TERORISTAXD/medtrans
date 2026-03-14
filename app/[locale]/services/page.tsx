import { useTranslations } from "next-intl";
import Image from "next/image";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import {
    Activity,
    Heart,
    Globe,
    Accessibility,
    CheckCircle,
    Phone,
    Stethoscope,
} from "lucide-react";

const PHONE_PLEVEN = "0890 150 160";
const PHONE_PLEVEN_HREF = "tel:+359890150160";
const PHONE_TARNOVO = "0888 645 380";
const PHONE_TARNOVO_HREF = "tel:+359888645380";

export default function ServicesPage() {
    const t = useTranslations("Services");
    const tCommon = useTranslations("Common");

    const services = [
        {
            id: "hospital-transfers",
            icon: Activity,
            iconBg: "bg-brand-red-dark",
            badge: t("b_most"),
            badgeColor: "bg-brand-red/10 text-brand-red",
            title: t("s1_title"),
            subtitle: t("s1_sub"),
            description: t("s1_desc"),
            features: [
                t("s1_f1"), t("s1_f2"), t("s1_f3"),
                t("s1_f4"), t("s1_f5"), t("s1_f6")
            ],
            image: true,
        },
        {
            id: "medical-events",
            icon: Heart,
            iconBg: "bg-brand-red",
            badge: t("b_standby"),
            badgeColor: "bg-brand-red/10 text-brand-red",
            title: t("s2_title"),
            subtitle: t("s2_sub"),
            description: t("s2_desc"),
            features: [
                t("s2_f1"), t("s2_f2"), t("s2_f3"),
                t("s2_f4"), t("s2_f5"), t("s2_f6")
            ],
            image: true,
        },
        {
            id: "international",
            icon: Globe,
            iconBg: "bg-brand-red",
            badge: t("b_cross"),
            badgeColor: "bg-brand-red/10 text-brand-red",
            title: t("s3_title"),
            subtitle: t("s3_sub"),
            description: t("s3_desc"),
            features: [
                t("s3_f1"), t("s3_f2"), t("s3_f3"),
                t("s3_f4"), t("s3_f5")
            ],
            image: true,
        },
        {
            id: "disabled-transport",
            icon: Accessibility,
            iconBg: "bg-brand-red",
            badge: t("b_access"),
            badgeColor: "bg-brand-red/10 text-brand-red",
            title: t("s4_title"),
            subtitle: t("s4_sub"),
            description: t("s4_desc"),
            features: [
                t("s4_f1"), t("s4_f2"), t("s4_f3"),
                t("s4_f4"), t("s4_f5"), t("s4_f6")
            ],
            image: true,
        },
    ];

    const stats = [
        { value: "3,000+", label: t("stat1") },
        { value: "24/7", label: t("stat2") },
        { value: "25+", label: t("stat3") },
        { value: "2+", label: t("stat4") },
    ];

    return (
        <>
            {/* Page Hero */}
            <section className="relative overflow-hidden bg-gray-900 py-24">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gray-900/60 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-20" />
                </div>
                <div className="absolute inset-0 opacity-10 z-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
                <AnimatedContainer className="relative z-30 container-max px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 text-sm font-semibold text-brand-red mb-6">
                        <Stethoscope className="h-4 w-4" />
                        {t("hero_badge")}
                    </span>
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
                        {t("hero_title")}
                    </h1>
                    <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto sm:text-xl">
                        {t("hero_desc")}
                    </p>
                </AnimatedContainer>
            </section>

            {/* Stats Bar */}
            <section className="bg-white border-b border-gray-100 py-10">
                <div className="container-max px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                        {stats.map((stat, i) => (
                            <AnimatedContainer key={stat.label} delay={0.1 * i} type="fade" className="text-center">
                                <p className="text-3xl font-extrabold text-brand-red">{stat.value}</p>
                                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                            </AnimatedContainer>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Detail */}
            <section className="section-padding bg-trust-white">
                <div className="container-max">
                    <div className="flex flex-col gap-16">
                        {services.map((service, idx) => {
                            const Icon = service.icon;
                            return (
                                <AnimatedContainer
                                    key={service.id}
                                    className={`flex flex-col gap-8 lg:flex-row lg:items-center ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                                >
                                    {/* Visual Card */}
                                    <div className="flex-1">
                                        <div className="relative overflow-hidden rounded-2xl p-10 text-white min-h-[300px] flex flex-col justify-between group shadow-xl">
                                            <Image
                                                src={`/images/services/${service.id}.jpg`}
                                                alt={service.title}
                                                fill
                                                className="object-cover absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gray-900/50 z-10 transition-colors group-hover:bg-gray-900/60" />
                                            <div className="relative z-20">
                                                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-red shadow-lg">
                                                    <Icon className="h-8 w-8 text-white" />
                                                </div>
                                                <h3 className="text-2xl font-bold">{service.title}</h3>
                                                <p className="mt-2 text-white/90 text-sm font-medium">{service.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${service.badgeColor} mb-3`}>
                                            {service.badge}
                                        </span>
                                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                            {service.title}
                                        </h2>
                                        <p className="mt-3 text-base text-gray-600 leading-relaxed">
                                            {service.description}
                                        </p>
                                        <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                            {service.features.map((feature) => (
                                                <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <a href={PHONE_PLEVEN_HREF} className="btn-emergency text-sm">
                                                <Phone className="h-4 w-4" />
                                                {tCommon("call_now")}
                                            </a>
                                        </div>
                                    </div>
                                </AnimatedContainer>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-brand-red py-12">
                <AnimatedContainer type="scale" className="container-max px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">
                        {t("cta_title")}
                    </h2>
                    <p className="mt-3 text-red-100 max-w-xl mx-auto">
                        {t("cta_desc")}
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <a
                            href={PHONE_PLEVEN_HREF}
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-brand-red shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
                        >
                            <Phone className="h-5 w-5" />
                            Плевен: {PHONE_PLEVEN}
                        </a>
                        <a
                            href={PHONE_TARNOVO_HREF}
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-brand-red shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
                        >
                            <Phone className="h-5 w-5" />
                            В.Търново: {PHONE_TARNOVO}
                        </a>
                    </div>
                </AnimatedContainer>
            </section>
        </>
    );
}
