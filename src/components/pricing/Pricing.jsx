import { CheckIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const tiers = [
  {
    name: 'Basic',
    id: 'tier-basic',
    href: '/signup',
    priceMonthly: '$29',
    description: "Perfect for individuals seeking initial lung health screening.",
    features: [
      '5 AI scans per month',
      'Basic XAI heatmap visualization',
      'Normal/Benign/Malignant classification',
      'Email support',
      'PDF reports',
      'Confidence scores'
    ],
    featured: false,
  },
  {
    name: 'Professional',
    id: 'tier-professional',
    href: '/signup',
    priceMonthly: '$99',
    description: 'For healthcare providers and clinics requiring comprehensive diagnostic tools.',
    features: [
      'Unlimited AI scans',
      'Advanced XAI explanations',
      'Priority processing',
      'Detailed clinical reports',
      'Multi-user access',
      'API integration',
      'HIPAA compliant storage',
      '24/7 priority support',
    ],
    featured: true,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Pricing() {
  return (
    <div className="relative isolate bg-gray-50 px-6 py-24 sm:py-32 lg:px-8" id='pricing'>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-violet-600">Pricing</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-800 sm:text-6xl">
          Simple, Transparent Pricing
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
        Choose the plan that fits your needs. All plans include our advanced XAI technology for transparent, explainable lung cancer detection.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'relative bg-white ring-1 ring-gray-200' : 'bg-white ring-1 ring-gray-200 sm:mx-8 lg:mx-0',
              tier.featured
                ? ''
                : tierIdx === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                  : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
              'rounded-3xl p-8 sm:p-10',
            )}
          >
            <h3
              id={tier.id}
              className={classNames(tier.featured ? 'text-violet-600' : 'text-violet-600', 'text-base/7 font-semibold')}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-gray-800' : 'text-gray-800',
                  'text-5xl font-semibold tracking-tight',
                )}
              >
                {tier.priceMonthly}
              </span>
              <span className={classNames(tier.featured ? 'text-gray-600' : 'text-gray-600', 'text-base')}>/month</span>
            </p>
            <p className={classNames(tier.featured ? 'text-gray-600' : 'text-gray-600', 'mt-6 text-base/7')}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-600' : 'text-gray-600',
                'mt-8 space-y-3 text-sm/6 sm:mt-10',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(tier.featured ? 'text-violet-600' : 'text-violet-600', 'h-6 w-5 flex-none')}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              to={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? 'bg-violet-600 text-white hover:bg-violet-700 focus-visible:outline-violet-600'
                  : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50 focus-visible:outline-gray-400',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
              )}
            >
              {tier.featured ? 'Get Started Today' : 'Choose Basic'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

