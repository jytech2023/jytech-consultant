"use client";

import { useState, useEffect } from "react";

type EventType = {
  uri: string;
  name: string;
  duration: number;
  scheduling_url: string;
  description_plain: string | null;
};

type TimeSlot = {
  status: string;
  invitees_remaining: number;
  start_time: string;
};

const COMMISSION: Record<string, number> = {
  free: 50,
  start: 30,
  growth: 20,
  enterprise: 0,
};

export default function CalendlyBooking({
  expertUserId,
  expertName,
  hourlyRate,
  locale,
}: {
  expertUserId: string | null;
  expertName: string;
  hourlyRate: number | null;
  locale: string;
}) {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [clientPlan, setClientPlan] = useState("free");
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });

  const isZh = locale === "zh";
  const commissionPct = COMMISSION[clientPlan] ?? 50;

  // Fetch client's plan
  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.user?.plan) setClientPlan(data.user.plan);
      })
      .catch(() => {});
  }, []);

  // Fetch event types
  useEffect(() => {
    if (!expertUserId) {
      setLoading(false);
      setError(
        isZh
          ? "该专家尚未连接预约系统"
          : "This expert has not connected their booking system"
      );
      return;
    }

    fetch(`/api/calendly/event-types?userId=${expertUserId}`)
      .then((res) => {
        if (!res.ok) throw new Error("not_connected");
        return res.json();
      })
      .then((data) => {
        setEventTypes(data.eventTypes);
        if (data.eventTypes.length > 0) {
          setSelectedEvent(data.eventTypes[0]);
        }
      })
      .catch(() => {
        setError(
          isZh
            ? "该专家尚未连接预约系统"
            : "This expert has not connected their booking system"
        );
      })
      .finally(() => setLoading(false));
  }, [expertUserId, isZh]);

  // Fetch available times when event type or date changes
  useEffect(() => {
    if (!selectedEvent || !expertUserId) return;

    setSlotsLoading(true);
    const startTime = new Date(`${selectedDate}T00:00:00`).toISOString();
    const endDate = new Date(`${selectedDate}T00:00:00`);
    endDate.setDate(endDate.getDate() + 1);
    const endTime = endDate.toISOString();

    const params = new URLSearchParams({
      userId: expertUserId,
      eventTypeUri: selectedEvent.uri,
      startTime,
      endTime,
    });

    fetch(`/api/calendly/availability?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setSlots(
          data.slots?.filter((s: TimeSlot) => s.status === "available") ?? []
        );
      })
      .catch(() => setSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [selectedEvent, selectedDate, expertUserId]);

  async function handlePayAndBook() {
    if (!selectedEvent || !expertUserId) return;

    // Free consultation — skip payment, go directly to Calendly
    if (!hourlyRate || hourlyRate === 0) {
      window.location.href = `${selectedEvent.scheduling_url}?utm_source=jyconsultant&utm_medium=free`;
      return;
    }

    setPaying(true);
    try {
      const res = await fetch("/api/consultation/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expertUserId,
          expertName,
          eventTypeName: selectedEvent.name,
          duration: selectedEvent.duration,
          hourlyRate,
          schedulingUrl: selectedEvent.scheduling_url,
          locale,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // ignore
    } finally {
      setPaying(false);
    }
  }

  // Expert rate is net — platform fee = commission% * expert rate, client pays both
  const platformFeeHourly = hourlyRate
    ? Math.round(hourlyRate * (commissionPct / 100) * 100) / 100
    : null;
  const totalHourlyRate = hourlyRate && platformFeeHourly
    ? Math.round((hourlyRate + platformFeeHourly) * 100) / 100
    : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted">
        <span className="animate-pulse">
          {isZh ? "加载预约信息..." : "Loading booking info..."}
        </span>
      </div>
    );
  }

  const isFree = hourlyRate === 0;

  if (error) {
    return (
      <div className="space-y-4">
        {isFree ? (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4">
            <span className="text-xl">🎉</span>
            <p className="text-sm font-medium text-emerald-400">
              {isZh ? "免费咨询" : "Free Consultation"}
            </p>
          </div>
        ) : hourlyRate && totalHourlyRate ? (
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">💰</span>
              <div>
                <p className="text-sm font-medium">
                  {isZh
                    ? `客户支付: $${totalHourlyRate}/小时`
                    : `Client Pays: $${totalHourlyRate}/hour`}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {isZh
                    ? `专家收入 $${hourlyRate} + 平台服务费 $${platformFeeHourly}（${commissionPct}%）`
                    : `Expert earns $${hourlyRate} + Platform fee $${platformFeeHourly} (${commissionPct}%)`}
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <div className="rounded-xl border border-card-border bg-card-bg p-8 text-center">
          <p className="text-muted">{error}</p>
          <div className="mt-4 rounded-lg border border-card-border bg-background p-4">
            <p className="text-sm text-muted">
              {isZh ? "如需帮助，请联系平台客服" : "Need help? Contact our support"}
            </p>
            <p className="mt-1 text-sm font-medium">
              {isZh ? "微信" : "WeChat"}: weijingjaylin
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString(isZh ? "zh-CN" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !isZh,
    });
  };

  const consultFee =
    selectedEvent && totalHourlyRate
      ? Math.round(totalHourlyRate * (selectedEvent.duration / 60) * 100) / 100
      : null;
  const expertFee =
    selectedEvent && hourlyRate
      ? Math.round(hourlyRate * (selectedEvent.duration / 60) * 100) / 100
      : null;
  const platformFee =
    consultFee && expertFee
      ? Math.round((consultFee - expertFee) * 100) / 100
      : null;

  return (
    <div className="space-y-6">
      {/* Fee Info */}
      {isFree ? (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4">
          <span className="text-xl">🎉</span>
          <p className="text-sm font-medium text-emerald-400">
            {isZh ? "免费咨询 — 无需支付" : "Free Consultation — No payment required"}
          </p>
        </div>
      ) : hourlyRate && totalHourlyRate ? (
        <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">💰</span>
            <div className="flex-1">
              <p className="text-sm font-medium">
                {isZh
                  ? `客户支付: $${totalHourlyRate}/小时`
                  : `Client Pays: $${totalHourlyRate}/hour`}
              </p>
              <p className="mt-1 text-xs text-muted">
                {isZh
                  ? `专家收入 $${hourlyRate} + 平台服务费 $${platformFeeHourly}（${commissionPct}%）`
                  : `Expert earns $${hourlyRate} + Platform fee $${platformFeeHourly} (${commissionPct}%)`}
              </p>
              {consultFee && selectedEvent && expertFee && platformFee && (
                <div className="mt-2 rounded-lg border border-card-border bg-background px-3 py-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted">{isZh ? "专家费用" : "Expert fee"}</span>
                    <span>${expertFee}</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-muted">{isZh ? "平台服务费" : "Platform fee"} ({commissionPct}%)</span>
                    <span>${platformFee}</span>
                  </div>
                  <div className="flex justify-between mt-1 border-t border-card-border pt-1 font-medium">
                    <span>{isZh ? "合计" : "Total"} ({selectedEvent.duration} min)</span>
                    <span>${consultFee}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {commissionPct > 20 && (
            <p className="mt-2 text-xs text-accent-light">
              {isZh
                ? `💡 升级订阅可降低平台费率，查看定价了解详情`
                : `💡 Upgrade your plan to reduce platform fees`}
            </p>
          )}
        </div>
      ) : null}

      {/* Event Type Selection */}
      {eventTypes.length > 1 && (
        <div>
          <h3 className="text-sm font-semibold">
            {isZh ? "选择咨询类型" : "Select Consultation Type"}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {eventTypes.map((et) => (
              <button
                key={et.uri}
                onClick={() => setSelectedEvent(et)}
                className={`rounded-lg border px-4 py-2 text-sm transition ${
                  selectedEvent?.uri === et.uri
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-card-border bg-card-bg text-muted hover:border-accent/40"
                }`}
              >
                {et.name} ({et.duration} min)
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedEvent && (
        <>
          {/* Date Picker */}
          <div>
            <h3 className="text-sm font-semibold">
              {isZh ? "选择日期" : "Select Date"}
            </h3>
            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-2 rounded-lg border border-card-border bg-background px-4 py-2 text-sm"
            />
          </div>

          {/* Time Slots */}
          <div>
            <h3 className="text-sm font-semibold">
              {isZh ? "可预约时间" : "Available Times"}
            </h3>
            {slotsLoading ? (
              <p className="mt-3 animate-pulse text-sm text-muted">
                {isZh ? "加载可用时间..." : "Loading available times..."}
              </p>
            ) : slots.length === 0 ? (
              <p className="mt-3 text-sm text-muted">
                {isZh
                  ? "该日期暂无可用时间，请选择其他日期"
                  : "No available times on this date, please select another date"}
              </p>
            ) : (
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                {slots.map((slot) => (
                  <div
                    key={slot.start_time}
                    className="rounded-lg border border-card-border bg-card-bg px-3 py-2 text-center text-sm font-medium text-muted"
                  >
                    {formatTime(slot.start_time)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pay & Book Button */}
          {slots.length > 0 && (
            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">
                    {isFree
                      ? (isZh ? "免费预约" : "Book for Free")
                      : (isZh ? "支付并预约" : "Pay & Book")}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {isFree
                      ? (isZh
                        ? "将跳转至 Calendly 选择具体时间完成预约"
                        : "You'll be redirected to Calendly to select your preferred time")
                      : (isZh
                        ? "支付咨询费用后，将跳转至 Calendly 选择具体时间完成预约"
                        : "After payment, you'll be redirected to Calendly to select your preferred time")}
                  </p>
                </div>
                <button
                  onClick={handlePayAndBook}
                  disabled={paying}
                  className={`shrink-0 rounded-lg px-8 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50 ${
                    isFree
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                      : "bg-gradient-to-r from-blue-500 to-indigo-500"
                  }`}
                >
                  {paying
                    ? "..."
                    : isFree
                      ? isZh
                        ? "立即预约"
                        : "Book Now"
                      : consultFee
                        ? isZh
                          ? `支付 $${consultFee} 并预约`
                          : `Pay $${consultFee} & Book`
                        : isZh
                          ? "支付并预约"
                        : "Pay & Book"}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Contact Support */}
      <div className="rounded-xl border border-card-border bg-card-bg/50 p-4">
        <p className="text-sm text-muted">
          {isZh
            ? "如需帮助或有任何疑问，请联系平台客服"
            : "Need help or have questions? Contact our support"}
        </p>
        <p className="mt-1 text-sm">
          <span className="text-muted">{isZh ? "微信" : "WeChat"}:</span>{" "}
          <span className="font-medium">weijingjaylin</span>
        </p>
      </div>
    </div>
  );
}
