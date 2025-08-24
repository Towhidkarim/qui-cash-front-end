import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('[v0] Contact form submitted:', data);

    // Show success toast
    toast.success('Message sent successfully!', {
      description: "We'll get back to you within 24 hours.",
      duration: 5000,
    });

    // Reset form
    form.reset();
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@quicash.com',
      description: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (234) 123-4567',
      description: 'Mon-Fri, 9AM-6PM EST',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Quicash District, TR 10004',
      description: 'By appointment only',
    },
  ];

  const subjects = [
    'General Inquiry',
    'Account Support',
    'Transaction Issues',
    'Pricing Questions',
    'Technical Support',
    'Partnership Opportunities',
  ];

  return (
    <div className='px-4 py-8 min-h-screen'>
      <div className='mx-auto max-w-6xl'>
        {/* Header Section */}
        <div className='mb-12 text-center'>
          <h1 className='mb-4 font-bold text-foreground text-4xl md:text-5xl'>
            Get in Touch
          </h1>
          <p className='mx-auto max-w-2xl text-muted-foreground text-xl'>
            We're here to assist you with any inquiries. Please fill out the
            form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className='gap-12 grid lg:grid-cols-3'>
          {/* Contact Information */}
          <div className='lg:col-span-1'>
            <div className='space-y-6'>
              <div>
                <h2 className='mb-4 font-bold text-foreground text-2xl'>
                  Contact Information
                </h2>
                <p className='mb-6 text-muted-foreground'>
                  Reach out to us through any of these channels. Our support
                  team is ready to help.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <Card key={index} className='hover:shadow-md transition-shadow'>
                  <CardContent className='p-6'>
                    <div className='flex items-start gap-4'>
                      <div className='bg-primary/10 p-3 rounded-lg'>
                        <info.icon className='w-6 h-6 text-primary' />
                      </div>
                      <div>
                        <h3 className='mb-1 font-semibold text-card-foreground'>
                          {info.title}
                        </h3>
                        <p className='mb-1 font-medium text-card-foreground'>
                          {info.content}
                        </p>
                        <p className='text-muted-foreground text-sm'>
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Business Hours */}
              <Card className='bg-muted'>
                <CardContent className='p-6'>
                  <h3 className='mb-3 font-semibold text-card-foreground'>
                    Business Hours
                  </h3>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>
                        Monday - Friday
                      </span>
                      <span className='text-card-foreground'>
                        9:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Saturday</span>
                      <span className='text-card-foreground'>
                        10:00 AM - 4:00 PM
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Sunday</span>
                      <span className='text-card-foreground'>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className='lg:col-span-2'>
            <Card>
              <CardHeader>
                <CardTitle className='text-card-foreground text-2xl'>
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className='p-6'>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                  >
                    <div className='gap-6 grid md:grid-cols-2'>
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter your full name'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                placeholder='Enter your email'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name='subject'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select a subject' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                  {subject}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Tell us how we can help you...'
                              className='min-h-32'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type='submit'
                      size='lg'
                      disabled={isSubmitting}
                      className='bg-primary hover:bg-primary/90 w-full text-primary-foreground'
                    >
                      {isSubmitting ? (
                        <>
                          <div className='mr-2 border-primary-foreground border-b-2 rounded-full w-4 h-4 animate-spin' />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className='mr-2 w-4 h-4' />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className='mt-16'>
          <Card className='bg-muted/20'>
            <CardContent className='p-8 text-center'>
              <CheckCircle className='mx-auto mb-4 w-12 h-12' />
              <h2 className='mb-4 font-bold text-card-foreground text-2xl'>
                Frequently Asked Questions
              </h2>
              <p className='mb-6 text-muted-foreground'>
                Looking for quick answers? Check out our comprehensive FAQ
                section for common questions about our services and rates.
              </p>
              <Button
                variant='outline'
                size='lg'
                className='bg-transparent'
                asChild
              >
                <Link to='/faq'>View FAQ</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
