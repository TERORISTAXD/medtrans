"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X, Ambulance, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";

const PHONE_NUMBER = "+359 888 000 000";
const PHONE_HREF = "tel:+359888000000";

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("Nav");
    const tCommon = useTranslations("Common");
    const locale = useLocale();

    const languages = {
        bg: { flag: "/images/flags/bg.svg", label: "Български" },
        en: { flag: "/images/flags/en.svg", label: "English" },
    };

    const navLinks = [
        { href: "/", label: t("home") },
        { href: "/services", label: t("services") },
        { href: "/fleet", label: t("fleet") },
        { href: "/contact", label: t("contact") },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setLangOpen(false);
    }, [pathname]);

    const switchLanguage = (newLocale: "bg" | "en") => {
        router.replace(pathname, { locale: newLocale });
        setLangOpen(false);
    };

    return (
        <>
            <header
                className={cn(
                    "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                    scrolled
                        ? "bg-white/95 border-b border-gray-100 backdrop-blur-md"
                        : "bg-white shadow-sm"
                )}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between gap-4 sm:h-18">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-red text-white">
                                <Ambulance className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-lg font-bold text-gray-900 tracking-tight">
                                    MedTrans
                                </span>
                                <span className="text-[10px] font-medium text-gray-500 tracking-widest uppercase -mt-0.5 hidden sm:block">
                                    Medical Transport
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href as any}
                                    className={cn(
                                        "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150",
                                        pathname === link.href
                                            ? "bg-brand-red/10 text-brand-red font-semibold"
                                            : "text-gray-900 hover:text-brand-red hover:bg-brand-red/5"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA + Language + Mobile Toggle */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Language Switcher */}
                            <div className="relative">
                                <button
                                    onClick={() => setLangOpen(!langOpen)}
                                    className="flex h-9 items-center gap-2 rounded-full border border-gray-200 px-2.5 hover:bg-gray-100 focus:outline-none transition-all duration-200"
                                    aria-expanded={langOpen}
                                    title={languages[locale as keyof typeof languages]?.label}
                                >
                                    <div className="relative h-5 w-7 overflow-hidden rounded-sm shadow-sm">
                                        <img
                                            src={languages[locale as keyof typeof languages]?.flag}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </button>

                                {langOpen && (
                                    <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl bg-white p-1 shadow-xl ring-1 ring-black/5 focus:outline-none">
                                        <div className="py-0.5">
                                            <button
                                                onClick={() => switchLanguage("bg")}
                                                className={cn(
                                                    "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-100 hover:text-brand-red",
                                                    locale === "bg" ? "bg-brand-red/5 text-brand-red font-semibold" : "text-gray-700"
                                                )}
                                            >
                                                <img src="/images/flags/bg.svg" alt="" className="h-3.5 w-5 rounded-sm object-cover shadow-sm" />
                                                <span>Български</span>
                                            </button>
                                            <button
                                                onClick={() => switchLanguage("en")}
                                                className={cn(
                                                    "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-100 hover:text-brand-red",
                                                    locale === "en" ? "bg-brand-red/5 text-brand-red font-semibold" : "text-gray-700"
                                                )}
                                            >
                                                <img src="/images/flags/en.svg" alt="" className="h-3.5 w-5 rounded-sm object-cover shadow-sm" />
                                                <span>English</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Call 24/7 — always visible */}
                            <a
                                href={PHONE_HREF}
                                className="pulse-ring relative flex items-center gap-2 rounded-lg bg-brand-red px-3 py-2 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-brand-red-dark hover:shadow-lg sm:px-4 sm:py-2.5"
                                aria-label={`Call us now: ${PHONE_NUMBER}`}
                            >
                                <Phone className="h-4 w-4 animate-pulse-slow" />
                                <span className="hidden sm:inline">{tCommon("call_24_7")}</span>
                                <span className="sm:hidden">{tCommon("call_now")}</span>
                            </a>

                            {/* Mobile hamburger */}
                            <button
                                className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
                                onClick={() => setMobileOpen((v) => !v)}
                                aria-label="Toggle menu"
                                aria-expanded={mobileOpen}
                            >
                                {mobileOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="border-t border-gray-100 bg-white md:hidden animate-fade-in">
                        <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href as any}
                                    className={cn(
                                        "rounded-md px-4 py-3 text-base font-medium transition-colors",
                                        pathname === link.href
                                            ? "bg-brand-red/10 text-brand-red font-semibold"
                                            : "text-gray-700 hover:bg-gray-50"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <a
                                href={PHONE_HREF}
                                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-brand-red px-4 py-3 text-base font-bold text-white"
                            >
                                <Phone className="h-4 w-4" />
                                {PHONE_NUMBER}
                            </a>
                        </nav>
                    </div>
                )}
            </header>
            {/* Spacer so content starts below fixed header */}
            <div className="h-16 sm:h-18" aria-hidden="true" />
        </>
    );
}
