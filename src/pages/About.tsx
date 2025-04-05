
import React from 'react';
import { Check, Award, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-blood-navy mb-4">About Life Share</h1>
            <p className="text-lg text-gray-600">
              We connect blood donors with patients in need, facilitating lifesaving donations 
              through a simple and efficient platform.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blood-navy mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Life Share, our mission is to save lives by increasing the availability of blood through 
                voluntary donations. We strive to create a world where no one dies due to lack of blood.
              </p>
              <p className="text-gray-600 mb-6">
                We believe that every person should have access to safe blood when needed, and we work 
                tirelessly to connect willing donors with patients in critical situations.
              </p>
              <ul className="space-y-3">
                {['Increase voluntary blood donation', 'Ensure safe and timely blood supply', 'Educate the public about donation importance'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="bg-blood/10 rounded-full p-1">
                      <Check className="h-4 w-4 text-blood" />
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Blood Donation Team" 
                className="rounded-lg shadow-md" 
              />
              <div className="absolute bottom-0 right-0 transform translate-y-1/4 translate-x-1/4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-blood" />
                  <div>
                    <p className="text-sm text-gray-500">Trusted by</p>
                    <p className="font-medium text-blood-navy">50+ Hospitals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-blood-navy mb-4">Our Core Values</h2>
            <p className="text-gray-600">
              These principles guide our work and help us make an impact in communities worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="h-8 w-8 text-blood" />,
                title: "Compassion",
                description: "We care deeply about patients and donors, ensuring everyone is treated with dignity and respect."
              },
              {
                icon: <Users className="h-8 w-8 text-blood" />,
                title: "Community",
                description: "We build networks of donors and healthcare providers to strengthen our collective impact."
              },
              {
                icon: <Award className="h-8 w-8 text-blood" />,
                title: "Excellence",
                description: "We maintain the highest standards of safety, quality, and service in everything we do."
              }
            ].map((value, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blood/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-blood-navy mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-blood rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Save Lives?</h2>
                <p className="text-white/90 mb-6">
                  Your blood donation journey starts here. Schedule an appointment today and join 
                  thousands of donors who have already made a difference.
                </p>
                <Link to="/donate">
                  <Button className="bg-white text-blood hover:bg-gray-100">
                    Donate Now
                  </Button>
                </Link>
              </div>
              <div className="flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Blood Donation" 
                  className="rounded-lg w-full max-w-md" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
