import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, AlertTriangle, Ambulance, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
export const metadata: Metadata = {
    title: "Contact — MedTrans Medical Transport",
    description:
        "Contact MedTrans for professional medical transport. 24/7 lines available in Pleven and Veliko Tarnovo.",
};

const PHONE_PLEVEN = "0890 150 160";
const PHONE_PLEVEN_HREF = "tel:+359890150160";
const PHONE_TARNOVO = "0888 645 380";
const PHONE_TARNOVO_HREF = "tel:+359888645380";
const EMAIL = "ivailo_73@abv.bg";

export default function ContactPage() {
    const t = useTranslations("Contact");

    const contactInfo = [
        {
            id: "phone_pleven",
            icon: Phone,
            title: "Плевен",
            value: PHONE_PLEVEN,
            href: PHONE_PLEVEN_HREF,
            description: t("c1_desc"),
            highlight: true,
            iconColor: "text-brand-red",
            iconBg: "bg-brand-red/10",
        },
        {
            id: "phone_tarnovo",
            icon: Phone,
            title: "В. Търново",
            value: PHONE_TARNOVO,
            href: PHONE_TARNOVO_HREF,
            description: t("c1_desc"),
            highlight: true,
            iconColor: "text-brand-red",
            iconBg: "bg-brand-red/10",
        },
        {
            id: "mail",
            icon: Mail,
            title: t("c2_title"),
            value: EMAIL,
            href: `mailto:${EMAIL}`,
            description: t("c2_desc"),
            highlight: false,
            iconColor: "text-brand-red",
            iconBg: "bg-brand-red/10",
        },
        {
            id: "location",
            icon: MapPin,
            title: t("c3_title"),
            value: t("c3_value"),
            href: null,
            description: t("c3_desc"),
            highlight: false,
            iconColor: "text-brand-red",
            iconBg: "bg-brand-red/10",
        },
        {
            id: "hours",
            icon: Clock,
            title: t("c4_title"),
            value: t("c4_value"),
            href: null,
            description: t("c4_desc"),
            highlight: false,
            iconColor: "text-brand-red",
            iconBg: "bg-brand-red/10",
        },
        {
            id: "licenses",
            icon: Shield,
            title: t("c5_title"),
            value: t("c5_value"),
            href: null,
            description: t("c5_desc"),
            highlight: false,
            iconColor: "text-brand-red",
            iconBg: "bg-brand-red/10",
        },
    ];

    return (
        <>
            {/* Page Hero */}
            <section className="relative overflow-hidden bg-gray-900 py-24">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gray-900/60 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-20" />
                </div>
                <div
                    className="absolute inset-0 opacity-10 z-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
                <AnimatedContainer className="relative z-30 container-max px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 text-sm font-semibold text-brand-red mb-6">
                        <Ambulance className="h-4 w-4" />
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

            {/* Safety Banner */}
            <AnimatedContainer type="fade" className="bg-brand-red py-4">
                <div className="container-max px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
                        <AlertTriangle className="h-5 w-5 text-white flex-shrink-0" />
                        <p className="text-sm font-semibold text-white">
                            {t("safety_banner")}
                        </p>
                    </div>
                </div>
            </AnimatedContainer>

            {/* Main Content */}
            <section className="section-padding bg-trust-white">
                <div className="container-max">
                    <div className="max-w-4xl mx-auto">
                        <AnimatedContainer type="slide-in">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t("info_title")}</h2>
                                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                                    {t("info_desc")}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {contactInfo.map((item, idx) => {
                                    const Icon = item.icon;
                                    const content = (
                                        <AnimatedContainer
                                            type="fade"
                                            delay={0.1 * idx}
                                            className={`h-full rounded-2xl border p-6 transition-all duration-200 ${item.highlight
                                                ? "border-brand-red/30 bg-brand-red/5 shadow-sm hover:shadow-md"
                                                : "border-gray-100 bg-white shadow-sm hover:shadow-md"
                                                }`}
                                        >
                                            <div className="flex items-start gap-4 text-left">
                                                <div className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}>
                                                    <Icon className={`h-6 w-6 ${item.iconColor}`} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                                        {item.title}
                                                    </p>
                                                    <p className={`mt-1 text-lg font-bold ${item.highlight ? "text-brand-red" : "text-gray-900"}`}>
                                                        {item.value}
                                                    </p>
                                                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </AnimatedContainer>
                                    );

                                    return item.href ? (
                                        <a key={item.id} href={item.href} className="block group cursor-pointer transition-transform hover:-translate-y-1">
                                            {content}
                                        </a>
                                    ) : (
                                        <div key={item.id}>{content}</div>
                                    );
                                })}
                            </div>

                            {/* Direct Call CTA */}
                            <AnimatedContainer delay={0.4} className="mt-12 rounded-3xl bg-brand-red-dark p-8 text-white shadow-xl text-center overflow-hidden relative">
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-10">
                                    <Phone className="h-48 w-48 text-white" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="font-bold text-2xl mb-2">{t("direct_call_title")}</h3>
                                    <p className="text-red-100 mb-8 max-w-xl mx-auto">
                                        {t("direct_call_desc")}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                        <a
                                            href="tel:+359890150160"
                                            className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-brand-red shadow-lg hover:bg-gray-50 transition-all cursor-pointer hover:scale-105"
                                        >
                                            <Phone className="h-5 w-5" />
                                            Плевен: 0890 150 160
                                        </a>
                                        <a
                                            href="tel:+359888645380"
                                            className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl bg-transparent border-2 border-white/50 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-white/10 transition-all cursor-pointer hover:scale-105"
                                        >
                                            <Phone className="h-5 w-5" />
                                            В. Търново: 0888 645 380
                                        </a>
                                    </div>
                                </div>
                            </AnimatedContainer>
                        </AnimatedContainer>
                    </div>
                </div>
            </section>
        </>
    );
}
