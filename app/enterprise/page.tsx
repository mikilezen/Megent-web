"use client";

import Nav from '@/components/marketing/Nav'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import Link from 'next/link'

export default function EnterprisePage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main style={{ background: '#f5f4ed' }} className='min-h-screen'>
      <Nav />

      <section className='max-w-3xl mx-auto px-6 py-20'>
        <div style={{ background: '#faf9f5', border: '1px solid #f0eee6' }} className='rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]'>
          <p className='text-xs uppercase tracking-wider text-[#5e5d59]'>Enterprise</p>
          <h1 className='mt-2 font-serif text-3xl text-[#141413]'>Contact Sales</h1>
          <p className='mt-3 text-[#5e5d59]'>Tell us about your organization and we'll reach out to tailor a plan.</p>

          {submitted ? (
            <div className='mt-6 rounded-lg p-4 bg-[#e8e6dc] text-[#3d3d3a]'>
              Thanks - we received your request and will contact you shortly.
              <div className='mt-3'>
                <Link href='/' className='text-sm text-[#30302e] underline'>Back to home</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
              <Input type='text' placeholder='Company name' required />
              <Input type='email' placeholder='Work email' required />
              <Input type='text' placeholder='Company size / seats' />
              <div className='mt-4 flex gap-3'>
                <button type='submit' className='inline-flex items-center justify-center bg-[#c96442] text-[#faf9f5] px-5 py-2 rounded-lg'>
                  Submit
                </button>
                <Link href='/' className='inline-flex items-center justify-center px-5 py-2 rounded-lg bg-[#e8e6dc] text-[#4d4c48]'>Cancel</Link>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
