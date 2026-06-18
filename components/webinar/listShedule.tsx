"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ProgramItem {
  title: string
  content: string
}

const programInfo = {
  title: "Định Hướng Chiến Lược & Bệ Phóng Tương Lai Cho Thiên Tài Công Nghệ Trẻ",
  description:
    "Kỷ nguyên số đang dịch chuyển với tốc độ chóng mặt. Câu hỏi lớn nhất không còn là \"AI có thay thế con người?\", mà là: Con bạn sẽ đứng ở đâu — bị tụt lại phía sau hay NGƯỜI DẪN DẮT CÔNG NGHỆ? AIUni và Hồng Lĩnh Education hân hạnh đồng tổ chức webinar đặc biệt dành cho Phụ huynh và Học sinh THPT yêu thích STEM — cơ hội tiếp cận bản đồ chiến lược, giúp học sinh bứt phá từ người dùng công nghệ thành người kiến tạo sản phẩm AI thực chiến ngay từ ghế nhà trường.",
  items: [
    {
      title: "Đối thoại trực tiếp cùng Hội đồng Chuyên gia đầu ngành",
      content:
        "Giao lưu với PGS.TS, chuyên gia công nghệ từ Đại học Bách Khoa Hà Nội, Viện IEI và Khan Academy Vietnam. Giải đáp thắc mắc về năng lực số, tư duy giải quyết vấn đề và cách AI thay đổi thế giới thực tế — định hình lộ trình phát triển đúng đắn nhất.",
    },
    {
      title: "Giải mã nỗi sợ Toán học và Lập trình",
      content:
        "Xóa bỏ rào cản \"Toán cao cấp\" và \"Mã hóa phức tạp\". Tiếp cận AI qua trực giác hình học và công cụ no-code trực quan — học sinh chưa từng viết code vẫn nắm trọn bản chất Machine Learning & Deep Learning theo lộ trình xoắn ốc từ dễ đến chuyên sâu.",
    },
    {
      title: "Khám phá Lộ trình toàn diện AI57 (Level A - B - C)",
      content:
        "Từ GenAI, Nền tảng Toán Tin, Computer Vision (hệ sinh thái NVIDIA) đến xử lý ngôn ngữ tự nhiên. Học sinh xây dựng \"Hệ điều hành học tập cá nhân\" (Study OS) bằng AI và làm chủ Đạo đức, An toàn AI.",
    },
    {
      title: "Kiến tạo Portfolio xuất sắc — Tạo bước nhảy vọt khi vào Đại học",
      content:
        "Tại AI Sandbox & Product Studio, ứng dụng Design Thinking kết hợp \"Lego AI\" thành sản phẩm thực tế như Camera AI thời gian thực. Kỹ năng Storytelling & Pitch Deck giúp sở hữu Portfolio chuẩn kỹ sư thực chiến, lợi thế khi xét tuyển ĐH top đầu hoặc săn học bổng du học.",
    },
  ] satisfies ProgramItem[],
  closingNote:
    "Chương trình AI57 — sự kết hợp tâm huyết giữa AIUni và Hồng Lĩnh Education — không chỉ là nơi học tập, mà là bệ phóng biến ý tưởng sáng tạo của học sinh thành sản phẩm thực tế có giao diện hoàn chỉnh. Hãy để con bạn làm chủ công nghệ và tự tin giao tiếp với tương lai!",
}

const ListSchedule = () => {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-white via-blue-50 to-blue-100 relative">
      <Image
        src="/white-bg.jpg"
        alt="webinar-bg"
        width={1000}
        height={1000}
        className="w-full h-full object-cover absolute object-top top-0 left-0 z-10"
      />

      <div className="max-w-4xl mx-auto z-20 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="mb-8 sm:mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm sm:text-base font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Thông tin chương trình
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-gray-900 px-2">
            {programInfo.title}
          </h2>
        </motion.div>

        <motion.div
          className="border-2 border-blue-600 rounded-xl p-5 sm:p-8 shadow-lg bg-white relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
            {programInfo.description}
          </p>

          <div className="space-y-5 sm:space-y-6">
            {programInfo.items.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-8 pt-6 border-t border-blue-100 italic">
            {programInfo.closingNote}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full h-12 sm:h-20 bg-gradient-to-b from-transparent to-white z-20" />
    </section>
  )
}

export default ListSchedule
