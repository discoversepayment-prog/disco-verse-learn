import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background px-5 py-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-[13px] text-secondary-custom hover:text-primary-custom mb-6">
          <ArrowLeft size={14} /> Back
        </button>
        <div className="flex items-center gap-2 mb-6">
          <Logo size={24} />
          <span className="text-[16px] font-semibold text-primary-custom">Discoverse</span>
        </div>
        <h1 className="text-[24px] font-semibold text-primary-custom mb-6">Privacy Policy</h1>
        <div className="prose prose-sm text-secondary-custom space-y-4 text-[14px] leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-[18px] font-semibold text-primary-custom">1. Information We Collect</h2>
          <p>We collect information you provide when creating an account (name, email), usage data (simulations viewed, agents used), and technical data (device type, browser).</p>
          <h2 className="text-[18px] font-semibold text-primary-custom">2. How We Use Your Information</h2>
          <p>To provide and improve the platform, personalize your learning experience, communicate with you, and ensure security.</p>
          <h2 className="text-[18px] font-semibold text-primary-custom">3. Data Sharing</h2>
          <p>We do not sell your personal data. We may share data with service providers who help operate our platform.</p>
          <h2 className="text-[18px] font-semibold text-primary-custom">4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your information.</p>
          <h2 className="text-[18px] font-semibold text-primary-custom">5. Contact</h2>
          <p>For privacy inquiries, contact us at iscillatechnologies@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
