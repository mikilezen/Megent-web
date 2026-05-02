import Nav from '@/components/marketing/Nav'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <main style={{ background: '#f5f4ed' }} className='min-h-screen'>
      <Nav />

      <section className='max-w-6xl mx-auto px-6 py-20'>
        <h1 className='font-serif text-4xl md:text-5xl text-[#141413] text-center leading-tight'>Pricing</h1>
        <p className='mt-3 text-center text-lg text-[#5e5d59] max-w-2xl mx-auto'>Thoughtfully priced plans - warm, simple, and built for real teams.</p>

        <div className='mt-12 grid gap-8 grid-cols-1 md:grid-cols-2'>
          {/* Megent Cloud - $9 */}
          <div style={{ background: '#faf9f5', border: '1px solid #f0eee6' }} className='rounded-lg p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)] flex flex-col'>
            <div className='flex items-start justify-between'>
              <div>
                <h2 className='font-serif text-2xl text-[#141413]'>Megent Cloud</h2>
                <p className='text-sm mt-1 text-[#5e5d59]'>Starter - hosted</p>
              </div>

              <div className='text-right'>
                <div className='text-3xl font-semibold text-[#141413]'>$20</div>
                <div className='text-sm text-[#5e5d59]'>/ month</div>
              </div>
            </div>

            <ul className='mt-6 space-y-3 text-[#5e5d59] text-base flex-1'>
              <li>• 24/7 online interception</li>
              <li>• Anomaly detection & agent actions</li>
            </ul>

            <div className='mt-4 text-sm text-[#b53333]'>Global payment not supported - local transfer allowed.</div>

            <div className='mt-6 flex items-center gap-3'>
              <Link href={'/price/manual-transfer'} className='inline-flex items-center justify-center bg-[#c96442] text-[#faf9f5] px-5 py-2 rounded-lg shadow-sm ring-1 ring-[#d1cfc5] hover:brightness-95'>
                Pay
              </Link>

              <Link href={'/#waitlist'} className='text-sm text-[#c96442] underline'>Join waitlist</Link>
            </div>
          </div>

          {/* Enterprise */}
          <div style={{ background: '#faf9f5', border: '1px solid #f0eee6' }} className='rounded-lg p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)] flex flex-col justify-between'>
            <div>
              <h2 className='font-serif text-2xl text-[#141413]'>Enterprise</h2>
              <p className='text-sm mt-1 text-[#5e5d59]'>Custom plans for organizations</p>

              <ul className='mt-6 space-y-3 text-[#5e5d59] text-base'>
                <li>• Unlimited seats & scalable storage tiers</li>
                <li>• Dedicated account manager & onboarding</li>
                <li>• Enterprise SSO, SCIM, and advanced security</li>
                <li>• SLA-backed uptime & optional on-prem deployment</li>
                <li>• Priority support and custom integrations</li>
              </ul>
            </div>

            <div className='mt-6 flex gap-3'>
              <Link href='/enterprise' className='inline-flex items-center justify-center bg-[#30302e] text-[#faf9f5] px-5 py-2 rounded-lg shadow-sm ring-1 ring-[#c2c0b6] hover:brightness-95'>
                Contact sales
              </Link>
              <Link href='/' className='text-sm text-[#5e5d59] underline'>Request demo</Link>
            </div>
          </div>
        </div>

        <p className='text-center text-sm text-[#5e5d59] mt-8'>Need help? Local transfers are supported today - global payment gateways coming soon.</p>
      </section>
    </main>
  )
}
