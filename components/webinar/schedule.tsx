"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface ScheduleItem {
  id: number
  title: string
  description: string
}

const scheduleItems: ScheduleItem[] = [
  {
    id: 1,
    title: "CHỦ ĐỀ #1",
    description:
      "Thêm mô tả về ưu đãi và lợi ích chính của bạn. Nó là gì và nó giúp ích như thế nào cho khách hàng của bạn.",
  },
  {
    id: 2,
    title: "CHỦ ĐỀ #2",
    description:
      "Thêm mô tả về ưu đãi và lợi ích chính của bạn. Nó là gì và nó giúp ích như thế nào cho khách hàng của bạn.",
  },
  {
    id: 3,
    title: "CHỦ ĐỀ #3",
    description:
      "Thêm mô tả về ưu đãi và lợi ích chính của bạn. Nó là gì và nó giúp ích như thế nào cho khách hàng của bạn.",
  },
]

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

export default function Schedule() {
  const webinarDate = new Date("2026-01-16T13:00:00Z")
  const timeLeft = useCountdown(webinarDate)

  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-3xl animate-float delay-500"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-blue-300/30 rounded-full animate-rotate-slow"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side */}
          <div className="space-y-10 animate-fadeInLeft">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-4">LỊCH TRÌNH WEBINAR</h2>
              <p className="text-blue-700 leading-relaxed mb-6">
                Một vài lời về sản phẩm/ưu đãi của bạn. Tập trung vào lợi ích chứ không phải tính năng. Giải thích cách
                sản phẩm của bạn sẽ cải thiện cuộc sống của khách hàng. Thêm mô tả về ưu đãi và lợi ích chính của bạn.
              </p>
              <div className="w-24 h-1 bg-blue-600 rounded-full shadow-lg shadow-blue-500/50"></div>
            </div>

            <div className="space-y-4 animate-fadeInUp delay-200">
              <h3 className="text-blue-900 font-bold uppercase tracking-wider">Webinar Bắt Đầu Sau:</h3>
              <div className="flex gap-4">
                {[
                  { value: timeLeft.days, label: "NGÀY" },
                  { value: timeLeft.hours, label: "GIỜ" },
                  { value: timeLeft.minutes, label: "PHÚT" },
                  { value: timeLeft.seconds, label: "GIÂY" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-blue-500 px-5 py-3 text-center bg-white shadow-xl hover:shadow-blue-500/30 rounded-xl transform hover:scale-110 transition-all duration-300 animate-pulse-glow hover-lift min-w-[80px]"
                  >
                    <p className="text-3xl font-bold text-blue-900 tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </p>
                    <p className="text-xs text-blue-600 font-semibold mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 animate-fadeInUp delay-300 px-8 py-6 text-lg">
              Đăng Ký Ngay
            </Button>
          </div>

          {/* Right Side - Topics */}
          <div className="border-l-4 border-blue-500 pl-8 space-y-8 animate-fadeInRight">
            <div className="animate-fadeInUp delay-100 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
              <p className="text-blue-600 font-semibold uppercase text-sm mb-2 tracking-wider">Ngày</p>
              <p className="text-blue-900 font-bold text-2xl">16 tháng 1, 2026</p>
              <p className="text-blue-600 font-semibold text-sm mt-1">THỜI GIAN BẮT ĐẦU: 8:00 TỐI (GMT+7)</p>
            </div>

            {scheduleItems.map((item, index) => (
              <div
                key={item.id}
                className="p-6 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 animate-fadeInUp hover-lift"
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <h4 className="text-blue-900 font-bold text-xl mb-3">{item.title}</h4>
                <p className="text-blue-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
