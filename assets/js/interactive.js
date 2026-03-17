const flow = {
  step: 1,
  quizIndex: 0,
  quizDone: false,
  chatDone: false,
  timelineSeen: new Set(),
  rolesSeen: new Set(),
  riskSeen: false,
};

const quiz = [
  {
    q: "Primary concern? / Vấn đề chính của bạn là gì?",
    a: ["Inflammatory acne / Mụn viêm", "Pigment unevenness / Rối loạn sắc tố", "Barrier sensitivity / Da nhạy cảm"],
  },
  {
    q: "How long has it persisted? / Tình trạng kéo dài bao lâu?",
    a: ["< 1 month / Dưới 1 tháng", "1–3 months / 1–3 tháng", "> 3 months / Trên 3 tháng"],
  },
  {
    q: "Current skin tolerance? / Mức độ dung nạp của da?",
    a: ["Low / Thấp", "Moderate / Trung bình", "High / Cao"],
  },
];

const chatScript = [
  { who: "bot", text: "Thanks for starting. We will guide step by step. / Cảm ơn bạn đã bắt đầu. Chúng tôi sẽ hướng dẫn từng bước." },
  { who: "bot", text: "How is your skin reacting this week? / Tuần này da của bạn phản ứng thế nào?", replies: ["More sensitive / Nhạy cảm hơn", "Stable / Ổn định", "Flare-up / Bùng phát"] },
  { who: "bot", text: "How consistent is your routine? / Mức độ duy trì quy trình hiện tại?", replies: ["Every day / Mỗi ngày", "Most days / Hầu hết các ngày", "Irregular / Chưa đều"] },
  { who: "bot", text: "Great. Please complete the final consultation inputs. / Tốt. Vui lòng hoàn tất thông tin tư vấn cuối." },
];

const phaseDetails = {
  1: "Phase 1 builds tolerance and stabilizes barrier before aggressive control. / Giai đoạn 1 giúp tăng dung nạp và ổn định hàng rào da trước bước kiểm soát tích cực.",
  2: "Phase 2 introduces targeted control for active lesions or pigment behavior. / Giai đoạn 2 đưa vào thành phần kiểm soát đích cho tổn thương hoạt động hoặc sắc tố.",
  3: "Phase 3 consolidates gains and reduces relapse risk with steady maintenance. / Giai đoạn 3 củng cố kết quả và giảm nguy cơ tái phát bằng duy trì ổn định.",
};

const roleDetails = {
  barrier: "Role: protect tolerance. Phase: Week 1–2. Why: prepares skin for active correction safely. / Vai trò: bảo toàn dung nạp. Giai đoạn: tuần 1–2. Lý do: chuẩn bị da cho bước điều chỉnh hoạt tính an toàn.",
  active: "Role: active control. Phase: Week 3–6. Why: addresses pathology directly, not only surface symptoms. / Vai trò: kiểm soát hoạt tính. Giai đoạn: tuần 3–6. Lý do: tác động trực tiếp vào cơ chế bệnh sinh, không chỉ biểu hiện bề mặt.",
  maintenance: "Role: relapse prevention. Phase: Week 7–12. Why: protects outcomes and prevents rebound. / Vai trò: ngừa tái phát. Giai đoạn: tuần 7–12. Lý do: bảo vệ kết quả và hạn chế bùng phát lại.",
};

const mistakeDetails = {
  swap: "Consequence: mismatch between phase goal and product action can increase irritation and slow recovery. / Hậu quả: sai lệch giữa mục tiêu giai đoạn và tác động sản phẩm có thể tăng kích ứng và làm chậm phục hồi.",
  skip: "Consequence: skipping maintenance often causes rebound and unstable long-term outcomes. / Hậu quả: bỏ giai đoạn duy trì dễ gây bùng phát trở lại và kết quả kém ổn định dài hạn.",
};

const stepPanels = [...document.querySelectorAll('[data-step-panel]')];
const progressBar = document.getElementById('progressBar');
const stepNow = document.getElementById('stepNow');

function gotoStep(step) {
  flow.step = step;
  stepNow.textContent = step;
  progressBar.style.width = `${(step / 6) * 100}%`;
  stepPanels.forEach((panel) => {
    panel.classList.toggle('hidden', Number(panel.dataset.stepPanel) !== step);
  });
  document.querySelectorAll('.step-item').forEach((item) => {
    const n = Number(item.dataset.gotoStep);
    item.classList.toggle('bg-slate-900', n === step);
    item.classList.toggle('text-white', n === step);
    item.classList.toggle('bg-white', n !== step);
  });
}

