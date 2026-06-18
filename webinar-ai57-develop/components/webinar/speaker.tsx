"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Speaker() {
  const [activeSpeaker, setActiveSpeaker] = useState<"hung" | "dat" | "my" | "hung-student">("hung")

  const speakers = {
    hung: {
      name: "Lê Thanh Hưng",
      title: `Admin group " Bình dân học AI"`,
      bio: `Nhóm sinh hoạt cộng đồng của dự án "Bình dân học Al" - Dự án xã hội với mục tiêu phổ cập kiến thức, kĩ năng điều khiến các dạng phần mềm Trí tuệ nhân tạo hiện đại để phục vụ cuộc sống. Dự án dành cho mọi người dân Việt Nam.`,
      image: "/tml.png", // Thay đổi đường dẫn ảnh tại đây (ví dụ: "/hung.png")
    },
    dat: {
      name: "PHẠM TIẾN ĐẠT",
      title: `Kỹ sư CNTT | Nhà sáng tạo nội dung "Banker thích code"`,
      bio: `Góc nhìn thực tế về việc dùng AI để làm nội dung hiệu quả hơn, bắt kịp xu hướng và đo lường bằng dữ liệu thay vì cảm tính.`,
      image: "/banker.png", // Thay đổi đường dẫn ảnh tại đây (ví dụ: "/dat.png")
    },
    my: {
      name: "TRỊNH THỊ HÀ MY",
      title: `Kỹ sư Công nghệ Phần mềm | Ứng viên tài năng cuộc thi "Cơ hội cho ai" mùa 4`,
      bio: `Phân tích cách ứng dụng AI có hệ thống trong Marketing, nhấn mạnh vai trò của quy trình và nguyên tắc để đảm bảo an toàn cho thương hiệu.`,
      image: "/my.png", // Thay đổi đường dẫn ảnh tại đây (ví dụ: "/my.png")
    },
    "hung-student": {
      name: "NGUYỄN VIỆT HƯNG",
      title: `Sinh viên ưu tú ĐH Bách khoa Hà Nội | Thủ khoa 4 khối THPTQG 2025`,
      bio: `Đại diện góc nhìn người học, đặt ra câu hỏi về những kỹ năng cần thiết để thích nghi và học tập hiệu quả trong thời đại AI.`,
      image: "/hung-student.png", // Thay đổi đường dẫn ảnh tại đây (ví dụ: "/hung-student.png")
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
          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Giới thiệu về diễn giả và kinh nghiệm của họ.
          </motion.p>
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
                    ? "bg-pink-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-12 h-12 shrink-0">
                  <Image
                    src={speakers[key].image}
                    alt={speakers[key].name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded-full border-2 border-white"
                  />
                </div>
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
