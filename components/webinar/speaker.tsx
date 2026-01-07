"use client"

import { useState } from "react"

export default function Speaker() {
  const [activeSpeaker, setActiveSpeaker] = useState<"joe" | "patrick" | "michael">("michael")

  const speakers = {
    joe: {
      name: "Joe Smith",
      title: "Chuyên gia Marketing",
      bio: "Joe Smith là chuyên gia marketing hàng đầu với hơn 15 năm kinh nghiệm trong lĩnh vực digital marketing và phát triển thương hiệu. Ông đã giúp hàng trăm doanh nghiệp tăng trưởng doanh số và xây dựng chiến lược marketing hiệu quả. Chuyên môn của Joe bao gồm SEO, content marketing, và social media advertising.",
    },
    patrick: {
      name: "Patrick Lee",
      title: "Giám đốc Công nghệ",
      bio: "Patrick Lee là một kỹ sư phần mềm giàu kinh nghiệm với niềm đam mê về công nghệ và đổi mới. Ông đã dẫn dắt nhiều dự án công nghệ thành công và có chuyên môn sâu về phát triển ứng dụng web, AI, và cloud computing. Patrick thường xuyên chia sẻ kiến thức tại các hội thảo công nghệ lớn.",
    },
    michael: {
      name: "Michael Walker",
      title: "Diễn giả chính",
      bio: "Một vài lời về sản phẩm/ưu đãi của bạn. Tập trung vào lợi ích chứ không phải tính năng. Giải thích cách sản phẩm của bạn sẽ cải thiện cuộc sống của khách hàng. Thêm mô tả về ưu đãi và lợi ích chính của bạn. Nó là gì và nó giúp ích như thế nào cho khách hàng của bạn. Điều này sẽ giúp giải quyết các vấn đề của khách hàng trong tương lai như thế nào.",
    },
  }

  const currentSpeaker = speakers[activeSpeaker]

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">DIỄN GIẢ WEBINAR</h2>
          <p className="text-gray-600 mb-6">Giới thiệu về diễn giả và kinh nghiệm của họ.</p>
          <div className="w-20 h-1 bg-pink-500"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Speaker Image & Badges */}
          <div className="relative">
            <div className="absolute top-20 left-0 space-y-4 z-10">
              <button
                onClick={() => setActiveSpeaker("joe")}
                className={`px-6 py-3 rounded-full flex items-center gap-3 shadow-lg transition-all duration-500 transform hover:scale-105 ${
                  activeSpeaker === "joe" ? "bg-pink-500 translate-x-0" : "bg-gray-300 hover:bg-gray-400 translate-x-0"
                }`}
              >
                <div className="w-12 h-12 bg-gray-400 rounded-full flex-shrink-0"></div>
                <span
                  className={`font-bold text-sm transition-colors ${
                    activeSpeaker === "joe" ? "text-white" : "text-gray-700"
                  }`}
                >
                  JOE SMITH
                </span>
              </button>
              <button
                onClick={() => setActiveSpeaker("patrick")}
                className={`px-6 py-3 rounded-full flex items-center gap-3 shadow-lg ml-8 transition-all duration-500 transform hover:scale-105 ${
                  activeSpeaker === "patrick" ? "bg-pink-500" : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                <div className="w-10 h-10 bg-gray-500 rounded-full flex-shrink-0"></div>
                <span
                  className={`font-bold text-sm transition-colors ${
                    activeSpeaker === "patrick" ? "text-white" : "text-gray-700"
                  }`}
                >
                  PATRICK LEE
                </span>
              </button>
            </div>
            <div
              className={`bg-gray-300 h-96 rounded-lg flex items-center justify-center transition-all duration-700 ${
                activeSpeaker === "michael" ? "opacity-100" : "opacity-60"
              }`}
            >
              <span className="text-gray-500 text-lg">Hình Ảnh Diễn Giả</span>
            </div>
          </div>

          <div className="space-y-4">
            <div key={activeSpeaker} className="animate-in fade-in slide-in-from-right-4 duration-700">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{currentSpeaker.name}</h3>
              <p className="text-pink-500 text-lg font-semibold mb-4">{currentSpeaker.title}</p>
              <p className="text-gray-600 leading-relaxed">{currentSpeaker.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
