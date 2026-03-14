import { useTranslations } from "next-intl";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import {
    Ambulance,
    Phone,
    CheckCircle,
    Wind,
    Activity,
    Heart,
    Thermometer,
    Shield,
} from "lucide-react";
import Image from "next/image";

const PHONE_HREF = "tel:+359890150160";

export default function FleetPage() {
    const t = useTranslations("Fleet");
    const tCommon = useTranslations("Common");

    const vehicles = [
        {
            id: "type-a",
            name: t("v1_name"),
            category: t("v1_cat"),
            categoryColor: "bg-brand-red text-white",
            description: t("v1_desc"),
            specs: [t("v1_f1"), t("v1_f2"), t("v1_f3"), t("v1_f4"), t("v1_f5"), t("v1_f6")],
            gradient: "from-brand-red to-red-700",
            image: "/images/fleet/standard.jpg",
        },
        {
            id: "type-b",
            name: t("v2_name"),
            category: t("v2_cat"),
            categoryColor: "bg-brand-red text-white",
            description: t("v2_desc"),
            specs: [t("v2_f1"), t("v2_f2"), t("v2_f3"), t("v2_f4"), t("v2_f5"), t("v2_f6")],
            gradient: "from-brand-red-dark to-brand-red",
            image: "/images/fleet/reanimobile.jpg",
        }
    ];

    const equipment = [
        {
            icon: Activity,
            name: t("e1_name"),
            description: t("e1_desc"),
            color: "text-brand-red",
            bg: "bg-brand-red/10",
        },
        {
            icon: Wind,
            name: t("e2_name"),
            description: t("e2_desc"),
            color: "text-brand-red",
            bg: "bg-brand-red/10",
        },
        {
            icon: Shield,
            name: t("e3_name"),
            description: t("e3_desc"),
            color: "text-brand-red",
            bg: "bg-brand-red/10",
        },
        {
            icon: Ambulance,
            name: t("e4_name"),
            description: t("e4_desc"),
            color: "text-brand-red",
            bg: "bg-brand-red/10",
        },
        {
            icon: Thermometer,
            name: t("e5_name"),
            description: t("e5_desc"),
            color: "text-brand-red",
            bg: "bg-brand-red/10",
        },
        {
            icon: Heart,
            name: t("e6_name"),
            description: t("e6_desc"),
            color: "text-brand-red",
            bg: "bg-brand-red/10",
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


            {/* Vehicle Gallery */}
            <section className="section-padding bg-trust-white">
                <div className="container-max">
                    <AnimatedContainer className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t("cat_title")}</h2>
                        <p className="mt-3 text-gray-600 max-w-xl mx-auto text-lg lowercase first-letter:uppercase">
                            {t("cat_desc")}
                        </p>
                    </AnimatedContainer>

                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                        {vehicles.map((vehicle, i) => (
                            <AnimatedContainer
                                key={vehicle.id}
                                delay={0.1 * i}
                                className="card-hover group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg flex flex-col h-full"
                            >
                                {/* Vehicle Visual */}
                                <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                                    <Image
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="inline-block rounded-full px-4 py-1 text-sm font-bold bg-white text-brand-red shadow-lg">
                                            {vehicle.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Vehicle Info */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{vehicle.name}</h3>
                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        {vehicle.description}
                                    </p>

                                    <div className="mt-auto">
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-8">
                                            {vehicle.specs.map((spec) => (
                                                <li key={spec} className="flex items-start gap-2.5 text-sm text-gray-750 font-medium">
                                                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                    {spec}
                                                </li>
                                            ))}
                                        </div>
                                        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                                            <a
                                                href={PHONE_HREF}
                                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-red px-6 py-4 text-lg font-bold text-white shadow-md hover:bg-brand-red-dark transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                                            >
                                                <Phone className="h-5 w-5" />
                                                {tCommon("enquire")}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedContainer>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipment Section */}
            <section className="section-padding bg-white">
                <div className="container-max">
                    <AnimatedContainer className="text-center mb-12">
                        <span className="text-sm font-semibold uppercase tracking-widest text-brand-red">
                            {t("eq_badge")}
                        </span>
                        <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                            {t("eq_title")}
                        </h2>
                        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                            {t("eq_desc")}
                        </p>
                    </AnimatedContainer>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {equipment.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <AnimatedContainer
                                    key={item.name}
                                    delay={0.1 * i}
                                    className="card-hover flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                                >
                                    <div className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}>
                                        <Icon className={`h-6 w-6 ${item.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                                        <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                                    </div>
                                </AnimatedContainer>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Fleet Standards Banner */}
            <section className="bg-brand-red-dark py-12">
                <AnimatedContainer type="scale" className="container-max px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between tracking-wide">
                        <div className="text-white">
                            <h2 className="text-2xl font-bold">{t("banner_title")}</h2>
                            <p className="mt-2 text-red-100">
                                {t("banner_desc")}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={PHONE_HREF}
                                className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-brand-red-dark transition-all cursor-pointer"
                            >
                                <Phone className="h-4 w-4" />
                                {tCommon("call_now")}
                            </a>
                        </div>
                    </div>
                </AnimatedContainer>
            </section>
        </>
    );
}
