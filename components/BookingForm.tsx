"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { submitBooking, type BookingFormData } from "@/app/actions/submitBooking";
import {
    User,
    Phone,
    MapPin,
    Calendar,
    Clock,
    MessageSquare,
    Loader2,
    Send,
    CheckCircle,
} from "lucide-react";

const initialFormData: BookingFormData = {
    full_name: "",
    phone: "",
    pickup: "",
    dropoff: "",
    transport_date: "",
    transport_time: "",
    wheelchair: false,
    stretcher: false,
    notes: "",
};

export function BookingForm() {
    const [formData, setFormData] = useState<BookingFormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const t = useTranslations("Contact");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await submitBooking(formData);

            if (result.success) {
                toast.success(t("success_title"), { duration: 6000 });
                setSubmitted(true);
                setFormData(initialFormData);
            } else {
                toast.error(result.error, { duration: 5000 });
            }
        } catch {
            toast.error("Something went wrong. Please call us.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center animate-fade-in">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t("success_title")}</h3>
                <p className="max-w-sm text-gray-600">
                    {t("success_desc")}
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-sm font-medium text-brand-red hover:underline"
                >
                    {t("success_btn")}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up">
            {/* Name + Phone */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                    <label
                        htmlFor="full_name"
                        className="block text-sm font-semibold text-gray-700"
                    >
                        {t("f_name")} <span className="text-brand-red">*</span>
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            id="full_name"
                            name="full_name"
                            type="text"
                            required
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder={t("f_name_p")}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700"
                    >
                        {t("f_phone")} <span className="text-brand-red">*</span>
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+359 888 123 456"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20"
                        />
                    </div>
                </div>
            </div>

            {/* Pickup + Dropoff */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                    <label
                        htmlFor="pickup"
                        className="block text-sm font-semibold text-gray-700"
                    >
                        {t("f_pickup")} <span className="text-brand-red">*</span>
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
                        <input
                            id="pickup"
                            name="pickup"
                            type="text"
                            required
                            value={formData.pickup}
                            onChange={handleChange}
                            placeholder={t("f_pickup_p")}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="dropoff"
                        className="block text-sm font-semibold text-gray-700"
                    >
                        {t("f_drop")} <span className="text-brand-red">*</span>
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-red" />
                        <input
                            id="dropoff"
                            name="dropoff"
                            type="text"
                            required
                            value={formData.dropoff}
                            onChange={handleChange}
                            placeholder={t("f_pickup_p")}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20"
                        />
                    </div>
                </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                    <label
                        htmlFor="transport_date"
                        className="block text-sm font-semibold text-gray-700"
                    >
                        {t("f_date")} <span className="text-brand-red">*</span>
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            id="transport_date"
                            name="transport_date"
                            type="date"
                            required
                            value={formData.transport_date}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="transport_time"
                        className="block text-sm font-semibold text-gray-700"
                    >
                        {t("f_time")} <span className="text-brand-red">*</span>
                    </label>
                    <div className="relative">
                        <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            id="transport_time"
                            name="transport_time"
                            type="time"
                            required
                            value={formData.transport_time}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20"
                        />
                    </div>
                </div>
            </div>

            {/* Equipment Needs */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="mb-3 text-sm font-semibold text-gray-700">
                    {t("f_eq")}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                    <label className="flex cursor-pointer items-center gap-3 group">
                        <input
                            id="wheelchair"
                            name="wheelchair"
                            type="checkbox"
                            checked={formData.wheelchair}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-brand-red accent-brand-red"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                            ♿ {t("f_wg")}
                        </span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 group">
                        <input
                            id="stretcher"
                            name="stretcher"
                            type="checkbox"
                            checked={formData.stretcher}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-brand-red accent-brand-red"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                            🛏️ {t("f_st")}
                        </span>
                    </label>
                </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
                <label
                    htmlFor="notes"
                    className="block text-sm font-semibold text-gray-700"
                >
                    {t("f_notes")} <span className="font-normal text-gray-400">{t("f_notes_opt")}</span>
                </label>
                <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder={t("f_notes_p")}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 resize-none"
                    />
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {t("submitting")}
                    </>
                ) : (
                    <>
                        <Send className="h-5 w-5" />
                        {t("submit_btn")}
                    </>
                )}
            </button>

            <p className="text-center text-xs text-gray-400">
                {t("form_disclaimer")}
            </p>
        </form>
    );
}
