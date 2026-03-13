"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, Check, Activity, Users, Repeat, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { LocationAutocomplete } from "./LocationAutocomplete";

interface Settlement {
    n: string;
    t: string;
    p: string;
    v: number;
    lat: number;
    lng: number;
}

// Distance Calculation (Haversine Formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Math.round(d);
}

export function PriceEstimator() {
    const t = useTranslations("PriceEstimator");
    const tCommon = useTranslations("Common");

    // State
    const [pickup, setPickup] = useState<Settlement | null>(null);
    const [destination, setDestination] = useState<Settlement | null>(null);
    const [distance, setDistance] = useState(10);
    const [needsStairs, setNeedsStairs] = useState(false);
    const [needsMedical, setNeedsMedical] = useState(false);
    const [isTwoWay, setIsTwoWay] = useState(false);
    const [phone, setPhone] = useState("");

    // Calculate distance automatically
    useEffect(() => {
        if (pickup && destination) {
            const d = calculateDistance(pickup.lat, pickup.lng, destination.lat, destination.lng);
            // Add 15% buffer for actual road distance
            setDistance(Math.max(5, Math.round(d * 1.15)));
        }
    }, [pickup, destination]);

    // Pricing Logic
    const [estimate, setEstimate] = useState({ min: 0, max: 0 });

    useEffect(() => {
        let base = 50;
        let perKm = 1.6;
        let total = base + (distance * perKm);

        if (needsStairs) total += 30;
        if (needsMedical) total += 120;
        if (isTwoWay) total *= 1.8;

        setEstimate({
            min: Math.floor(total * 0.95),
            max: Math.ceil(total * 1.1)
        });
    }, [distance, needsStairs, needsMedical, isTwoWay]);

    return (
        <section className="relative py-24 overflow-hidden bg-white">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-3xl opacity-50" />

            <div className="container-max px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Visual Copy */}
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-block text-brand-red font-bold uppercase tracking-widest text-sm mb-4"
                        >
                            {tCommon("available_24_7")}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-8"
                        >
                            {t("title").split(" ").map((word, i) => (
                                <span key={i} className={cn(word.toLowerCase() === "price" || word.toLowerCase() === "цена" ? "text-brand-red" : "")}>
                                    {word}{" "}
                                    {i === 2 && <br />}
                                </span>
                            ))}
                        </motion.h2>

                        {/* Vehicle Showcase */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                { img: "ambulance-standard.png", label: "Standard" },
                                { img: "ambulance-icu.png", label: "Intensive Care" }
                            ].map((v, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="bg-gray-50 p-4 rounded-3xl border border-gray-100 group"
                                >
                                    <div className="relative h-24 mb-3 overflow-hidden rounded-xl">
                                        <Image
                                            src={`/images/fleet/${v.img}`}
                                            alt={v.label}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-red transition-colors">
                                        {v.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-600 leading-relaxed"
                        >
                            {t("disclaimer")}
                        </motion.p>
                    </div>

                    {/* The Calculator Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative group h-full"
                    >
                        {/* Glowing shadow effect */}
                        <div className="absolute inset-0 bg-brand-red/20 blur-[100px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative bg-white/70 backdrop-blur-2xl border border-white p-8 lg:p-12 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1),0_16px_32px_-8px_rgba(220,38,38,0.1)] overflow-hidden">
                            {/* Inputs */}
                            <div className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <LocationAutocomplete
                                        label={t("pickup")}
                                        value={pickup ? pickup.n : ""}
                                        onChange={setPickup}
                                        placeholder={t("search_placeholder")}
                                    />
                                    <LocationAutocomplete
                                        label={t("destination")}
                                        value={destination ? destination.n : ""}
                                        onChange={setDestination}
                                        placeholder={t("search_placeholder")}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Estimated Distance</label>
                                        <div className="flex items-center gap-2">
                                            {pickup && destination && (
                                                <motion.span
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="bg-green-500/10 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase"
                                                >
                                                    Calculated
                                                </motion.span>
                                            )}
                                            <span className="text-brand-red font-black text-lg">{distance} km</span>
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="5"
                                        max="1000"
                                        step="5"
                                        value={distance}
                                        onChange={(e) => setDistance(Number(e.target.value))}
                                        className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-red"
                                    />
                                </div>

                                {/* Toggles */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <ToggleButton
                                        active={needsStairs}
                                        onClick={() => setNeedsStairs(!needsStairs)}
                                        icon={Activity}
                                        label={t("stairs")}
                                    />
                                    <ToggleButton
                                        active={needsMedical}
                                        onClick={() => setNeedsMedical(!needsMedical)}
                                        icon={Users}
                                        label={t("medical_team")}
                                    />
                                    <ToggleButton
                                        active={isTwoWay}
                                        onClick={() => setIsTwoWay(!isTwoWay)}
                                        icon={Repeat}
                                        label={t("two_way")}
                                    />
                                </div>

                                <div className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent my-8" />

                                {/* Result Area */}
                                <div className="text-center space-y-2">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{t("price_range")}</div>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight">
                                            {estimate.min} - {estimate.max}
                                        </span>
                                        <span className="text-2xl font-bold text-brand-red">BGN</span>
                                    </div>
                                    <p className="italic text-gray-400 text-sm mt-2 font-medium">
                                        {tCommon("starting_from")} {estimate.min} BGN
                                    </p>
                                </div>

                                {/* Lead Gen */}
                                <div className="pt-8 space-y-4">
                                    <div className="relative group/input">
                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within/input:text-brand-red transition-colors" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder={t("phone_placeholder")}
                                            className="w-full bg-white border border-gray-100 p-6 pl-16 rounded-[2rem] text-lg font-bold shadow-sm focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red transition-all outline-none"
                                        />
                                    </div>
                                    <button className="w-full bg-brand-red text-white p-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(220,38,38,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(220,38,38,0.5)] active:scale-[0.98] transition-all group overflow-hidden relative">
                                        <span className="relative z-10 transition-transform group-hover:-translate-x-1">{t("cta")}</span>
                                        <ArrowRight className="h-6 w-6 relative z-10 transition-transform group-hover:translate-x-1" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ToggleButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all duration-300",
                active
                    ? "bg-brand-red text-white shadow-[0_8px_16px_rgba(220,38,38,0.3)] scale-105"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            )}
        >
            <Icon className={cn("h-4 w-4", active ? "text-white" : "text-gray-400")} />
            {label}
            {active && <Check className="h-3 w-3 animate-bounce-in" />}
        </button>
    );
}
