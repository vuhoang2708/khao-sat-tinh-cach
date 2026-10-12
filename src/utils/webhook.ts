import { AssessmentResult } from '../types/personality';

// Google Apps Script Webhook URL chính thức của Delivering Happiness (đồng bộ về Google Sheets CRM & Leads_Directory)
export const WEBHOOK_URL =
  ((import.meta as any).env?.VITE_WEBHOOK_URL as string) ||
  'https://script.google.com/macros/s/AKfycbw0vTBMod1rp4f_906BcjwXbPhlb9ltiDiwVPdaOg4fOWZZOlpmy7jp2fOSrETQQe9PZQ/exec';

export async function submitAssessmentData(result: AssessmentResult): Promise<boolean> {
  const eagleScore = result.scores?.eagle?.total ?? 0;
  const peacockScore = result.scores?.peacock?.total ?? 0;
  const doveScore = result.scores?.dove?.total ?? 0;
  const owlScore = result.scores?.owl?.total ?? 0;
  const resultSummary = `Phong cách chủ đạo: ${result.dominantStyle} (Bổ trợ: ${result.secondaryStyle || 'N/A'}) • Điểm: Đại bàng(Driver)=${eagleScore}, Chim công(Expressive)=${peacockScore}, Bồ câu(Amiable)=${doveScore}, Cú mèo(Analytical)=${owlScore}`;

  const payload = {
    action: 'sync_survey_completion',
    email: (result.userProfile.email || '').trim().toLowerCase(),
    survey_type: 'SS',
    result_summary: resultSummary,
    result_url: typeof window !== 'undefined' ? window.location.href : '',
    fullName: result.userProfile.fullName,
    phone: result.userProfile.phoneOrRole,
    dominantStyle: result.dominantStyle,
    secondaryStyle: result.secondaryStyle,
    scores: result.scores,
    answers: result.answers,
    completedAt: result.completedAt
  };

  // 1. Luôn lưu bản sao dự phòng vào LocalStorage
  try {
    const history = JSON.parse(localStorage.getItem('assessment_history') || '[]');
    history.push(payload);
    localStorage.setItem('assessment_history', JSON.stringify(history));
  } catch (err) {
    console.warn('Could not save to localStorage:', err);
  }

  // 2. Không gọi Webhook nếu là chế độ ẩn danh và không có email
  if (result.userProfile.mode === 'local_anonymous' && !result.userProfile.email) {
    return true;
  }

  // 3. Thực hiện gửi Webhook POST đồng bộ lên Google Sheets
  try {
    if (WEBHOOK_URL && !WEBHOOK_URL.includes('placeholder')) {
      const resp = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });
      const text = await resp.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      // Auto-heal: nếu chưa có Lead trong CRM Hub, tự động đăng ký và đồng bộ lại
      if (data && data.error === 'LEAD_NOT_FOUND') {
        try {
          const regPayload = {
            action: 'register_or_request_link',
            email: payload.email,
            full_name: payload.fullName || 'Học viên DHM',
            phone: payload.phone || '0900000000',
            survey_type: 'SS'
          };
          await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(regPayload),
            redirect: 'follow'
          });

          const retryResp = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload),
            redirect: 'follow'
          });
          const retryText = await retryResp.text();
          data = JSON.parse(retryText);
        } catch (retryErr) {
          console.warn('Auto-heal lead registration notice:', retryErr);
        }
      }

      return Boolean(data && data.success);
    }
    return true;
  } catch (error) {
    console.error('Webhook submission error:', error);
    return false;
  }
}
