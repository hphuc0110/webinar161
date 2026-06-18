"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import WebinarBP from "../common/webinar-bp"
import Image from "next/image"

const formSchema = z.object({
  name: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ").regex(/^[0-9+\-\s()]+$/, "Số điện thoại chỉ được chứa số và ký tự đặc biệt"),
  email: z.string().email("Email không hợp lệ"),
  studentName: z.string().min(2, "Họ tên học sinh phải có ít nhất 2 ký tự"),
  birthYear: z
    .string()
    .regex(/^\d{4}$/, "Năm sinh phải là 4 chữ số")
    .refine(
      (year) => {
        const y = parseInt(year, 10)
        const currentYear = new Date().getFullYear()
        return y >= 2000 && y <= currentYear
      },
      { message: "Năm sinh không hợp lệ" }
    ),
  school: z.string().min(2, "Tên trường phải có ít nhất 2 ký tự"),
  question: z.string().optional(),
  source: z.string().min(1, "Vui lòng chọn bạn biết tới chương trình qua đâu"),
})

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Use timestamp to avoid dependency issues with Date object
  const targetTimestamp = targetDate.getTime()

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetTimestamp - now.getTime()

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
  }, [targetTimestamp])

  return timeLeft
}

export default function Hero() {
  const webinarDate = useMemo(() => new Date("2026-06-19T13:00:00Z"), [])
  const timeLeft = useCountdown(webinarDate)
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      studentName: "",
      birthYear: "",
      school: "",
      question: "",
      source: "",
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Có lỗi xảy ra khi gửi form")
      }

      toast({
        title: "Đăng ký thành công!",
        description: "Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ với bạn sớm nhất.",
      })

      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Đăng ký thất bại",
        description: error instanceof Error ? error.message : "Có lỗi xảy ra. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="registration-form" className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-8 sm:py-12 lg:py-20 relative overflow-hidden flex flex-col items-center justify-center lg:min-h-screen">
      {/* <WebinarBP /> */}
      <Image src="/hero-bg.jpeg" alt="bg-webinar" width={1000} height={1000} className="absolute top-0 left-0 w-full h-full object-cover object-start opacity-10" />
      <div className="absolute top-0 right-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-white/10 rounded-full blur-3xl animate-float delay-500"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-300/20 rounded-full blur-2xl animate-bounce-soft"></div>
      <div className="absolute top-1/4 right-1/4 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border border-white/20 rounded-full animate-rotate-slow"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row gap-4 sm:gap-6 items-center relative z-10">
        {/* Left Side - Event Info */}
        <div className="space-y-6 sm:space-y-8 animate-fadeInLeft">
  <div className="space-y-3 sm:space-y-4 delay-200">
    <h2 className="text-4xl sm:text-6xl lg:text-6xl font-bold text-pretty leading-snug sm:leading-tight">
    DẠY AI CHO HỌC SINH PHỔ THÔNG 
    </h2>
    <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold text-pretty leading-snug sm:leading-tight">
    KHƠI NGUỒN ĐAM MÊ STEM VỚI CHƯƠNG TRÌNH AI57
    </h2>
  </div>

  <div className="space-y-2 sm:space-y-4 delay-300">
    <h3 className="text-white font-bold uppercase tracking-wider text-[11px] sm:text-base">
      Webinar Bắt Đầu Sau:
    </h3>

    <div className="flex gap-2 sm:gap-4">
      {[
        { value: mounted ? timeLeft.days : 0, label: "NGÀY" },
        { value: mounted ? timeLeft.hours : 0, label: "GIỜ" },
        { value: mounted ? timeLeft.minutes : 0, label: "PHÚT" },
        { value: mounted ? timeLeft.seconds : 0, label: "GIÂY" },
      ].map((item, idx) => (
        <div
          key={idx}
          className="border border-white/30 px-2 sm:px-5 py-1.5 sm:py-3
                     text-center bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl
                     hover:bg-white/20 hover:border-white/50 transition-all duration-300
                     min-w-[50px] sm:min-w-[80px]"
        >
          <p className="text-[18px] sm:text-3xl font-bold tabular-nums">
            {String(item.value).padStart(2, "0")}
          </p>
          <p className="text-[9px] sm:text-xs text-blue-200 font-semibold mt-0.5 sm:mt-1">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  </div>

  <div className="space-y-2 sm:space-y-3 delay-400">
    <p className="text-white font-semibold text-md sm:text-base lg:text-lg uppercase tracking-wider">
      Thời gian: 19 tháng 6, 2026
    </p>
    <p className="text-white font-semibold text-md sm:text-base lg:text-lg uppercase tracking-wider">
      Giờ: 8:00 tối (GMT+7)
    </p>
  </div>
</div>


        {/* Right Side - Registration Form */}
        <div className="max-w-lg w-full bg-white/95 backdrop-blur-md border-l-4 border-blue-500 p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-2xl animate-fadeInRight hover:shadow-blue-500/30 transition-all duration-500 hover-lift overflow-hidden">
          <div className="text-center mb-3 sm:mb-4">
            <h3 className="text-blue-900 font-bold text-[16px] sm:text-xl mb-1">Đăng Ký Tham Gia</h3>
            <p className="text-blue-600 text-[11px] sm:text-xs">Điền thông tin để nhận vé miễn phí</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="delay-100">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Họ và tên</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập họ và tên của bạn"
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="delay-200">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập số điện thoại"
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="delay-300">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem className="delay-350">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Họ tên học sinh</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập họ tên học sinh"
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthYear"
                render={({ field }) => (
                  <FormItem className="delay-375">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Năm sinh</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Ví dụ: 2012"
                        maxLength={4}
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem className="delay-400">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Trường đang theo học</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên trường học sinh đang theo học"
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem className="delay-400">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Câu hỏi dành cho chương trình</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập câu hỏi của bạn về chương trình"
                        className="bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-[13px] sm:text-sm min-h-16 sm:min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem className="delay-500">
                    <FormLabel className="text-blue-700 text-[11px] sm:text-xs font-semibold">Bạn biết tới chương trình qua</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-blue-50 text-blue-900 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 h-8 sm:h-9 text-[13px] sm:text-sm">
                          <SelectValue placeholder="Chọn nguồn" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="zalo">Zalo</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="ban-be-gioi-thieu">Bạn bè/đồng nghiệp giới thiệu</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="khac">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px] sm:text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white mt-3 sm:mt-4 py-3 sm:py-4 text-[13px] sm:text-sm font-semibold shadow-lg hover:shadow-blue-500/50 transform hover:scale-[1.02] transition-all duration-300 delay-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Đăng Ký Ngay"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
