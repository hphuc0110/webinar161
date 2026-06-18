"use client"

import type React from "react"
import { BarChart3, Smartphone, Megaphone, Eye, Newspaper, Send } from "lucide-react"

interface BenefitCard {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

const benefits: BenefitCard[] = [
  {
    id: 1,
    title: "LỢI ÍCH SỐ 1",
    description:"Hiểu đầy đủ bức tranh toàn cảnh ngành Marketing trong thời đại AI, từ cấu trúc nghề nghiệp đến sự dịch chuyển vai trò con người",
    icon: <BarChart3 className="w-8 h-8" />,
  },
  {
    id: 2,
    title: "LỢI ÍCH SỐ 2",
    description:
    "Nhận diện chính xác những nhóm công việc Marketing đang bị AI thay thế mạnh nhất, và đâu là nhóm việc con người vẫn giữ vai trò quyết định",
    icon: <Smartphone className="w-8 h-8" />,
  },
  {
    id: 3,
    title: "LỢI ÍCH SỐ 3",
    description:
    "Hiểu vì sao Marketing không biến mất trong thời đại AI mà đang “tái cấu trúc”, tách rõ giữa lao động tay chân và năng lực chiến lược",
    icon: <Megaphone className="w-8 h-8" />,
  },
  {
    id: 4,
    title: "LỢI ÍCH SỐ 4",
    description:
    "Trực tiếp quan sát cách AI đang được sử dụng trong quy trình Marketing thực tế, từ ý tưởng, nội dung đến quảng cáo và báo cáo",    icon: <Eye className="w-8 h-8" />,
  },
  {
    id: 5,
    title: "LỢI ÍCH SỐ 5",
    description:
    "Có định hướng kỹ năng và lộ trình học tập 12 tháng rõ ràng để không bị tụt lại trong làn sóng thay đổi của ngành Marketing",    icon: <Newspaper className="w-8 h-8" />,
  },
  {
    id: 6,
    title: "LỢI ÍCH SỐ 6",
    description:
    "Hiểu rõ AI đang giải quyết bài toán gì cho người học và người làm Marketing, từ kỹ năng thực hành đến xây dựng portfolio thực tế",    icon: <Send className="w-8 h-8" />,
  },
]

export default function Benefits() {
  return (
    <section className="bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 text-white py-20 px-4 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float delay-500"></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-white/10 rounded-full animate-rotate-slow"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">BẠN SẼ HỌC ĐƯỢC GÌ?</h2>
          <p className="text-blue-200 text-lg mb-6">Mô tả ngắn gọn về nội dung và lợi ích mà bạn sẽ nhận được.</p>
          <div className="w-24 h-1 bg-white rounded-full shadow-lg shadow-white/30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="group space-y-4 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fadeInUp hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-blue-300 group-hover:text-white transform group-hover:scale-110 transition-all duration-300 animate-bounce-soft">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
              <p className="text-blue-200 group-hover:text-blue-100 text-sm leading-relaxed transition-colors duration-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
