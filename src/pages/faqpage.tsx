import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { HelpCircle, FileText, CreditCard, Users } from 'lucide-react';

export default function FAQPage() {
  const faqCategories = [
    {
      icon: CreditCard,
      title: 'Pricing & Rates',
      faqs: [
        {
          question: 'What are your transaction rates?',
          answer:
            'We offer competitive rates: 0.15% for personal transactions and 0.18% commission rates for agent transactions. These rates are transparent with no hidden fees.',
        },
        {
          question: 'Are there any setup fees or monthly charges?',
          answer:
            "No, we don't charge any setup fees or monthly subscription costs. You only pay the transaction rates when you process payments.",
        },
        {
          question: 'How do agent commission rates work?',
          answer:
            'Agent commission rates are 0.18% per transaction. This rate applies to all transactions processed through agent accounts and is automatically calculated.',
        },
      ],
    },
    {
      icon: Users,
      title: 'Account Management',
      faqs: [
        {
          question: 'How do I create an account?',
          answer:
            "You can create an account by clicking the 'Get Started' button and following the simple registration process. Verification typically takes 1-2 business days.",
        },
        {
          question: 'Can I switch between personal and agent accounts?',
          answer:
            'Yes, you can upgrade from a personal account to an agent account at any time. Contact our support team to help with the transition.',
        },
        {
          question: 'What documents do I need for verification?',
          answer:
            "For personal accounts, you'll need a government-issued ID. For agent accounts, additional business documentation may be required.",
        },
      ],
    },
    {
      icon: FileText,
      title: 'Transactions & Processing',
      faqs: [
        {
          question: 'How long do transactions take to process?',
          answer:
            'Most transactions are processed instantly. Bank transfers typically take 1-3 business days depending on your bank.',
        },
        {
          question: 'What payment methods do you accept?',
          answer:
            'We accept all major transfers. Digital wallet support is also available.',
        },
        {
          question: 'Is there a minimum or maximum transaction amount?',
          answer:
            'Personal accounts have a minimum of TK 5 and maximum of TK100,000 per transaction. Agent accounts have higher limits based on verification level.',
        },
      ],
    },
    {
      icon: HelpCircle,
      title: 'Support & Security',
      faqs: [
        {
          question: 'How secure are my transactions?',
          answer:
            'We use bank-level encryption and security measures. All transactions are protected with SSL encryption and fraud monitoring.',
        },
        {
          question: 'How can I contact customer support?',
          answer:
            'Our support team is available 24/7 via email, live chat, or phone. Response times are typically under 2 hours during business hours.',
        },
        {
          question: "What happens if there's an issue with my transaction?",
          answer:
            'Our support team will investigate any transaction issues immediately. Most issues are resolved within 24 hours with full communication throughout the process.',
        },
      ],
    },
  ];

  return (
    <div className='px-4 py-8 min-h-screen'>
      <div className='mx-auto max-w-4xl'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h1 className='mb-4 font-bold text-foreground text-4xl'>
            Frequently Asked Questions
          </h1>
          <p className='mb-8 text-muted-foreground text-xl'>
            Find answers to common questions about our services and rates
          </p>
        </div>

        {/* FAQ Categories */}
        <div className='flex flex-wrap gap-5 space-y-8'>
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className='mx-auto w-96'>
              <CardHeader>
                <CardTitle className='flex items-center gap-3 text-card-foreground'>
                  <category.icon className='w-6 h-6' />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type='single' collapsible className='w-full'>
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`item-${categoryIndex}-${faqIndex}`}
                    >
                      <AccordionTrigger className='text-card-foreground hover:text-primary text-left'>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className='text-muted-foreground leading-relaxed'>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
