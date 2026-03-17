const state = {
  diagnosisDone: false,
  planUnlocked: false,
};

const startButtons = [
  document.getElementById("startDiagnosis"),
  document.getElementById("stickyStart"),
];
const unlockPlanBtn = document.getElementById("unlockPlan");
const getKitBtn = document.getElementById("getKit");
const statusText = document.getElementById("statusText");

function setStatus(en, vi) {
  statusText.innerHTML = `<span class="en">${en}</span><span class="vi">${vi}</span>`;
}

function syncUI() {
  if (!state.diagnosisDone) {
    setStatus("Awaiting diagnosis completion.", "Đang chờ hoàn tất bước chẩn đoán.");
    unlockPlanBtn.disabled = false;
    getKitBtn.disabled = true;
    return;
  }

  if (!state.planUnlocked) {
    setStatus(
      "Diagnosis complete. Your treatment plan is ready to unlock.",
      "Đã hoàn tất chẩn đoán. Phác đồ điều trị của bạn đã sẵn sàng để mở."
    );
    getKitBtn.disabled = true;
    return;
  }

  setStatus(
    "Plan unlocked. Your prescribed kit is ready to start.",
    "Phác đồ đã được mở. Bộ liệu trình theo chỉ định đã sẵn sàng để bắt đầu."
  );
  getKitBtn.disabled = false;
}

startButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.diagnosisDone = true;
    document.getElementById("conversion").scrollIntoView({ behavior: "smooth", block: "start" });
    syncUI();
  });
});

unlockPlanBtn.addEventListener("click", () => {
  if (!state.diagnosisDone) {
    setStatus(
      "Please complete diagnosis first to unlock your treatment plan.",
      "Vui lòng hoàn tất chẩn đoán trước khi mở phác đồ điều trị."
    );
    return;
  }
  state.planUnlocked = true;
  syncUI();
});

getKitBtn.addEventListener("click", () => {
  setStatus(
    "Treatment start confirmed. Follow-up review is scheduled in 14 days.",
    "Đã xác nhận bắt đầu liệu trình. Lịch tái đánh giá được đặt sau 14 ngày."
  );
});

syncUI();
