import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Target, Shield, Award } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/professional-woman-ceo.png',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/professional-cto-headshot.png',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: '/professional-woman-operations-manager-headshot.png',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description:
        'Your financial data is protected with bank-level security measures and encryption.',
    },
    {
      icon: Target,
      title: 'Transparent Pricing',
      description:
        'No hidden fees. Clear, competitive rates that help your business grow.',
    },
    {
      icon: Users,
      title: 'Customer Focused',
      description:
        'Dedicated support team available to help you succeed at every step.',
    },
    {
      icon: Award,
      title: 'Industry Leading',
      description:
        'Trusted by thousands of businesses for reliable financial services.',
    },
  ];

  const testimonials = [
    {
      quote:
        'The transparent pricing and excellent support have made managing our transactions so much easier.',
      author: 'David Kim',
      company: 'TechStart Inc.',
    },
    {
      quote:
        'Low rates and reliable service - exactly what our growing business needed.',
      author: 'Maria Santos',
      company: 'Creative Agency Co.',
    },
    {
      quote:
        'Their agent commission system has helped us scale our operations efficiently.',
      author: 'James Wilson',
      company: 'Property Solutions',
    },
  ];

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='bg-muted/10 px-4 py-16'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='mb-6 font-bold text-foreground text-4xl md:text-5xl'>
            Empowering Your Financial Success
          </h1>
          <p className='mx-auto mb-8 max-w-2xl text-muted-foreground text-xl'>
            We provide transparent, competitive transaction rates that help
            businesses and individuals manage their finances with confidence and
            clarity.
          </p>
          <Button
            size='lg'
            className='bg-primary hover:bg-primary/90 text-primary-foreground'
          >
            Learn More About Our Services
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className='px-4 py-16'>
        <div className='mx-auto max-w-4xl'>
          <div className='items-center gap-12 grid md:grid-cols-2'>
            <div>
              <h2 className='mb-6 font-bold text-foreground text-3xl'>
                Our Mission
              </h2>
              <p className='mb-6 text-muted-foreground leading-relaxed'>
                We believe that financial services should be straightforward,
                affordable, and accessible. Our platform eliminates complexity
                while providing the tools and rates you need to succeed.
              </p>
              <p className='text-muted-foreground leading-relaxed'>
                Whether you're processing personal transactions or managing
                agent commissions, we're committed to delivering value through
                competitive rates and exceptional service.
              </p>
            </div>
            <div className='bg-card p-8 rounded-lg'>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <CheckCircle className='w-5 h-5' />
                  <span className='text-card-foreground'>
                    Competitive 0.15% personal rates
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <CheckCircle className='w-5 h-5' />
                  <span className='text-card-foreground'>
                    Flexible 0.18% agent commissions
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <CheckCircle className='w-5 h-5' />
                  <span className='text-card-foreground'>
                    No hidden fees or surprises
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <CheckCircle className='w-5 h-5' />
                  <span className='text-card-foreground'>
                    24/7 customer support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='bg-muted/10 px-4 py-16'>
        <div className='mx-auto max-w-6xl'>
          <h2 className='mb-12 font-bold text-foreground text-3xl text-center'>
            Our Core Values
          </h2>
          <div className='gap-8 grid md:grid-cols-2 lg:grid-cols-4'>
            {values.map((value, index) => (
              <Card key={index} className='text-center'>
                <CardContent className='p-6'>
                  <value.icon className='mx-auto mb-4 w-12 h-12 text-accent' />
                  <h3 className='mb-3 font-semibold text-card-foreground text-lg'>
                    {value.title}
                  </h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='px-4 py-16'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='mb-12 font-bold text-foreground text-3xl text-center'>
            Meet Our Team
          </h2>
          <div className='gap-8 grid md:grid-cols-3'>
            {teamMembers.map((member, index) => (
              <Card key={index} className='text-center'>
                <CardContent className='p-6'>
                  <img
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    className='mx-auto mb-4 rounded-full w-32 h-32 object-cover'
                  />
                  <h3 className='mb-2 font-semibold text-card-foreground text-lg'>
                    {member.name}
                  </h3>
                  <Badge
                    variant='secondary'
                    className='bg-accent text-accent-foreground'
                  >
                    {member.role}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='bg-muted/10 px-4 py-16'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='mb-12 font-bold text-foreground text-3xl text-center'>
            What Our Clients Say
          </h2>
          <div className='gap-8 grid md:grid-cols-3'>
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className='p-6'>
                  <p className='mb-4 text-card-foreground italic'>
                    "{testimonial.quote}"
                  </p>
                  <div className='pt-4 border-t'>
                    <p className='font-semibold text-card-foreground'>
                      {testimonial.author}
                    </p>
                    <p className='text-muted-foreground text-sm'>
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
