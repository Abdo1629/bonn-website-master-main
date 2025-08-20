"use client";

import { useTranslation } from "react-i18next";
import { FaEye, FaDownload } from "react-icons/fa";

export default function CertificatesPage() {
  const { t } = useTranslation();

  const certificates = [
    {
      id: 1,
      title: "ISO 9001 Certification",
      file: "/certificates/ISO9001.pdf",
      preview: "/certificates/cert1.png",
    },
    {
      id: 2,
      title: "ISO 22000 Certification",
      file: "/certificates/ISO22000.pdf",
      preview: "/certificates/cert2.png",
    },
    {
      id: 3,
      title: "HACCP Certification",
      file: "/certificates/HACCPCertificate.pdf",
      preview: "/certificates/cert3.png",
    },
    {
      id: 4,
      title: "SA55116H Certification",
      file: "/certificates/SA55116H.pdf",
      preview: "/certificates/cert4.png",
    },
  ];

  return (
    <div className="w-full">
      {/* 2. Certificates Grid */}
      <section className="py-20 px-6 md:px-12 bg-[#F4F8FF]">
        <h2 className="text-4xl font-bold text-[#0056D2] mb-14 text-center">
          {t("certifications") || "الشهادات"}
        </h2>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group bg-white border border-[#E0E7FF] rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col overflow-hidden"
            >
              {/* Preview Image */}
              <div className="relative w-full h-60 overflow-hidden">
                <img
                  src={cert.preview}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Title */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg text-[#003D99] mb-4 text-center">
                  {cert.title}
                </h3>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-4 mt-auto">
                  {/* View */}
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-[#0056D2] text-white hover:bg-[#003D99] transition"
                  >
                    <FaEye className="text-lg" />
                  </a>

                  {/* Download */}
                  <a
                    href={cert.file}
                    download
                    className="p-3 rounded-full bg-[#0056D2] text-white hover:bg-[#003D99] transition"
                  >
                    <FaDownload className="text-lg" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
