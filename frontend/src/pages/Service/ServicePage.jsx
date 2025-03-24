import React, { useEffect } from 'react';
import { FileText, Activity, BellRing, ShieldCheck, HeadphonesIcon, ChevronRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('services');
    return () => {
      document.body.classList.remove('services');
    };
  }, []);

  const services = [
    { icon: FileText, title: 'Load Posting', desc: 'Post your loads quickly and connect with verified carriers.', href: '/load-posting' },
    { icon: Activity, title: 'Bidding', desc: 'Get competitive bids from carriers for best pricing.', href: '/bidding' },
    { icon: BellRing, title: 'Alerts', desc: 'Receive real-time notifications on shipments and bids.', href: '/alerts' },
    { icon: ShieldCheck, title: 'Payments', desc: 'Secure transactions with fraud prevention measures.', href: '/payments' },
    { icon: HeadphonesIcon, title: 'Support', desc: 'Dedicated team available for assistance anytime.', href: '/support' }
  ];

  return (
    <div>
      <Header />
      <section className="py-24 px-6 sm:px-12 md:px-24 text-center">
        <h1 className="text-4xl font-bold">Streamlined Freight Management Solutions</h1>
        <p className="text-gray-600 mt-4">Connecting shippers and carriers efficiently.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/get-started" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Get Started</Link>
          <Link to="/learn-more" className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-100">Learn More</Link>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-12">
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-3xl font-semibold">Comprehensive Freight Services</h2>
          <p className="text-gray-500">All the tools you need for efficient freight operations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link to={service.href} key={index} className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition flex flex-col items-center text-center">
              <service.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-500 mt-2">{service.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 sm:px-12 bg-gray-100">
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
          <p className="text-gray-500">Benefits of using our freight marketplace.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow-md bg-white text-center">
            <h3 className="text-xl font-semibold">Real-Time Tracking</h3>
            <p className="text-gray-500 mt-2">Monitor your shipments in real-time for complete visibility.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md bg-white text-center">
            <h3 className="text-xl font-semibold">Verified Carriers</h3>
            <p className="text-gray-500 mt-2">Work only with trusted and verified transport providers.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md bg-white text-center">
            <h3 className="text-xl font-semibold">Seamless Integration</h3>
            <p className="text-gray-500 mt-2">Easily connect with your existing logistics systems.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
