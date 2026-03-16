import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const PHONE_PLEVEN = "0890 150 160";
const PHONE_PLEVEN_HREF = "tel:+359890150160";
const PHONE_TARNOVO = "0888 645 380";
const PHONE_TARNOVO_HREF = "tel:+359888645380";
const EMAIL = "lineika-medtrans@abv.bg";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const t = useTranslations("Common");
    const tNav = useTranslations("Nav");
    const tHome = useTranslations("Home");

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 shrink-0 group mb-6">
                            <div className="relative h-10 w-10 shrink-0">
                                <Image
                                    src="/images/logo.png"
                                    alt="MedTrans Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">
                                Med<span className="text-brand-red">Trans</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            {t("footer_description")}
                        </p>
                        <div className="mt-4 flex items-center gap-2 rounded-lg bg-brand-red/20 px-3 py-2 text-brand-red border border-brand-red/30">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm font-semibold">{t("available_24_7")}</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                            {t("quick_links")}
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { href: "/", label: tNav("home") },
                                { href: "/services", label: tNav("services") },
                                { href: "/fleet", label: tNav("fleet") },
                                { href: "/contact", label: tNav("contact") },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href as Parameters<typeof Link>[0]["href"]}
                                        className="text-sm text-gray-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                            {tNav("services")}
                        </h3>
                        <ul className="space-y-2">
                            {[
                                tHome("s1_title"),
                                tHome("s2_title"),
                                tHome("s3_title"),
                                tHome("s4_title")
                            ].map((service) => (
                                <li key={service}>
                                    <Link
                                        href="/services"
                                        className="text-sm text-gray-400 transition-colors hover:text-white"
                                    >
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                            {t("contact_us")}
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href={PHONE_PLEVEN_HREF}
                                    className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-brand-red"
                                >
                                    <Phone className="h-4 w-4 text-brand-red flex-shrink-0" />
                                    <div><span className="text-xs text-gray-500 mr-1">Плевен</span> <span className="font-medium">{PHONE_PLEVEN}</span></div>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={PHONE_TARNOVO_HREF}
                                    className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-brand-red"
                                >
                                    <Phone className="h-4 w-4 text-brand-red flex-shrink-0 opacity-0" />
                                    <div><span className="text-xs text-gray-500 mr-1">В. Търново</span> <span className="font-medium">{PHONE_TARNOVO}</span></div>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-brand-red"
                                >
                                    <Mail className="h-4 w-4 text-brand-red flex-shrink-0" />
                                    <span>{EMAIL}</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-400">
                                <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                                <span>Pleven & Veliko Tarnovo, Bulgaria</span>
                            </li>
                        </ul>
                        <a
                            href={PHONE_PLEVEN_HREF}
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-bold text-white shadow transition-all hover:bg-brand-red-dark"
                        >
                            <Phone className="h-4 w-4" />
                            {t("call_emergency")}
                        </a>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        &copy; {currentYear} {t("all_rights_reserved")} | Designed by <a href="https://boragoweb.com" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:text-brand-red-dark transition-colors font-semibold">BoragoWeb</a>
                    </p>
                    <p className="text-xs text-gray-600">
                        {t("professional_services")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
