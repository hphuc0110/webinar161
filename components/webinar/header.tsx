"use client"

import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 animate-fadeInLeft">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-300">
            <span className="text-blue-600 font-bold text-xl">P</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">ProGeekTech</h1>
            <p className="text-xs text-blue-200">Phát Triển Website</p>
          </div>
        </div>
        <Button className="bg-white hover:bg-blue-50 text-blue-600 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fadeInRight">
          Đăng Ký Ngay
        </Button>
      </div>
    </header>
  )
}
