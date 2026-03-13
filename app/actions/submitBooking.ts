"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabase";

const bookingSchema = z.object({
    full_name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(7, "Please enter a valid phone number"),
    pickup: z.string().min(3, "Please enter a pickup location"),
    dropoff: z.string().min(3, "Please enter a drop-off location"),
    transport_date: z.string().min(1, "Please select a date"),
    transport_time: z.string().min(1, "Please select a time"),
    wheelchair: z.boolean().optional().default(false),
    stretcher: z.boolean().optional().default(false),
    notes: z.string().optional().default(""),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export type BookingResult =
    | { success: true; message: string }
    | { success: false; error: string };

export async function submitBooking(formData: BookingFormData): Promise<BookingResult> {
    try {
        const validated = bookingSchema.parse(formData);

        const { error } = await supabase.from("transport_requests").insert([
            {
                full_name: validated.full_name,
                phone: validated.phone,
                pickup: validated.pickup,
                dropoff: validated.dropoff,
                transport_date: validated.transport_date,
                transport_time: validated.transport_time,
                wheelchair: validated.wheelchair,
                stretcher: validated.stretcher,
                notes: validated.notes || null,
            },
        ]);

        if (error) {
            console.error("Supabase error:", error);
            return {
                success: false,
                error: "Database error. Please call us directly or try again.",
            };
        }

        return {
            success: true,
            message:
                "✅ Booking request received! We will contact you shortly to confirm.",
        };
    } catch (err) {
        if (err instanceof z.ZodError) {
            return {
                success: false,
                error: err.errors[0]?.message ?? "Invalid form data.",
            };
        }
        console.error("Unexpected error:", err);
        return {
            success: false,
            error: "An unexpected error occurred. Please try again or call us.",
        };
    }
}
