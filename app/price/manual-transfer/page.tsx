"use client";

import Nav from '@/components/marketing/Nav'
import React, { useState } from 'react'
import Link from 'next/link'

export default function ManualTransferPage() {
  const acct = '1000038382'
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(acct)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <main style={{ background: '#f5f4ed' }} className='min-h-screen'>
      <Nav />

      <section className='max-w-3xl mx-auto px-6 py-20'>
        <div style={{ background: '#faf9f5', border: '1px solid #f0eee6' }} className='rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]'>
          <h1 className='font-serif text-2xl text-[#141413]'>Manual Transfer</h1>
          <p className='mt-2 text-[#5e5d59]'>Please transfer the amount to the account below. After transfer, return to this page and join the waitlist or contact us.</p>

          <div className='mt-6 flex items-center justify-between bg-white border border-[#f0eee6] rounded-md p-4'>
            <div>
              <div className='text-xs text-[#5e5d59]'>Account number</div>
              <div className='text-lg font-medium text-[#141413]'>{acct}</div>
            </div>

            <div className='flex items-center gap-3'>
              <button onClick={copy} className='inline-flex items-center justify-center bg-[#c96442] text-[#faf9f5] px-4 py-2 rounded-md'>
                Copy
              </button>
              {copied && <span className='text-sm text-[#5e5d59]'>Copied!</span>}
            </div>
          </div>

          <div className='mt-6 flex gap-3'>
            <Link href='/price' className='text-sm text-[#30302e] underline'>Back to pricing</Link>
            <Link href='/#waitlist' className='text-sm text-[#c96442] underline'>Join waitlist</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
