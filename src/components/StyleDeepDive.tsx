import React, { useState } from 'react';
import { StyleProfile, SocialStyle } from '../types/personality';
import { Heart, Briefcase, Users, CheckCircle, AlertTriangle, Lightbulb, MessageSquare, Handshake } from 'lucide-react';

interface StyleDeepDiveProps {
  profile: StyleProfile;
  isDominant?: boolean;
}

export const StyleDeepDive: React.FC<StyleDeepDiveProps> = ({ profile, isDominant = false }) => {
  const [activeTab, setActiveTab] = useState<'emotion' | 'work' | 'friends'>('emotion');

  const dimensionLabels = {
    emotion: { label: 'Cảm Xúc', icon: Heart },
    work: { label: 'Công Việc', icon: Briefcase },
    friends: { label: 'Bạn Bè & Quan Hệ', icon: Users }
  };

  return (
    <div className={`glass-card rounded-2xl border p-6 sm:p-8 space-y-6 ${profile.color.border}`}>
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-3xl shadow-lg">
            {profile.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {profile.vietnameseName}
              </h3>
              {isDominant && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  CHỦ ĐẠO
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {profile.englishStyle} • {profile.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
        {profile.overview}
      </p>

      {/* 3 Dimension Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          {(['emotion', 'work', 'friends'] as const).map((tabKey) => {
            const tab = dimensionLabels[tabKey];
            const Icon = tab.icon;
            const isActive = activeTab === tabKey;

            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content: Strengths vs Weaknesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths Column */}
          <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>ĐIỂM MẠNH & ƯU THẾ</span>
            </div>
            <ul className="space-y-2">
              {profile.strengths[activeTab].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses Column */}
          <div className="p-4 sm:p-5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3">
            <div className="flex items-center gap-2 font-bold text-rose-400 text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>ĐIỂM HẠN CHẾ CẦN LƯU Ý</span>
            </div>
            <ul className="space-y-2">
              {profile.weaknesses[activeTab].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Practical Tips Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Growth Tips */}
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-xs sm:text-sm">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Gợi Ý Phát Triển Bản Thân</span>
          </div>
          <ul className="space-y-1.5">
            {profile.growthTips.map((tip, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Communication Tips */}
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-indigo-400 text-xs sm:text-sm">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span>Bí Quyết Giao Tiếp Hiệu Quả</span>
          </div>
          <ul className="space-y-1.5">
            {profile.communicationTips.map((tip, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Collaboration with Other Styles */}
      <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2.5">
        <div className="flex items-center gap-2 font-bold text-teal-400 text-xs sm:text-sm">
          <Handshake className="w-4 h-4 text-teal-400" />
          <span>Cách Làm Việc & Phối Hợp Hiệu Quả Với 3 Nhóm Còn Lại</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {profile.collaborationTips.map((collab, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
              <p className="leading-relaxed">{collab.advice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
