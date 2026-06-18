"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Speaker() {
  const [activeSpeaker, setActiveSpeaker] = useState<"hung" | "dat" | "my" | "hung-student">("hung")

  const speakers = {
    hung: {
      name: "Nguyễn Đức Long",
      title: " Tổng Giám đốc Học viện AIUni | Chủ tịch hội đồng cố vấn chương trình AI57",
      bio: `Điều phối chương trình, dẫn dắt thảo luận và định hướng làm rõ lý do vì sao học sinh đam mê STEM cần tiếp xúc với AI từ sớm, cùng khát vọng phổ cập trí tuệ nhân tạo của AIUni. `,
      image: "/dien_gia/long.png", // Thay đổi đường dẫn ảnh tại đây (ví dụ: "/hung.png")
    },
    dat: {
      name: "PGS. TS Lê Chí Ngọc ",
      title: `Giảng viên Khoa Toán ứng dụng và Tin học, Đại học Bách Khoa Hà Nội `,
      bio: `Phân tích cách chương trình AI57 đơn giản hóa Toán học đại cương (Đại số, Giải tích) bằng "trực giác hình học" và làm rõ lợi thế dài hạn khi học sinh bước vào cánh cửa đại học. `,
      image: "/dien_gia/ngoc.png", // Thay đổi đường dẫn ảnh tại đây (ví dụ: "/dat.png")
    },
    my: {
      name: "TS. Đỗ Ngọc Minh ",
      title: `Đồng sáng lập Khan Academy Vietnam | Chuyên gia Công nghệ và Giáo dục `,
      bio: `Chia sẻ giải pháp giúp học sinh xây dựng "Hệ điều hành học tập cá nhân" bằng AI, cách ứng dụng NotebookLM, đồng thời nhấn mạnh về Đạo đức, An toàn AI và kỹ năng làm Portfolio nộp hồ sơ du học.`,
      image: "/dien_gia/minh.png", // Thay đổi đường dẫn ảnh tại đây (ví dụ: "/my.png")
    },
    "hung-student": {
      name: "TS. Dương Đức Anh",
      title: `Phó Viện trưởng Viện nghiên cứu Điện tử, Tin học, Tự động hóa`,
      bio: `Đánh giá tính thực tiễn của mảng Thị giác máy tính (Computer Vision), hệ sinh thái NVIDIA và cách hướng dẫn học sinh tự tay làm dự án Camera AI thời gian thực theo chuẩn kỹ sư.`,
      image: "/dien_gia/anh.png", 
    },
    "chung": {
      name: "TS.Nguyễn Thành Chung",
      title: `Giảng viên Cao cấp Học viện AIUni | Chuyên gia Giáo dục STEM `,
      bio: `Làm rõ sự sẵn sàng của học sinh phổ thông với AI, giới thiệu môi trường thực hành "AI Sandbox" giúp lắp ghép các khối Lego AI thành sản phẩm và giải đáp thắc mắc cho người mới bắt đầu học code.`,
      image: "/dien_gia/chung.png", 
    },
  }

  const currentSpeaker = speakers[activeSpeaker]
  const speakerKeys = Object.keys(speakers) as Array<keyof typeof speakers>

  return (
    <section className="bg-white py-16 px-4 relative">

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">DIỄN GIẢ WEBINAR</h2>
          <motion.div
            className="w-20 h-1 bg-blue-500"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Side - Speaker Selection Buttons */}
          <div className="lg:col-span-3 space-y-3">
            {speakerKeys.map((key) => (
              <motion.button
                key={key}
                onClick={() => setActiveSpeaker(key)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  activeSpeaker === key
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3 }}
              >
                <span className={`font-semibold text-sm uppercase tracking-wide ${
                  activeSpeaker === key ? "text-white" : "text-gray-900"
                }`}>
                  {speakers[key].name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Middle - Speaker Image */}
          <div className="lg:col-span-5 relative">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full blur-3xl animate-float z-10"></div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpeaker}
                  whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl relative z-20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Image
                    src={currentSpeaker.image}
                    alt={currentSpeaker.name}
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover shadow-lg rounded-xl"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Side - Speaker Info */}
          <div className="lg:col-span-4 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpeaker}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <motion.h3
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {currentSpeaker.name}
                </motion.h3>
                <motion.p
                  className="text-blue-500 text-base lg:text-lg font-semibold mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {currentSpeaker.title}
                </motion.p>
                <motion.p
                  className="text-gray-600 leading-relaxed text-sm lg:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {currentSpeaker.bio}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
