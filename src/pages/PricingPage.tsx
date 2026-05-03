import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, CircleHelp, Gift, MessageSquare, ShieldCheck } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { formatCurrency, messageRate, subscriptionPlans, type BillingPeriod } from '../data/pricing';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  return (
    <main className="bg-white pt-28 text-gray-950 md:pt-36">
      <Helmet>
        <title>Pricing | GrowthSync</title>
        <meta
          name="description"
          content="Start with pay-as-you-go GrowthSync credits at $0.30/message, or subscribe for early-access bonus usage credits."
        />
        <link rel="canonical" href="https://growthsync.com/pricing" />
      </Helmet>

      <section className="border-b border-gray-200 pb-14 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-12">
          <div className="max-w-3xl">
            <Badge variant="teal" className="mb-5 gap-2">
              <Gift className="h-3.5 w-3.5" />
              Early-access subscriptions include 2.5x usage credits
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">Simple credit pricing for social conversations.</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 md:text-xl">
              Start with pay-as-you-go. Only pay for the messages GrowthSync handles. Subscribe when you want more usage, better credit value, and predictable spend.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-12">
          <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
            <Card className="border-gray-950">
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-5">Default foundation</Badge>
                <h2 className="text-2xl font-bold">Pay as you go</h2>
                <p className="mt-3 text-gray-600">
                  Add a card, use starter credits if you have them, then pay only for what GrowthSync handles.
                </p>
                <div className="mt-8 flex items-end gap-2">
                  <span className="text-5xl font-bold">{messageRate}</span>
                  <span className="pb-2 text-sm font-semibold text-gray-500">per handled message</span>
                </div>
                <div className="mt-8 grid gap-3 text-sm text-gray-700">
                  {['No monthly base fee', 'Use credit codes before billing begins', 'Move into subscription bundles when volume is predictable'].map((item) => (
                    <div key={item} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button type="button" size="lg" className="mt-8 w-full">
                  Get Started for Free
                  <ArrowRight />
                </Button>
              </CardContent>
            </Card>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="rounded-md border border-gray-200 bg-white p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Subscribe and get bonus credits</h2>
                    <p className="mt-2 text-sm text-gray-600">Usage credits are applied to GrowthSync messages at the standard pay-as-you-go rate.</p>
                  </div>
                  <Tabs value={billingPeriod} onValueChange={(value) => setBillingPeriod(value as BillingPeriod)}>
                    <TabsList>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="annual">Annual</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="mt-6 grid gap-3">
                  {subscriptionPlans.map((plan) => {
                    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
                    const suffix = billingPeriod === 'monthly' ? '/mo' : '/yr';

                    return (
                      <div
                        key={plan.id}
                        className={`rounded-md border p-4 ${plan.featured ? 'border-teal-300 bg-teal-50/40' : 'border-gray-200 bg-white'}`}
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-bold text-gray-950">{plan.name}</h3>
                              {plan.featured && <Badge variant="teal">Recommended</Badge>}
                            </div>
                            <p className="mt-1 text-sm text-gray-600">{plan.bestFor}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-2xl font-bold text-gray-950">
                              {formatCurrency(price)}
                              <span className="text-sm font-semibold text-gray-500">{suffix}</span>
                            </p>
                            <p className="text-sm font-medium text-teal-700">{formatCurrency(plan.monthlyCredit)} usage credits / month</p>
                          </div>
                        </div>
                        <div className="mt-4 grid gap-3 border-t border-gray-200 pt-4 text-sm text-gray-600 sm:grid-cols-3">
                          <span>{plan.messages} messages / month</span>
                          <span>{plan.note}</span>
                          <Button type="button" variant={plan.featured ? 'default' : 'outline'} size="sm">
                            Get Started for Free
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <Card>
              <CardContent className="p-5">
                <MessageSquare className="h-5 w-5 text-teal-600" />
                <h3 className="mt-4 font-bold">What counts as a message?</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Public pricing uses messages for simplicity. Usage can be measured around the social conversations GrowthSync handles.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <Gift className="h-5 w-5 text-teal-600" />
                <h3 className="mt-4 font-bold">Have a credit code?</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Apply it during setup and use those credits before pay-as-you-go billing begins.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <ShieldCheck className="h-5 w-5 text-teal-600" />
                <h3 className="mt-4 font-bold">Need custom volume?</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Multi-brand, agency, celebrity, or complex workflow accounts can start with a tailored setup.
                </p>
              </CardContent>
            </Card>
          </div>

          <TooltipProvider>
            <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
              <Tooltip>
                <TooltipTrigger className="inline-flex items-center gap-2 font-medium">
                  <CircleHelp className="h-4 w-4" />
                  Credit note
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  Usage credits reduce GrowthSync message charges at the standard public rate.
                </TooltipContent>
              </Tooltip>
              <span>Pricing is designed to keep the path simple before usage scales.</span>
            </div>
          </TooltipProvider>
        </div>
      </section>
    </main>
  );
}