function renderQuiz() {
  const q = quiz[flow.quizIndex];
  const qEl = document.getElementById('quizQuestion');
  const aEl = document.getElementById('quizAnswers');

  if (!q) {
    flow.quizDone = true;
    qEl.textContent = 'Diagnosis quiz complete. / Đã hoàn tất trắc nghiệm chẩn đoán.';
    aEl.innerHTML = '';
    document.getElementById('toStep2').disabled = false;
    document.getElementById('toStep2').classList.remove('opacity-40', 'cursor-not-allowed');
    return;
  }

  qEl.textContent = q.q;
  aEl.innerHTML = '';
  q.a.forEach((ans) => {
    const btn = document.createElement('button');
    btn.className = 'text-left px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50';
    btn.textContent = ans;
    btn.onclick = () => {
      flow.quizIndex += 1;
      renderQuiz();
    };
    aEl.appendChild(btn);
  });
}

function pushChatMessage(who, text) {
  const row = document.createElement('div');
  row.className = `max-w-[85%] px-3 py-2 rounded-xl text-sm ${who === 'bot' ? 'bg-white border border-slate-200' : 'bg-slate-900 text-white ml-auto'}`;
  row.textContent = text;
  document.getElementById('chatThread').appendChild(row);
  document.getElementById('chatThread').scrollTop = document.getElementById('chatThread').scrollHeight;
}

let chatIndex = 0;
function runChat() {
  const node = chatScript[chatIndex];
  if (!node) {
    document.getElementById('chatFormEnd').classList.remove('hidden');
    return;
  }

  pushChatMessage('bot', node.text);
  const replies = document.getElementById('quickReplies');
  replies.innerHTML = '';

  if (node.replies) {
    node.replies.forEach((r) => {
      const btn = document.createElement('button');
      btn.className = 'px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm';
      btn.textContent = r;
      btn.onclick = () => {
        pushChatMessage('user', r);
        chatIndex += 1;
        runChat();
      };
      replies.appendChild(btn);
    });
  } else {
    const next = document.createElement('button');
    next.className = 'px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm';
    next.textContent = 'Next / Tiếp tục';
    next.onclick = () => {
      chatIndex += 1;
      runChat();
    };
    replies.appendChild(next);
  }
}

document.getElementById('toStep2').onclick = () => gotoStep(2);
document.getElementById('toStep3').onclick = () => gotoStep(3);
document.getElementById('toStep4').onclick = () => gotoStep(4);
document.getElementById('toStep5').onclick = () => gotoStep(5);
document.getElementById('toStep6').onclick = () => gotoStep(6);
document.getElementById('restartFlow').onclick = () => window.location.reload();

[...document.querySelectorAll('[data-goto-step]')].forEach((btn) => {
  btn.addEventListener('click', () => gotoStep(Number(btn.dataset.gotoStep)));
});

document.getElementById('chatFormEnd').addEventListener('submit', (e) => {
  e.preventDefault();
  flow.chatDone = true;
  pushChatMessage('bot', 'Consultation complete. Assigned plan is ready. / Tư vấn hoàn tất. Phác đồ sẵn sàng.');
  document.getElementById('quickReplies').innerHTML = '';
  document.getElementById('toStep3').disabled = false;
  document.getElementById('toStep3').classList.remove('opacity-40', 'cursor-not-allowed');
});

[...document.querySelectorAll('.phase-btn')].forEach((btn) => {
  btn.addEventListener('click', () => {
    const phase = btn.dataset.phase;
    flow.timelineSeen.add(phase);
    const detail = document.getElementById('phaseDetail');
    detail.classList.remove('hidden');
    detail.textContent = phaseDetails[phase];
    if (flow.timelineSeen.size >= 3) {
      document.getElementById('toStep4').disabled = false;
      document.getElementById('toStep4').classList.remove('opacity-40', 'cursor-not-allowed');
    }
  });
});

[...document.querySelectorAll('.role-btn')].forEach((btn) => {
  btn.addEventListener('click', () => {
    const role = btn.dataset.role;
    flow.rolesSeen.add(role);
    const detail = document.getElementById('roleDetail');
    detail.classList.remove('hidden');
    detail.textContent = roleDetails[role];
    if (flow.rolesSeen.size >= 3) {
      document.getElementById('toStep5').disabled = false;
      document.getElementById('toStep5').classList.remove('opacity-40', 'cursor-not-allowed');
    }
  });
});

[...document.querySelectorAll('.mistake-btn')].forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.mistake;
    flow.riskSeen = true;
    const result = document.getElementById('mistakeResult');
    result.classList.remove('hidden');
    result.textContent = mistakeDetails[key];
    document.getElementById('toStep6').disabled = false;
    document.getElementById('toStep6').classList.remove('opacity-40', 'cursor-not-allowed');
  });
});

renderQuiz();
runChat();
gotoStep(1);
