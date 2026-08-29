import React from 'react';
import { AssessmentResult, SocialStyle } from '../types/personality';
import { STYLE_PROFILES } from '../data/styleProfiles';

interface PDFExportViewProps {
  result: AssessmentResult;
}

export const PDFExportView: React.FC<PDFExportViewProps> = ({ result }) => {
  const dominantProfile = STYLE_PROFILES[result.dominantStyle];
  const secondaryProfile = STYLE_PROFILES[result.secondaryStyle];
  const styleOrder: SocialStyle[] = ['peacock', 'eagle', 'owl', 'dove'];

  return (
    <div
      id="pdf-export-container"
      className="p-8 bg-white text-slate-900 font-sans space-y-6 max-w-[800px] mx-auto text-sm leading-normal border border-slate-200 shadow-sm"
      style={{ width: '800px' }}
    >
      {/* Header */}
      <div className="border-b-2 border-indigo-600 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
            BÁO CÁO KẾT QUẢ ĐÁNH GIÁ
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            HỒ SƠ PHONG CÁCH XÃ HỘI
          </h1>
          <p className="text-xs text-slate-500">
            Khám phá 4 Nhóm Tính Cách: Chim Công • Đại Bàng • Chim Cú • Bồ Câu
          </p>
        </div>

        <div className="text-right text-xs text-slate-600 space-y-0.5">
          <p>Họ tên: <strong className="text-slate-900">{result.userProfile.fullName || 'Khách tham gia'}</strong></p>
          {result.userProfile.email && <p>Email: {result.userProfile.email}</p>}
          {result.userProfile.phoneOrRole && <p>Chức danh/SĐT: {result.userProfile.phoneOrRole}</p>}
          <p className="text-[11px] text-slate-400">Ngày: {new Date(result.completedAt).toLocaleDateString('vi-VN')}</p>
        </div>
      </div>

      {/* Dominant & Secondary Announcement */}
      <div className="grid grid-cols-2 gap-4">
        {/* Dominant */}
        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
            ★ PHONG CÁCH CHỦ ĐẠO (DOMINANT)
          </span>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{dominantProfile.icon}</span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{dominantProfile.vietnameseName}</h2>
              <p className="text-xs text-indigo-600 font-semibold">
                Điểm: {result.scores[result.dominantStyle].total}/40 ({result.scores[result.dominantStyle].percentage}%)
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 pt-1 italic">{dominantProfile.tagline}</p>
        </div>

        {/* Secondary */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
            PHONG CÁCH PHỤ (SECONDARY)
          </span>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{secondaryProfile.icon}</span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{secondaryProfile.vietnameseName}</h2>
              <p className="text-xs text-slate-600 font-semibold">
                Điểm: {result.scores[result.secondaryStyle].total}/40 ({result.scores[result.secondaryStyle].percentage}%)
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 pt-1 italic">{secondaryProfile.tagline}</p>
        </div>
      </div>

      {/* Summary Score Table */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          BẢNG TỔNG HỢP ĐIỂM SỐ 4 NHÓM TÍNH CÁCH (40 CÂU):
        </h3>
        <table className="w-full border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="border border-slate-300 p-2 text-left">Nhóm Phong Cách</th>
              <th className="border border-slate-300 p-2 text-center">Mạnh (Câu 1-20)</th>
              <th className="border border-slate-300 p-2 text-center">Yếu (Câu 21-40)</th>
              <th className="border border-slate-300 p-2 text-center">Tổng Điểm</th>
              <th className="border border-slate-300 p-2 text-center">Tỷ Lệ %</th>
            </tr>
          </thead>
          <tbody>
            {styleOrder.map((key) => {
              const profile = STYLE_PROFILES[key];
              const score = result.scores[key];
              const isDominant = key === result.dominantStyle;

              return (
                <tr key={key} className={isDominant ? 'bg-indigo-50/50 font-bold' : ''}>
                  <td className="border border-slate-300 p-2">
                    {profile.icon} {profile.vietnameseName} {isDominant && '(Chủ đạo)'}
                  </td>
                  <td className="border border-slate-300 p-2 text-center">{score.strength}</td>
                  <td className="border border-slate-300 p-2 text-center">{score.weakness}</td>
                  <td className="border border-slate-300 p-2 text-center font-bold">{score.total}</td>
                  <td className="border border-slate-300 p-2 text-center font-bold text-indigo-700">
                    {score.percentage}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Deep Dive 3 Dimensions for Dominant Style */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          PHÂN TÍCH 3 CHIỀU CHO PHONG CÁCH CHỦ ĐẠO ({dominantProfile.vietnameseName}):
        </h3>

        <div className="grid grid-cols-3 gap-3 text-xs">
          {/* Emotion */}
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5">
            <h4 className="font-bold text-indigo-700">1. Cảm Xúc</h4>
            <div className="space-y-1 text-slate-700">
              <p className="font-semibold text-[11px] text-emerald-700">Điểm mạnh:</p>
              <ul className="list-disc list-inside text-[11px] space-y-0.5">
                {dominantProfile.strengths.emotion.slice(0, 3).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <p className="font-semibold text-[11px] text-rose-700 pt-1">Cần lưu ý:</p>
              <ul className="list-disc list-inside text-[11px] space-y-0.5">
                {dominantProfile.weaknesses.emotion.slice(0, 2).map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Work */}
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5">
            <h4 className="font-bold text-indigo-700">2. Công Việc</h4>
            <div className="space-y-1 text-slate-700">
              <p className="font-semibold text-[11px] text-emerald-700">Điểm mạnh:</p>
              <ul className="list-disc list-inside text-[11px] space-y-0.5">
                {dominantProfile.strengths.work.slice(0, 3).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <p className="font-semibold text-[11px] text-rose-700 pt-1">Cần lưu ý:</p>
              <ul className="list-disc list-inside text-[11px] space-y-0.5">
                {dominantProfile.weaknesses.work.slice(0, 2).map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Friends */}
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5">
            <h4 className="font-bold text-indigo-700">3. Bạn Bè & Quan Hệ</h4>
            <div className="space-y-1 text-slate-700">
              <p className="font-semibold text-[11px] text-emerald-700">Điểm mạnh:</p>
              <ul className="list-disc list-inside text-[11px] space-y-0.5">
                {dominantProfile.strengths.friends.slice(0, 3).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <p className="font-semibold text-[11px] text-rose-700 pt-1">Cần lưu ý:</p>
              <ul className="list-disc list-inside text-[11px] space-y-0.5">
                {dominantProfile.weaknesses.friends.slice(0, 2).map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Advice */}
      <div className="grid grid-cols-2 gap-3 text-xs pt-1">
        <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/60 space-y-1">
          <h4 className="font-bold text-amber-800">💡 Gợi Ý Phát Triển Bản Thân:</h4>
          <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5">
            {dominantProfile.growthTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="p-3 rounded-lg border border-teal-200 bg-teal-50/60 space-y-1">
          <h4 className="font-bold text-teal-800">🤝 Bí Quyết Làm Việc Đội Ngũ:</h4>
          <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5">
            {dominantProfile.collaborationTips.map((collab, i) => (
              <li key={i}>{collab.advice}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-[10px] text-slate-400">
        <span>Hồ Sơ Phong Cách Xã Hội • Hệ thống khảo sát đánh giá năng lực & tính cách</span>
        <span>Bản quyền nội dung © 2026</span>
      </div>
    </div>
  );
};
