import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
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
        <h1 className="text-[24px] font-semibold text-primary-custom mb-6">Terms of Service</h1>
        <div className="prose prose-sm text-secondary-custom space-y-4 text-[14px] leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-[18px] font-semibold text-primary-custom">1. Acceptance</h2>
          <p>By using Discoverse, you agree to these terms. If you disagree, please discontinue use.</p>
          <h2 className="text-[18px] font-semibold text-primary-custom">2. Free Tier Limits</h2>
          <p>Free accounts are limited to 5 3D simulation generations and 3 AI agent chat sessions per week. Limits reset every Monday at midnight UTC.</p>
          <h2 className="text-[18px] font-semibold text-primary-custom">3. User Content</h2>
          <p>You retain ownership of agents you create. By publishing, you grant Discoverse a license to display them to other users.</p>
          <h2 className="text-[18px] font-semibold text-primary-custom">4. Prohibited Use</h2>
          <p>Do not use the platform for harmful, illegal, or abusive purposes. We reserve the right to suspend accounts that violate these terms.</p>
          <h2 className="text-[18px] font-semibold text-primary-custom">5. Contact</h2>
          <p>For questions, contact iscillatechnologies@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
