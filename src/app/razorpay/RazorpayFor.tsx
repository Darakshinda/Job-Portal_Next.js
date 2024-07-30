"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from './RazorpayForm.module.css';

// Define the type for the jobs prop
interface Jobs {
  name: string;
  price: number;
  img: string;
}

interface RazorpayFormProps {
  jobs: Jobs;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const RazorpayForm: React.FC<RazorpayFormProps> = ({ jobs }) => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay script loaded successfully");
        script.onerror = () => console.log("Failed to load Razorpay script");
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleRazorpayPayment = async () => {
        try {
            console.log("Razorpay payment processing");
            const orderUrl = process.env.NEXT_PUBLIC_ORDER_URL;
            console.log("Order URL:", orderUrl);

            // Replace the orderUrl with your server endpoint
            const { data } = await axios.post(orderUrl, { amount: jobs.price, userId: "123456" });
            console.log("Order data:", data);

            const options = {
                key: "rzp_test_DL8XNF5TE9MW4P", // Your Razorpay key ID
                amount: data.data.amount,
                currency: data.data.currency,
                name: jobs.name,
                description: "Test Transaction",
                image: jobs.img,
                order_id: data.data.id,
                handler: async (response: RazorpayResponse) => {
                    try {
                        const verifyUrl = process.env.NEXT_PUBLIC_VERIFY_URL;
                        console.log("Verify URL:", verifyUrl);

                        // Replace the URL with your server endpoint
                        const { data } = await axios.post(verifyUrl, response);
                        console.log("Verification data:", data);
                    } catch (error) {
                        console.log("Verification error:", error.response?.data || error.message);
                    }
                },
                theme: {
                    color: "#3399cc",
                },
            };
            console.log("Razorpay options:", options);

            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.log("Error processing payment:", error.response?.data || error.message);
            setError("Error processing payment with Razorpay");
        }
    };

    const [job, setJob] = useState<Jobs>({
        name: "Razorpay Integration",
        img: "https://akaunting.com/public/assets/media/54-mark-britto/razorpay/razorpay-logo.jpg",
        price: 350,
    });

    return (
        <div>
            {error && <div className={styles.error}>{error}</div>}
            <button onClick={handleRazorpayPayment} disabled={jobs.price <= 0} className={styles.button}>
                Pay <span>&#x20B9; {job.price}</span> with Razorpay
            </button>
        </div>
    );
};

export default RazorpayForm;
