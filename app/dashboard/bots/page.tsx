'use client'
import Bots from '@/app/components/Dashboard/Bots'
import Signal from '@/app/components/Dashboard/Signal'

export default function Page() {
  return (
    <div className='max-w-2xl mx-auto flex flex-col gap-6 py-4'>
      <div>
        <h1 className='text-lg font-bold font-lora'>
          My <span className='text-orange-500'>Bots</span>
        </h1>
        <p className='text-sm text-taupe-400'>Manage and monitor your bots</p>
      </div>
      <Bots />
      <Signal />
    </div>
  )
}