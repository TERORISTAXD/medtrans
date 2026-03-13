import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, AlertTriangle, Ambulance } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { useTranslations } from "next-intl";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";

// Metadata cannot use useTranslations directly as it's outside the component,
// but we'll leave it in English as requested or use generateMetadata later if needed.
export const metadata: Metadata = {
    title: "Contact & Booking — MedTrans Medical Transport",
    description:
        "Book medical transport or contact MedTrans. 24/7 emergency line available. Submit a non-emergency booking request online.",
};

const PHONE_HREF = "tel:+359888000000";
const PHONE_NUMBER = "+359 888 000 000";
const EMAIL = "info@medtrans.bg";

export default function ContactPage() {
    const t = useTranslations("Contact");

    const contactInfo = [
        {
            id: "phone",
            icon: Phone,
            title: t("c1_title"),
            value: PHONE_NUMBER,
            href: PHONE_HREF,
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

            {/* Emergency Banner */}
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
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">

                        {/* Left: Contact Info */}
                        <div className="lg:col-span-2">
                            <AnimatedContainer type="slide-in">
                                <h2 className="text-2xl font-bold text-gray-900">{t("info_title")}</h2>
                                <p className="mt-2 text-gray-600 text-sm">
                                    {t("info_desc")}
                                </p>

                                <div className="mt-6 flex flex-col gap-4">
                                    {contactInfo.map((item, idx) => {
                                        const Icon = item.icon;
                                        const content = (
                                            <AnimatedContainer
                                                type="fade"
                                                delay={0.1 * idx}
                                                className={`rounded-2xl border p-5 transition-all duration-200 ${item.highlight
                                                    ? "border-brand-red/30 bg-brand-red/5 shadow-sm hover:shadow-md"
                                                    : "border-gray-100 bg-white shadow-sm hover:shadow-md"
                                                    }`}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg}`}>
                                                        <Icon className={`h-5 w-5 ${item.iconColor}`} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                                            {item.title}
                                                        </p>
                                                        <p className={`mt-0.5 text-base font-bold ${item.highlight ? "text-brand-red" : "text-gray-900"}`}>
                                                            {item.value}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </AnimatedContainer>
                                        );

                                        return item.href ? (
                                            <a key={item.id} href={item.href} className="block group cursor-pointer">
                                                {content}
                                            </a>
                                        ) : (
                                            <div key={item.id}>{content}</div>
                                        );
                                    })}
                                </div>

                                {/* Direct Call CTA */}
                                <AnimatedContainer delay={0.4} className="mt-6 rounded-2xl bg-brand-red-dark p-6 text-white shadow-lg">
                                    <h3 className="font-bold text-lg">{t("direct_call_title")}</h3>
                                    <p className="mt-1 text-sm text-red-100">
                                        {t("direct_call_desc")}
                                    </p>
                                    <a
                                        href={PHONE_HREF}
                                        className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-brand-red shadow hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        <Phone className="h-4 w-4" />
                                        {PHONE_NUMBER}
                                    </a>
                                </AnimatedContainer>
                            </AnimatedContainer>
                        </div>

                        {/* Right: Booking Form */}
                        <div className="lg:col-span-3" id="booking">
                            <AnimatedContainer type="slide-up" delay={0.2} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {t("form_title")}
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {t("form_desc")}
                                    </p>
                                </div>
                                <BookingForm />
                            </AnimatedContainer>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
